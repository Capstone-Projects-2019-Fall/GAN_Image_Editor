# GAN Image Editor
#### By Devang Antala, Lee Cowan, Charles Nguyen, Myra Zubair

GAN Image Editor is a responsive web application that utilizes the ability of GAN (Generative Adversarial Networks) to edit and generate images in real time. A user can upload an image (given that it fits certain parameters) and have the ability to alter specific features of that image. Currently, the web app showcases three types of image alteration that use GAN technology: facial editing, clothing style swapping, and image quality enhancement. These features give the user various methods of customization and allows them to reach their goals without the need of any image editing software or expertise. The website also allows users to register an account and be able to store their images on the web server. This way, users can view their uploaded images alongside multiple edited versions of those same images without needing to store them locally or use any image viewing program.

## Features

- Facial Attribute Editing
	- Edit up to 13 pretrained features in a face image. 
		- Including changes hair color, skin tone/color, age of face, and more.
	- Control the intensiy of each feature you choose to edit. 
	- Edit your own custom image using facial GAN. Model can function on any input size of image. 
	- Provide 2 seperate models that can run.
		- Pre-trained model resulting in image of size 384x384
		- Custom model resulting in miage of size 128x128
- Low resolution to high resolution
- Style transfer

## Installation and References

### Web

- Database credentials need to be edited in DbConn.java (in the package DbUtils) in order to use the site's functionalities:
	- dbAndPass, a string that specifies the database, user login name and password.
	- DRIVER, a string that specifies the database driver used.
	- url, a string that specifies the url for the database.
	- isTemple(), a function that determines if the server is running on Temple's network.
	- user_table and image_table, database tables needed for the server requests. More specifics can be found in other documentation.

- Port numbers need to be changed in the following files to match what the Flask server is listening to:
	- testFlask.js
	- displayFacialGAN.js
	- displayStyleGAN.js
 	- displayQualityGAN.js

- File paths also need to be changed to correspond to different deployment environments.
- File paths are semi-hard coded in various JSP and js files.

### Facial GAN

- In order to run the facial GAN, the website should be set up initially to see bugs and error message. See web section to determine changes that need to be made there. 

- Download the gan_models folder and store it on the server that you would like to host it on. 

- Dependies for the facial GAN:
	- Python 2.7 or 3.6
	- Tensorflow 1.7
	- Optional: CUDA Toolkit can be installed to improve training time if using nvidia.  
		- https://developer.nvidia.com/cuda-toolkit-archive
	- Full enviromnment of python packages listed in /GAN_Image_Editor/gan_models/facial_editing_gan/packages.txt in this repo
	
- Once dependencies are installed, type the following command in your development environment in order to start to flask server for facial GAN. Default port that the flask server for facial app is run on is 7001.

	```console
	python facial_app.py
	```
	
- The facial GAN allows you to edit the attribute intensity and appearence in a given portrait image. 
	- The image must be in either .png or .jpeg format.
	- The facial GAN currently supports a set of 13 selectable attributes.
		- Bald, Bangs, Black_Hair, Blond_Hair, Brown_Hair, Bushy_Eyebrows, Eyeglasses, Male, Mouth_Slightly_Open, Mustache, No_Beard, Pale_Skin, Young

- In order to run the facial GAN without the website, you can utilize the following command. 

	```console
	python test_slide1.py --experiement_name [EXPERIMENT NAME] --test_att [TEST ATTRIBUTE] --test_min [TEST MIN] --test_max [TEST MAX] --n_slide [NUM INTENSITY]
	```
	- The above command only requires the experiment name and test attribute as mandatory, the rest will take default parameters. 
	

- The pre-trained models are available below. The models are for 384x384 and 128x128 images. 
	- Download custom model here: https://drive.google.com/open?id=1kVXjjcWSOwwErA1jDBh9U5mqEqlAQnh7 (
	Must be Temple Univeristy student to access)
		- Simply download and unzip folder to GAN_Image_Editor/gan_models/facial_editing_gan/output
		- Run the command shown above and replace EXPERIMENT NAME with the name of the folder in ./output.
			- Default name is 128_custom.
	- Download pre-trained model here:
		- https://github.com/LynnHo/AttGAN-Tensorflow
	
- References
	- https://github.com/LynnHo/AttGAN-Tensorflow
	- https://arxiv.org/abs/1711.1067

### Style GAN

### Image GAN
