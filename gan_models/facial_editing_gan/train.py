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



atts = ['Bald', 'Bangs', 'Black_Hair', 'Blond_Hair', 'Brown_Hair', 'Bushy_Eyebrows', 'Eyeglasses', 'Male', 'Mouth_Slightly_Open', 'Mustache', 'No_Beard', 'Pale_Skin', 'Young']
img_size = 128
batch_size = 32
n_sample = 64

# Create tensorflow session and get data
sess = tl.session()
tr_data = process_dataset('./data', atts, img_size, batch_size, part='train')
val_data = process_dataset('./data', atts, img_size, n_sample, part='val')

# Create iterators for both the training and validation set
tr_iterator = tr_data.make_initializable_iterator()
val_iterator = val_data.make_initializable_iterator()

# Get first batch of training data
batch_current = tr_iterator.get_next()


# Create model
Genc = partial(model.Genc, dim=64, n_layers=5)

# First tensor is image (32, 128, 128, 3) - 32 sample with 128x128 images in 3 channels RGB
xa = batch_current[0]
# Second tensor is labels (32, 13) - 32 sample with all N testing labels - default is 13  
a = batch_current[1]

print("Batch op: ", batch_current)
print("Xa: ",xa)
print("a: ", a)