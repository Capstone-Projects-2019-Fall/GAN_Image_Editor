from functools import partial

import tensorflow as tf
import tensorflow.contrib.slim as slim
import tflib as tl


conv = partial(slim.conv2d, activation_fn=None)
dconv = partial(slim.conv2d_transpose, activation_fn=None)
fc = partial(tl.flatten_fully_connected, activation_fn=None)
relu = tf.nn.relu
lrelu = tf.nn.leaky_relu
batch_norm = partial(slim.batch_norm, scale=True, updates_collections=None)
instance_norm = slim.instance_norm



def Genc(model, dim=64, n_layers=5, is_training=True):
    bn = partial(batch_norm, is_training=is_training)

    # Create the convolution layer - uses batch normalization and leaky relu
    conv_bn_lrelu = partial(conv, normalizer_fn=bn, activation_fn=lrelu)

    with tf.variable_scope('Gencoder', reuse=tf.AUTO_REUSE):
        conv_layer = model
        encoder_model = []
        dimension = [64, 128, 256, 512, 1024]
        # Creating number of convolutional layers for encorder, 5 for 128x128
        for i in range(n_layers):
            d = dimension[i]
            # Create the convolution layer - stride is set to 4 and padding is 2 - dimension is defined above
            conv_layer = conv_bn_lrelu(conv_layer, d, 4, 2)
            # Add to the model
            encoder_model.append(conv_layer)
        return encoder_model