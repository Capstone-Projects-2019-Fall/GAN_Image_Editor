from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import argparse
from functools import partial
import json
import traceback


import imlib as im
import numpy as np
import pylib
import tensorflow as tf
import tflib as tl

import process_dataset
import model



parser = argparse.ArgumentParser()

# Define all variable for test and model parameters
parser.add_argument('--experiment_name', dest='experiment_name', help='experiment_name')
parser.add_argument('--img_size', dest='img_size', default=128)
parser.add_argument('--test_att', dest='test_att', help='test_att')
parser.add_argument('--test_int_min', dest='test_int_min', type=float, default=-1.0, help='test_int_min')
parser.add_argument('--test_int_max', dest='test_int_max', type=float, default=1.0, help='test_int_max')
parser.add_argument('--n_slide', dest='n_slide', type=int, default=10, help='n_slide')
args = parser.parse_args()

# Model Parameters
atts = ['Bald', 'Bangs', 'Black_Hair', 'Blond_Hair', 'Brown_Hair', 'Bushy_Eyebrows', 'Eyeglasses', 'Male', 'Mouth_Slightly_Open', 'Mustache', 'No_Beard', 'Pale_Skin', 'Young']
n_att = len(atts)
img_size = args.img_size
shortcut_layers = 1
inject_layers = 0
enc_dim = 64
dec_dim = 64
dis_dim = 64
dis_fc_dim = 1024
enc_layers = 5
dec_layers = 5
dis_layers = 5

if(img_size == 384):
    enc_dim = 48
    dec_dim = 48
    dis_dim = 48
    dis_fc_dim = 512
    shortcut_layers = 1
    inject_layers = 1
    

# Test parameters
test_att = args.test_att
thres_int = .5
test_int_min = args.test_int_min
test_int_max = args.test_int_max
n_slide = args.n_slide

experiment_name = args.experiment_name

# Generate models

sess = tl.session()
test_data = process_dataset.Celeba('./data', atts, img_size, 1, part='test', sess=sess)

# models
Genc = partial(model.Genc, dim=enc_dim, n_layers=enc_layers)
Gdec = partial(model.Gdec, dim=dec_dim, n_layers=dec_layers, shortcut_layers=shortcut_layers, inject_layers=inject_layers)

# inputs
image_sample = tf.placeholder(tf.float32, shape=[None, img_size, img_size, 3])
label_sample = tf.placeholder(tf.float32, shape=[None, n_att])

# sample
output_sample = Gdec(Genc(image_sample, is_training=False), label_sample, is_training=False)

# Use latest trained model
checkpoint_dir = './output/%s/checkpoints' % experiment_name
try:
    tl.load_checkpoint(checkpoint_dir, sess)
except:
    raise Exception(' [*] No checkpoint!')

# Generate sample 
try:
    for index, batch in enumerate(test_data):
        # Get first data batch
        image_sample_output = batch[0]
        label_sample_output = batch[1]

        test_output = [image_sample_output, np.full((1, img_size, img_size // 10, 3), -1.0)]
        for i in range(n_slide):
            # Get testing value
            test_int = (test_int_max - test_int_min) / (n_slide - 1) * i + test_int_min
            label_output = (label_sample_output * 2 - 1) * thres_int
            # Set test attribute to the testing value
            label_output[..., atts.index(test_att)] = test_int
            # Get output 
            test_output.append(sess.run(output_sample, feed_dict={image_sample: image_sample_output, label_sample: label_output}))

        # Add to samoke
        sample = np.concatenate(test_output, 2)


        # Save to output  
        save_dir = './output/%s/sample_testing_slide_%s' % (experiment_name, test_att)
        pylib.mkdir(save_dir)
        # Get images
        im.imwrite(sample.squeeze(0), '%s/%d.png' % (save_dir, index + 182638))

        print('%d.png done!' % (index + 182638))

except:
    traceback.print_exc()
finally:
    sess.close()