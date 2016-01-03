ssh pi@192.168.0.24 "ps -ef | grep 'python' | grep 'serial-test.py' | grep -v 'grep' | awk '{print $2}' | xargs -i kill {}"

ssh pi@192.168.0.24 'python ~/serial-test.py </dev/null >run.log 2>&1 &'
