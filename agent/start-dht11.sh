#ssh pi@192.168.0.27 'sudo kill ' `ssh pi@192.168.0.27 "ps -ef | grep 'python' | grep sudo | grep 'dht11.py' | grep -v 'grep'" | awk '{print $2}'`
#ssh pi@192.168.0.27 'sudo python ~/dht11.py </dev/null >run.log 2>&1 &'
