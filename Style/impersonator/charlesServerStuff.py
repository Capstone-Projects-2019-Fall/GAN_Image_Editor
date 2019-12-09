import os


def kill():
	os.system("kill -9 `ps -ef |grep http.server |grep 9001 |awk '{print $2}'`")
	return;

def start():
	os.system("python -m http.server 9001 &")
	return;
