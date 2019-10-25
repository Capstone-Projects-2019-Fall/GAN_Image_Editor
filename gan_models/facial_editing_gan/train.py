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
from process_dataset import process_dataset
import model



# -------------------------     INITIALIZE DATA/PARAMETERS ----------------------------------


atts = ['Bald', 'Bangs', 'Black_Hair', 'Blond_Hair', 'Brown_Hair', 'Bushy_Eyebrows', 'Eyeglasses', 'Male', 'Mouth_Slightly_Open', 'Mustache', 'No_Beard', 'Pale_Skin', 'Young']
img_size = 128

# batch_size 
batch_size = 32

n_sample = 64
# threshold value
threshold_value = 0.5


# Create tensorflow session and get data
sess = tl.session()
tr_data = process_dataset('./data', atts, img_size, batch_size, part='train')
val_data = process_dataset('./data', atts, img_size, n_sample, part='val')

# Create iterators for both the training and validation set
tr_iterator = tr_data.make_initializable_iterator()
val_iterator = val_data.make_initializable_iterator()

# Get first batch of training data
batch_current = tr_iterator.get_next()

# ----------------------------------------------------------------------------------------------


# -------------------------   DEFINE MODELS   -------------------------------------------
 
# Initialize all models

# The Generator encoder - 5 convolution layer with batch normalization and leaky ReLu
# Dim range for default image size (128x128) is 64 - 1024 | double output dimension on every layer
Genc = partial(model.Genc, dim=64, n_layers=5)
Gdec = partial(model.Gdec, dim=64, n_layers=5, shortcut_layers=1, inject_layers=0)
D = partial(model.D, n_att=len(atts), dim=64, fc_dim=1024, n_layers=5)

# The Generator decoder - 4 Deconvolutinal layers with batch normalization and ReLu - last layer with tanh activation function

# The Discriminator - The adobe the the 


# -------------------------------------------------------------------------------------

# -----------------------    INITIALIZE MODELS -------------------------------------------------

# First tensor is image (32, 128, 128, 3) - 32 sample with 128x128 images in 3 channels RGB
image_tensor = batch_current[0]
# Second tensor is labels (32, 13) - 32 sample with all N testing labels - default is 13  
label_tensor = batch_current[1]

print("Batch op: ", batch_current)
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



# ------------------------------------------------------------------------------------------------