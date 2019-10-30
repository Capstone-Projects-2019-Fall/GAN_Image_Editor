import os
import numpy as np
import tensorflow as tf

# Prepare and process dataset to be moved to training and testing methods
# Input: Dataset (Pathname), attributes
def process_dataset(data_dir, training_attributes, img_resize, batch_size, part):
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

    # Size of prefetch buffer
    prefetch_batch = 2

    # Path of direactory that contain jpg images of dataset
    img_dir_jpg = os.path.join(data_dir, 'img_align_celeba')

    # Get list of all attributes values that will be trained
    attribute_id = [convert_attribute[att] + 1 for att in training_attributes]

    # Load text file correlated with the dataset
    img_values_txt = os.path.join(data_dir, 'list_attr_celeba.txt')
    img_labels = np.loadtxt(img_values_txt, skiprows=2, usecols=attribute_id, dtype=np.int64)


    # Array containing the path names of all images 
    names = np.loadtxt(img_values_txt, skiprows=2, usecols=[0], dtype=np.str)
    img_path_name = [os.path.join(img_dir_jpg, name) for name in names]


    
    # Split off dataset into train, test, val
    if part == 'test':
        img_path_name = img_path_name[182637:]
        img_labels = img_labels[182637:]
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

        img = tf.image.crop_to_bounding_box(img, offset_h, offset_w, img_size, img_size)
        img = tf.image.resize_images(img, [img_resize, img_resize], tf.image.ResizeMethod.BICUBIC)
        img = tf.clip_by_value(img, 0, 255) / 127.5 - 1
        label = (label + 1) // 2
        return img, label

    # Get new tensor with image and labels
    dataset = dataset.map(map_func, num_parallel_calls=16)

    #v
    dataset = dataset.shuffle(4096)

    # batch dataset to given size - drop remainder will remove uneven batch at end
    dataset = dataset.apply(tf.contrib.data.batch_and_drop_remainder(batch_size))

    # Prefetch buffer 
    dataset = dataset.repeat(1).prefetch(prefetch_batch)


    print("Dataset: ", dataset)

    return dataset

if __name__ == '__main__':
    # Enable to print tensor
    #tf.enable_eager_execution()

    training_attributes = ['Bald', 'Bangs', 'Black_Hair', 'Blond_Hair', 'Brown_Hair', 'Bushy_Eyebrows', 'Eyeglasses', 'Male', 'Mouth_Slightly_Open', 'Mustache', 'No_Beard', 'Pale_Skin', 'Young']
    process_dataset('./data', training_attributes, 128, 32, part='val')
