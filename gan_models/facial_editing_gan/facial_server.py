import os


def kill():
	os.system("kill -9 `ps -ef |grep http.server |grep 7001 |awk '{print $2}'`")
	return;

def start():
	os.system("python -m http.server 7001 &")
	return;
