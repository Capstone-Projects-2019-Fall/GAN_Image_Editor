import os
import random
import glob
import ntpath
import re

# testing directories
input_path = '/home/tud27582/impersonator/testing_inputs/'
result_path = '/home/tud27582/impersonator/testing_results/pretrained/'


max_result=0

for name in glob.glob(os.path.join(result_path, '*.jpg')):
#	n=int(os.path.splitext(ntpath.basename(name))[0])
	if name.find('source'):
		max_result += 1
#	if n>max_result:
#		max_result=n

max_num = max_result
print(max_result)

pictures = os.listdir(input_path)
length_dir = len(pictures)
if length_dir > 1:
	while length_dir > 1:

		str_num = str(max_num)	
		index1 = random.randrange(0, len(pictures))
		print("index1: ", index1)
		index2 = index1
		print("index2: ", index2)
		while index1 == index2:
			index2 = random.randrange(0, len(pictures))
		print("index2: ", index2)

		source_path = os.path.join(input_path, pictures[index1])
		print("source path is: " + source_path)
		target_path = os.path.join(input_path, pictures[index2])
		print("target path is: " + target_path)

		os.system("mv " + source_path + " " + os.path.join(result_path, str_num + "_source.jpg"))
		os.system("mv " + target_path + " " + os.path.join(result_path, str_num + "_target.jpg"))

		new_source_path = result_path + str_num + "_source.jpg"
		print("new source path is: " + new_source_path)
		new_target_path = result_path + str_num + "_target.jpg"
		print("new target path is: " + new_target_path)

		os.system("python run_swap.py --gpu_ids 0 --model imitator --output_dir " + result_path + " --src_path " + new_source_path + " --tgt_path " + new_target_path + " --bg_ks 13  --ft_ks 3 --has_detector --post_tune --front_warp --swap_part body --save_res")
		#length_dir -= 2
		os.rename(result_path + "result.png", result_path + str_num + "_result.jpg")

		max_num += 1
		length_dir -= 2
print("Testing input is empty")
print("Testing pre-trained model completed")
