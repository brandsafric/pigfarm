ssh pi@192.168.0.27 'sudo kill ' `ssh pi@192.168.0.27 "ps -ef | grep 'python' | grep sudo | grep 'dht11.py' | grep -v 'grep'" | awk '{print $2}'`

scp dht11.py pi@192.168.0.27:/home/pi

ssh pi@192.168.0.27 'sudo python /home/pi/dht11.py'
