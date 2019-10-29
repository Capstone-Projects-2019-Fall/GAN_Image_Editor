from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from functools import partial

import tensorflow as tf
import tensorflow.contrib.slim as slim
import tflib as tl

# Create convolutional layer
conv = partial(slim.conv2d, activation_fn=None)
# Create deconvolutional layer
dconv = partial(slim.conv2d_transpose, activation_fn=None)

# Fully connected transorformation
fc = partial(tl.flatten_fully_connected, activation_fn=None)

# ReLu activation function
relu = tf.nn.relu
# Leaky ReLu activation function
lrelu = tf.nn.leaky_relu

# batch normalization 
batch_norm = partial(slim.batch_norm, scale=True, updates_collections=None)
# instance normalization
instance_norm = slim.instance_norm


# Pass image tensor 
# Specify dimension
# n-layers = numbers of convolutional layers
# is_training = Specify if training mode or not
def Genc(data, dim=64, n_layers=5, is_training=True):
    # Batch normalization function; 
    # Default training value
    bn = partial(batch_norm, is_training=is_training)

    # Create the convolution layer - uses batch normalization and leaky relu
    conv_bn_lrelu = partial(conv, normalizer_fn=bn, activation_fn=lrelu)

    # Defining the model
    with tf.variable_scope('Genc', reuse=tf.AUTO_REUSE):
        conv_layer = data
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


def Gdec(encoded_input, labels, dim=64, n_layers=5, shortcut_layers=1, inject_layers=0, is_training=True):
    
    # Batch normalization function 
    # Default training value
    bn = partial(batch_norm, is_training=is_training)

    # Create the deconvolutional layer - uses batch normalization and ReLu
    dconv_bn_relu = partial(dconv, normalizer_fn=bn, activation_fn=relu)

    shortcut_layers = min(shortcut_layers, n_layers - 1)
    inject_layers = min(inject_layers, n_layers - 1)

    # Concatenate layers
    def _concat(encoded_input, next_input, labels):
        features = [encoded_input]
        if next_input is not None:
            features.append(next_input)
        if labels is not None:
            labels = tf.reshape(labels, [-1, 1, 1, tl.shape(labels)[-1]])
            labels = tf.tile(labels, [1, tl.shape(encoded_input)[1], tl.shape(encoded_input)[2], 1])

            # append to list
            features.append(labels)

            # concat the feature on the last channel
        return tf.concat(features, axis=3)


    # Defining the model
    with tf.variable_scope('Gdec', reuse=tf.AUTO_REUSE):
        # Start with the last tensor from the Gencoder
        deconv_layer = _concat(encoded_input[-1], None, labels)
        
        # Defining dimension sizes
        dimension = [1024, 512, 256, 128]

        # Creating each deconvolutional layer
        for i in range(n_layers):
            # first 4 layers are the same deconvolution layers
            if i < n_layers - 1:
                d = dimension[i]

                # Create the deconvolutional layer - stride is set to 4 and padding is set to 2
                # dimension value iterates through dimension array above
                deconv_layer = dconv_bn_relu(deconv_layer, d, 4, 2)
                
                # Check shortcut layer parameter
                if shortcut_layers > i:
                    deconv_layer = _concat(deconv_layer, encoded_input[n_layers - 2 - i], None)

                # Check inject layer parameter
                if inject_layers > i:
                    deconv_layer = _concat(deconv_layer, None, labels)
            else:
                # final output layer
                # apply tanh activation function
                decoder = deconv_layer = tf.nn.tanh(dconv(deconv_layer, 3, 4, 2))
        return decoder



# Pass in image tensor
# number of attributes
def D(data, n_att, dim=64, fc_dim=1024, n_layers=5):

    # Create the convolutional layer - uses instance normalization and leaky ReLu
    conv_in_lrelu = partial(conv, normalizer_fn=instance_norm, activation_fn=lrelu)



    # Definine the model
    with tf.variable_scope('D', reuse=tf.AUTO_REUSE):

        # Define dimension sizes
        dimension = [64, 128, 256, 512, 1024]


        discriminator = data

        # Creating each convolutional layer
        for i in range(n_layers):
            d = dimension[i]

            # Create the convolutional layer - stride is set to 4 and padding is set to 2 
            discriminator = conv_in_lrelu(discriminator, d, 4, 2)

        # Leaky ReLu activation function and Fully connected function
        image_gan = lrelu(fc(discriminator, fc_dim))
        # Apply another fully connected layer
        image_gan = fc(image_gan, 1)
        
        # Leaky ReLu activation function and Fully connected function
        label_gan = lrelu(fc(discriminator, fc_dim))
        # Apply another fully connected layer
        label_gan = fc(label_gan, n_att)

        return image_gan, label_gan


# Objective function for the discriminator
# Pass in image tensor and decoder tensor
def gradient_penalty(f, real, fake=None):
    def _interpolate(a, b=None):
        with tf.name_scope('interpolate'):
            if b is None:   # interpolation in DRAGAN
                beta = tf.random_uniform(shape=tf.shape(a), minval=0., maxval=1.)
                _, variance = tf.nn.moments(a, range(a.shape.ndims))
                b = a + 0.5 * tf.sqrt(variance) * beta
            shape = [tf.shape(a)[0]] + [1] * (a.shape.ndims - 1)
            alpha = tf.random_uniform(shape=shape, minval=0., maxval=1.)
            inter = a + alpha * (b - a)
            inter.set_shape(a.get_shape().as_list())
            return inter

    with tf.name_scope('gradient_penalty'):
        # Interpolation between original and reconstruction
        x = _interpolate(real, fake)

        # Get prediction from the Discriminator
        pred = f(x)
        if isinstance(pred, tuple):
            pred = pred[0]

        # Calculate gradient
        grad = tf.gradients(pred, x)[0]
        norm = tf.norm(slim.flatten(grad), axis=1)
        gp = tf.reduce_mean((norm - 1.)**2)
        return gp
