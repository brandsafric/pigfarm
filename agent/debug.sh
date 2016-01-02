ssh pi@192.168.0.24 "ps -ef | grep 'python' | grep 'serial-test.py' | grep -v 'grep' | awk '{print $2}' | xargs -i kill {}"

scp serial-test.py pi@192.168.0.24:/home/pi

ssh pi@192.168.0.24 'python /home/pi/serial-test.py'
