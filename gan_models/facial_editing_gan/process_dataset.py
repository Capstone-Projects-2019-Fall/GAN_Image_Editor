import os
import numpy as np
import tensorflow as tf


# Creating a class for each dataset to access through a session
class Dataset(object):

    def __init__(self):
        # dataset values
        self._dataset = None
        self._iterator = None
        self._batch_op = None
        self._sess = None
        # Eager execution enabled
        self._is_eager = tf.executing_eagerly()
        self._eager_iterator = None

    # Method to end session
    def __del__(self):
        if self._sess:
            self._sess.close()

    def __iter__(self):
        return self

    def __next__(self):
        try:
            b = self.get_next()
        except:
            raise StopIteration
        else:
            return b

    next = __next__

    def get_next(self):
        if self._is_eager:
            # Get next batch
            return self._eager_iterator.get_next()
        else:
            return self._sess.run(self._batch_op)

    def reset(self, feed_dict={}):
        if self._is_eager:
            self._eager_iterator = tfe.Iterator(self._dataset)
        else:
            self._sess.run(self._iterator.initializer, feed_dict=feed_dict)

    # Build dataset
    def _bulid(self, dataset, sess=None):
        self._dataset = dataset
        # Use iterator if exists
        if self._is_eager:
            self._eager_iterator = tfe.Iterator(dataset)
        else:
            # Get an Iterator
            self._iterator = dataset.make_initializable_iterator()
            # Get next batch
            self._batch_op = self._iterator.get_next()
            # Establish session
            if sess:
                self._sess = sess
            else:
                self._sess = session()

        try:
            self.reset()
        except:
            pass

    @property
    def dataset(self):
        return self._dataset

    @property
    def iterator(self):
        return self._iterator

    @property
    def batch_op(self):
        return self._batch_op

    # Code used to check conflicting attributes in the attributes list
    @staticmethod
    def check_attribute_conflict(att_batch, att_name, att_names):
        def _set(att, value, att_name):
            if att_name in att_names:
                att[att_names.index(att_name)] = value
        att_id = att_names.index(att_name)
        for att in att_batch:
            if att_name in ['Bald', 'Receding_Hairline'] and att[att_id] == 1:
                _set(att, 0, 'Bangs')
            elif att_name == 'Bangs' and att[att_id] == 1:
                _set(att, 0, 'Bald')
                _set(att, 0, 'Receding_Hairline')
            elif att_name in ['Black_Hair', 'Blond_Hair', 'Brown_Hair', 'Gray_Hair'] and att[att_id] == 1:
                for n in ['Black_Hair', 'Blond_Hair', 'Brown_Hair', 'Gray_Hair']:
                    if n != att_name:
                        _set(att, 0, n)
            elif att_name in ['Straight_Hair', 'Wavy_Hair'] and att[att_id] == 1:
                for n in ['Straight_Hair', 'Wavy_Hair']:
                    if n != att_name:
                        _set(att, 0, n)
        return att_batch


