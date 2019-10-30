from __future__ import absolute_import
from __future__ import division
from __future__ import print_function


import argparse
import datetime
from functools import partial
import json
import traceback
import numpy as np
import pylib
import tensorflow as tf
import tflib as tl
import process_dataset
import model
from tensorflow.python.client import device_lib
import imlib as im


# Read all parameters
parser = argparse.ArgumentParser()


# Checking if GPU is being used for tensorflow 
if tf.test.gpu_device_name():
    print('Default GPU Device: {}'.format(tf.test.gpu_device_name()))
else:
   print("Please install GPU version of TF")

tf.logging.set_verbosity(tf.logging.INFO)



# -------------------------     INITIALIZE DATA/PARAMETERS ----------------------------------

# Name experiment

parser.add_argument('--experiment_name', dest='experiment_name', default=datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y"))
parser.add_argument('--img_size', dest='img_size', type=int, default=128)

args = parser.parse_args()

experiment_name = args.experiment_name

atts = ['Bald', 'Bangs', 'Black_Hair', 'Blond_Hair', 'Brown_Hair', 'Bushy_Eyebrows', 'Eyeglasses', 'Male', 'Mouth_Slightly_Open', 'Mustache', 'No_Beard', 'Pale_Skin', 'Young']
img_size = args.img_size

# batch_size 
batch_size = 32


# threshold value
threshold_value = 0.5

# model dimension
if(img_size==384):
    models_dims = 48
    fc_dim = 512
    n_sample = 24
else:
    models_dims = 64
    fc_dim = 1024
    n_sample = 64


# Create tensorflow session and get training and validation data
sess = tl.session()
tr_data = process_dataset.Celeba('./data', atts, img_size, batch_size, part='train', sess=sess)
val_data = process_dataset.Celeba('./data', atts, img_size, n_sample, part='val', shuffle=False, sess=sess)

# Create iterators for both the training and validation set
#tr_iterator = tr_data.make_initializable_iterator()
#val_iterator = val_data.make_initializable_iterator()

# Get first batch of training data
#batch_current = tr_iterator.get_next()

# ----------------------------------------------------------------------------------------------


# -------------------------   DEFINE MODELS   -------------------------------------------
 
# Initialize all models

# The Generator encoder - 5 convolution layer with batch normalization and leaky ReLu
# Dim range for default image size (128x128) is 64 - 1024 | double output dimension on every layer
Genc = partial(model.Genc, dim=models_dims, n_layers=5)

# The Generator decoder - 4 Deconvolutinal layers with batch normalization and ReLu - last layer with tanh activation function
Gdec = partial(model.Gdec, dim=models_dims, n_layers=5, shortcut_layers=1, inject_layers=0)

# The Discriminator - The discriminator passed with 5 layers and a final fully connected layer of 1024
D = partial(model.D, n_att=len(atts), dim=models_dims, fc_dim=fc_dim, n_layers=5)

# ---------------------------------------------------------------------------------------------------------------------------

# -----------------------    INITIALIZE MODELS ------------------------------------------------------------------------------

# First tensor is image (32, 128, 128, 3) - 32 sample with 128x128 images in 3 channels RGB
image_tensor = tr_data.batch_op[0]
# Second tensor is labels (32, 13) - 32 sample with all N testing labels - default is 13  
label_tensor = tr_data.batch_op[1]

#print("Batch op: ", batch_current)
print("Image tensor: ",image_tensor)
print("Label tensor: ", label_tensor)
print("",)

#  Shuffle label tensor
shuffled_label_tensor = tf.random_shuffle(label_tensor)
# Scale tensor with threshold value - one for shuffled label and one for unshuffled
n_label_tensor = (tf.to_float(label_tensor) * 2 - 1) * 0.5
s_label_tensor = (tf.to_float(shuffled_label_tensor) * 2 - 1) * 0.5

print("n_label_tensor: ", n_label_tensor)
print("s_label_tensor: ", s_label_tensor)

# Pass the image tensor to the Genertor encoder method
# Returns an array of the tensor returned from each layer 
# Final layer of size 32x4x4x1024
encoder_output = Genc(image_tensor)
print("Genc(image_tensor) = ", encoder_output)

# Pass output from encoder to the Generator decoder along with scaled label tensor

s_decoder_ouput = Gdec(encoder_output, s_label_tensor)


# Decoder returns two tensor of original shape 32-128-128-3
print("Gdec(encoder_output, s_label_tensor) = ", s_decoder_ouput)
with tf.control_dependencies([s_decoder_ouput]):
    n_decoder_output = Gdec(encoder_output, n_label_tensor)
    print("Gdec(encoder_output, n_label_tensor) = ", n_decoder_output)


# Pass to discriminator
discriminate_image_img, discriminate_image_attr = D(image_tensor)
discriminate_image_img_s, discriminate_image_attr_s = D(s_decoder_ouput)

print("D(image_tensor) - img = ", discriminate_image_img)
print("D(image_tensor) - attr = ", discriminate_image_attr)

print("D(s_decoder_output) - img = ", discriminate_image_img_s)
print("D(s_decoder_output) - attr = ", discriminate_image_attr_s)



# --------------------------------    CALCULATE LOSSES  ----------------------------------------------------------

# Calculate discriminator loss
wd = tf.reduce_mean(discriminate_image_img) - tf.reduce_mean(discriminate_image_img_s)
discriminator_loss_gan = -wd
# Determine the loss function given the original image and Generator output
gradient_loss = model.gradient_penalty(D, image_tensor, s_decoder_ouput)

# Discriminator loss for image attr
image_attr_loss = tf.losses.sigmoid_cross_entropy(label_tensor, discriminate_image_attr)

# Final loss for discriminator
discriminator_loss = discriminator_loss_gan + gradient_loss * 10.0 + image_attr_loss


# Calculate generator loss
discriminator_label_loss = -tf.reduce_mean(discriminate_image_attr_s)

# The losses the one the do any other way that
label_decoder_loss = tf.losses.sigmoid_cross_entropy(shuffled_label_tensor, discriminate_image_attr_s)
image_decoder_loss = tf.losses.absolute_difference(image_tensor, n_decoder_output)

# Final loss for generator
generator_loss = discriminator_label_loss + label_decoder_loss * 10.0 + image_decoder_loss * 100.0

# --------------------------------------------------------------------------------------------------------------------


# ------------------------------------    TRAINING ---------------------------------------------------------------------

# Initialize variables to optimize

# Parameters
learning_rate = .0002
update_rate = 5 
epoch = 200
iteration_in_epoch = 0
lr = tf.placeholder(dtype=tf.float32, shape=[])

discriminator_var = tl.trainable_variables('D')
# Using adam optimizer to optimize loss 
# Optimize discriminator loss
discriminator_step = tf.train.AdamOptimizer(lr, beta1=0.5).minimize(discriminator_loss, var_list=discriminator_var)

generator_var = tl.trainable_variables('G')
# Using adam optimizer to optimize loss
# Optimize generator loss
generator_step = tf.train.AdamOptimizer(lr, beta1=0.5).minimize(generator_loss, var_list=generator_var)


# Store all losses for each network

discriminator_summary = tl.summary({
    discriminator_loss_gan: 'discriminator_loss_gan',
    gradient_loss: 'gradient_loss',
    image_attr_loss: 'image_attr_loss',
}, scope='D')

lr_summary = tl.summary({lr: 'lr'}, scope='Learning_Rate')

generator_summary = tl.summary({
    discriminator_label_loss: 'discriminator_label_loss',
    label_decoder_loss: 'label_decoder_loss',
    image_decoder_loss: 'image_decode_loss',
}, scope='G')

discriminator_summary = tf.summary.merge([discriminator_summary, lr_summary])


# Iteration counter
iteration_counter, update_counter = tl.counter()


# Saver for model
saver = tf.train.Saver(max_to_keep=1)

# Logging information
summary_writer = tf.summary.FileWriter('./output/%s/summaries' % experiment_name, sess.graph)

# Check if training was already begun
checkpoint_dir = './output/%s/checkpoints' % experiment_name
pylib.mkdir(checkpoint_dir)
try:
    tl.load_checkpoint(checkpoint_dir, sess)
except:
    sess.run(tf.global_variables_initializer())



# Create sample output
image_sample = tf.placeholder(tf.float32, shape=[None, img_size, img_size, 3])
s_label_sample = tf.placeholder(tf.float32, shape=[None, len(atts)])

output_sample = Gdec(Genc(image_sample, is_training=False), s_label_sample, is_training=False)


# 
#print("Val_iterator: ", val_iterator.get_next())

# Loop until end of data
try:
    # Sampling data
    image_sample_input, label_sample_input = val_data.get_next()
    print("xa_sample_ipt: ", image_sample_input.shape)
    print("a_sample_ipt: ", label_sample_input.shape)



    label_sample_list = [label_sample_input]  
    print("len attrs: ", len(atts))
    # Iterate through attributes
    for i in range(len(atts)):
        tmp = np.array(label_sample_input, copy=True)
        # Generate inverse attribute list
        print("tmp: ", tmp[:,i])
        tmp[:, i] = 1 - tmp[:, i]   
        print("tmp: ", tmp[:,i])
        print("-------------------------")
        # Remove all conflicts in attribute types
        tmp = process_dataset.Celeba.check_attribute_conflict(tmp, atts[i], atts)
        # Add to list
        label_sample_list.append(tmp)

    # determine number of iterations conducted on every epoch
    # length / batchsize*6 -- 
    iteration_per_epoch = len(tr_data) // (batch_size * (update_rate + 1))
    max_iterations = 200 * iteration_per_epoch
    
    # Run training starting from current iterations to the max
    for iteration in range(sess.run(iteration_counter), max_iterations):
        print("Iteration: ", iteration)
        with pylib.Timer(is_output=False) as t:
            sess.run(update_counter)

            # Determine which epoch it is
            epoch = iteration // iteration_per_epoch
            iteration_in_epoch = iteration % iteration_per_epoch + 1

            # Learning rate
            lr_ipt = learning_rate / (10 ** (epoch // 100))

            # Train the discriminator
            # Log the info
            for i in range(update_rate):
                discriminator_summary_opt, _ = sess.run([discriminator_summary, discriminator_step], feed_dict={lr: lr_ipt})
            summary_writer.add_summary(discriminator_summary_opt, iteration)

            # Train the generator
            # Log the info
            generator_summary_opt, _ = sess.run([generator_summary, generator_step], feed_dict={lr: lr_ipt})
            summary_writer.add_summary(generator_summary_opt, iteration)

            # Log time required and epoch
            if (iteration + 1) % 1 == 0:
                print("Epoch: (%3d) (%5d/%5d) Time: %s!" % (epoch, iteration_in_epoch, iteration_per_epoch, t))

            # save
            if (iteration + 1) % 1000 == 0:
                save_path = saver.save(sess, '%s/Epoch_(%d)_(%dof%d).ckpt' % (checkpoint_dir, epoch, iteration_in_epoch, iteration_per_epoch))
                print('Model is saved at %s!' % save_path)

            # Sample every 100 iterations
            if (iteration + 1) % 100 == 0:
                x_sample_opt_list = [image_sample_input, np.full((n_sample, img_size, img_size // 10, 3), -1.0)]
                for i, b_sample_ipt in enumerate(label_sample_list):
                    _b_sample_ipt = (b_sample_ipt * 2 - 1) * threshold_value
                    if i > 0:  
                        _b_sample_ipt[..., i - 1] = _b_sample_ipt[..., i - 1] * 1.0 / threshold_value
                    x_sample_opt_list.append(sess.run(output_sample, feed_dict={image_sample: image_sample_input, s_label_sample: _b_sample_ipt}))
                sample = np.concatenate(x_sample_opt_list, 2)

                save_dir = './output/%s/sample_training' % experiment_name
                pylib.mkdir(save_dir)
                im.imwrite(im.immerge(sample, n_sample, 1), '%s/Epoch_(%d)_(%dof%d).jpg' % (save_dir, epoch, iteration_in_epoch, iteration_per_epoch))
except:
    traceback.print_exc()
finally:
    save_path = saver.save(sess, '%s/Epoch_(%d)_(%dof%d).ckpt' % (checkpoint_dir, epoch, 0, 0))
    print('Model is saved at %s!' % save_path)
    sess.close()





