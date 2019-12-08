from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import argparse
from functools import partial
import json
import traceback
import os

import imlib as im
import numpy as np
import pylib
import tensorflow as tf
import tflib as tl

import data
import models

def runModel(image_url, file_name, test_att, n_slide, image_labels, model_type):
    # ==============================================================================
    # =                                    param                                   =
    # ==============================================================================

    parser = argparse.ArgumentParser()
    parser.add_argument('--experiment_name', dest='experiment_name',default="384_shortcut1_inject1_none_hd" , help='experiment_name')
    parser.add_argument('--test_att', dest='test_att', help='test_att')
    parser.add_argument('--test_int_min', dest='test_int_min', type=float, default=-1.0, help='test_int_min')
    parser.add_argument('--test_int_max', dest='test_int_max', type=float, default=1.0, help='test_int_max')
    args_ = parser.parse_args()

    if model_type == 0:
         experiment_name = args_.experiment_name
    else:
         experiment_name = "128_custom"

    print("EXPERIMENT NAME WORKING:" + experiment_name)

    with open('./output/%s/setting.txt' % experiment_name) as f:
        args = json.load(f)

    # model
    atts = args['atts']
    n_att = len(atts)
    img_size = args['img_size']
    shortcut_layers = args['shortcut_layers']
    inject_layers = args['inject_layers']
    enc_dim = args['enc_dim']
    dec_dim = args['dec_dim']
    dis_dim = args['dis_dim']
    dis_fc_dim = args['dis_fc_dim']
    enc_layers = args['enc_layers']
    dec_layers = args['dec_layers']
    dis_layers = args['dis_layers']
    # testing
    thres_int = args['thres_int']
    test_int_min = args_.test_int_min
    test_int_max = args_.test_int_max
    # others
    use_cropped_img = args['use_cropped_img']
    n_slide = int(n_slide)

    assert test_att is not None, 'test_att should be chosen in %s' % (str(atts))

    # ==============================================================================
    # =                                   graphs                                   =
    # ==============================================================================

    # data
    sess = tl.session()


    # get image 
    print(image_url)
    if experiment_name == "128_custom":
        os.system("wget -P /home/tug44606/AttGAN-Tensorflow-master/data/img_align_celeba " + image_url)
    else:
        os.system("wget -P /home/tug44606/AttGAN-Tensorflow-master/data/img_crop_celeba " + image_url)
        
    print("Working")

    # pass image with labels to dataset
    te_data = data.Celeba('./data', atts, img_size, 1, part='val', sess=sess, crop=not use_cropped_img, image_labels=image_labels, file_name=file_name)

    sample = None

    # models
    Genc = partial(models.Genc, dim=enc_dim, n_layers=enc_layers)
    Gdec = partial(models.Gdec, dim=dec_dim, n_layers=dec_layers, shortcut_layers=shortcut_layers, inject_layers=inject_layers)

    # inputs
    xa_sample = tf.placeholder(tf.float32, shape=[None, img_size, img_size, 3])
    _b_sample = tf.placeholder(tf.float32, shape=[None, n_att])

    # sample
    x_sample = Gdec(Genc(xa_sample, is_training=False), _b_sample, is_training=False)


    # ==============================================================================
    # =                                    test                                    =
    # ==============================================================================

    # initialization
    ckpt_dir = './output/%s/checkpoints' % experiment_name
    print("CHECKPOINT DIR: " +  ckpt_dir )
    try:
        tl.load_checkpoint(ckpt_dir, sess)
    except:
        raise Exception(' [*] No checkpoint!')

    save_location = ""
    # sample
    try:
        for idx, batch in enumerate(te_data):
            xa_sample_ipt = batch[0]
            b_sample_ipt = batch[1]

            x_sample_opt_list = []

            for i in range(n_slide-1, n_slide):
                test_int = (test_int_max - test_int_min) / (n_slide - 1) * i + test_int_min
                _b_sample_ipt = (b_sample_ipt * 2 - 1) * thres_int
                _b_sample_ipt[..., atts.index(test_att)] = test_int
                x_sample_opt_list.append(sess.run(x_sample, feed_dict={xa_sample: xa_sample_ipt, _b_sample: _b_sample_ipt}))

            sample = np.concatenate(x_sample_opt_list, 2)
            save_location = '/output/%s/sample_testing_slide_%s/' % (experiment_name, test_att)
            save_dir = './output/%s/sample_testing_slide_%s' % (experiment_name, test_att)
            pylib.mkdir(save_dir)
            im.imwrite(sample.squeeze(0), '%s/%s' % (save_dir, file_name))

            print('%d.png done!' % (idx + 0))

            if(idx + 1 == te_data._img_num):
                break
    except:
        traceback.print_exc()
    finally:
        sess.close()

    if experiment_name == "128_custom":
        os.system("rm ./data/img_align_celeba/" + file_name)
    else:
        os.system("rm ./data/img_crop_celeba/" + file_name)


    return "http://129.32.22.10:7001" + save_location + file_name


