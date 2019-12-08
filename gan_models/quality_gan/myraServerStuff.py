import os


def kill():
	os.system("kill -9 `ps -ef |grep http.server |grep 8001 |awk '{print $2}'`")
	return;

def start():
	os.system("python -m http.server 8001 &")
	return;