# Prepare and process dataset to be moved to training and testing methods
# Input: Dataset (Pathname), attributes
class Celeba(Dataset):
     # Dictionary to convert the labels to numerical attributes
    convert_attribute = {'5_o_Clock_Shadow': 0, 'Arched_Eyebrows': 1, 'Attractive': 2,
                'Bags_Under_Eyes': 3, 'Bald': 4, 'Bangs': 5, 'Big_Lips': 6,
                'Big_Nose': 7, 'Black_Hair': 8, 'Blond_Hair': 9, 'Blurry': 10,
                'Brown_Hair': 11, 'Bushy_Eyebrows': 12, 'Chubby': 13,
                'Double_Chin': 14, 'Eyeglasses': 15, 'Goatee': 16,
                'Gray_Hair': 17, 'Heavy_Makeup': 18, 'High_Cheekbones': 19,
                'Male': 20, 'Mouth_Slightly_Open': 21, 'Mustache': 22,
                'Narrow_Eyes': 23, 'No_Beard': 24, 'Oval_Face': 25,
                'Pale_Skin': 26, 'Pointy_Nose': 27, 'Receding_Hairline': 28,
                'Rosy_Cheeks': 29, 'Sideburns': 30, 'Smiling': 31,
                'Straight_Hair': 32, 'Wavy_Hair': 33, 'Wearing_Earrings': 34,
                'Wearing_Hat': 35, 'Wearing_Lipstick': 36,
                'Wearing_Necklace': 37, 'Wearing_Necktie': 38, 'Young': 39}

    def __init__(self, data_dir, training_attributes, img_resize, batch_size, part, shuffle=True, sess=None):
        super(Celeba, self).__init__()


        # Size of prefetch buffer
        prefetch_batch = 2

        # Path of direactory that contain jpg images of dataset
        if img_resize == 128:
            img_dir_jpg = os.path.join(data_dir, 'img_align_celeba')
        else:
            img_dir_jpg = os.path.join(data_dir, 'img_crop_celeba')

        # Get list of all attributes values that will be trained
        attribute_id = [Celeba.convert_attribute[att] + 1 for att in training_attributes]

        # Load text file correlated with the dataset
        img_values_txt = os.path.join(data_dir, 'list_attr_celeba.txt')
        img_labels = np.loadtxt(img_values_txt, skiprows=2, usecols=attribute_id, dtype=np.int64)


        # Array containing the path names of all images 
        names = np.loadtxt(img_values_txt, skiprows=2, usecols=[0], dtype=np.str)
        img_path_name = [os.path.join(img_dir_jpg, name) for name in names]


        
        # Split off dataset into train, test, val
        if part == 'test':
            img_path_name = img_path_name[182637:182657]
            img_labels = img_labels[182637:182657]
        elif part == 'val':
            img_path_name = img_path_name[182000:182637]
            img_labels = img_labels[182000:182637]
        else:
            img_path_name = img_path_name[:182000]
            img_labels = img_labels[:182000]

        # Create tensor slice
        dataset = tf.data.Dataset.from_tensor_slices((img_path_name, img_labels))

        
        #for x, y in dataset:
        #    print(x, y)


        # Add image to tensor
        def map_func(path_name, label):
            img = tf.read_file(path_name)
            img = tf.image.decode_png(img, 3)
            offset_h = 26
            offset_w = 3
            img_size = 170
            if img_resize == 384:
                img = tf.image.crop_to_bounding_box(img, offset_h, offset_w, img_size, img_size)
            img = tf.image.resize_images(img, [img_resize, img_resize], tf.image.ResizeMethod.BICUBIC)
            img = tf.clip_by_value(img, 0, 255) / 127.5 - 1
            label = (label + 1) // 2
            return img, label

        # Get new tensor with image and labels
        dataset = dataset.map(map_func, num_parallel_calls=16)

        # Check if shuffle
        if shuffle:
            dataset = dataset.shuffle(4096)

        # batch dataset to given size - drop remainder will remove uneven batch at end
        dataset = dataset.apply(tf.contrib.data.batch_and_drop_remainder(batch_size))

        # Prefetch buffer 
        dataset = dataset.repeat(-1).prefetch(prefetch_batch)
        self._bulid(dataset, sess)

        self._img_num = len(img_path_name)
    
    def __len__(self):
        return self._img_num



if __name__ == '__main__':
    # Enable to print tensor
    #tf.enable_eager_execution()

    training_attributes = ['Bald', 'Bangs', 'Black_Hair', 'Blond_Hair', 'Brown_Hair', 'Bushy_Eyebrows', 'Eyeglasses', 'Male', 'Mouth_Slightly_Open', 'Mustache', 'No_Beard', 'Pale_Skin', 'Young']
    data = Celeba('./data', training_attributes, 128, 32, part='val')
