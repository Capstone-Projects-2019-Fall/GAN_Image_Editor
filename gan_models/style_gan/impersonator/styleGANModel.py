import os

def runModel(image1URL, image2URL, model_type):
#if __name__ == '__main__':

	source = "/home/tud27582/impersonator/input_images/source.jpg"
	target = "/home/tud27582/impersonator/input_images/target.jpg"
	
	os.system("wget -P /home/tud27582/impersonator/input_images " +  image1URL + " -O " + source)
	os.system("wget -P /home/tud27582/impersonator/input_images " +  image2URL + " -O " + target)

	#RUN YOUR GAN MODEL CODE HERE. The 2 input images should be saved in the input_images folder. 
	if model_type == '0':
		os.system("python run_swap.py --gpu_ids 0 --model imitator --output_dir ./output_images/pretrained/ --src_path " + source + " --tgt_path " + target + " --bg_ks 13  --ft_ks 3 --has_detector  --post_tune  --front_warp --swap_part body --save_res")
		pathToOutputImage = "http://129.32.22.10:9001/output_images/pretrained/result.png"
	if model_type == '1':
		os.system("python run_swap.py --gpu_ids 0 --model imitator --output_dir ./output_images/trained/ --src_path " + source + " --tgt_path " + target + " --load_path /home/tud27582/impersonator/outputs/checkpoints/exp_iPER/net_epoch_15_id_G.pth --bg_ks 13  --ft_ks 3 --has_detector  --post_tune  --front_warp --swap_part body --save_res")
	#os.system("rm input_images/fileName1")
	#os.system("rm input_images/fileName2")
		pathToOutputImage = "http://129.32.22.10:9001/output_images/trained/result.png"

	print(pathToOutputImage)
	return pathToOutputImage	#concatenate the output file name to this path

#def runTrainingModel(image1URL, image2URL):
#if __name__ == '__main__':

#	source = "/home/tud27582/impersonator/input_images/source.jpg"
#	target = "/home/tud27582/impersonator/input_images/target.jpg"
	
#	os.system("wget -P /home/tud27582/impersonator/input_images " +  image1URL + " -O " + source)
#	os.system("wget -P /home/tud27582/impersonator/input_images " +  image2URL + "-O " + target)

	#RUN YOUR GAN MODEL CODE HERE. The 2 input images should be saved in the input_images folder. 
#	os.system("python run_swap.py --gpu_ids 0 --model imitator --output_dir ./output_images/ --src_path " + source + " --tgt_path " + target + " --bg_model ./outputs/checkpoints/exp_iPER_place/net_epoch_30_id_G.pth --bg_ks 13  --ft_ks 3 --has_detector  --post_tune  --front_warp --swap_part body --save_res")
	
	#os.system("rm input_images/fileName1")
	#os.system("rm input_images/fileName2")

#	pathToOutputImage = "http://129.32.22.10:9001/impersonator/output_images/result.jpg"

#	print(pathToOutputImage)
#	return pathToOutputImage	#concatenate the output file name to this path
