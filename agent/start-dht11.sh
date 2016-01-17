ssh pi@192.168.0.24 'sudo kill ' `ssh pi@192.168.0.24 "ps -ef | grep 'python' | grep sudo | grep 'dht11.py' | grep -v 'grep'" | awk '{print $2}'`

ssh pi@192.168.0.24 'sudo python ~/dht11.py </dev/null >run.log 2>&1 &'
