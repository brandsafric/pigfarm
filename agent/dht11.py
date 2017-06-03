import requests
import Adafruit_DHT
import time

try:
	while 1:
		h, t = Adafruit_DHT.read_retry(11, 4)
		print h
		print t
		try:
			r = requests.post("http://ec2-54-149-117-43.us-west-2.compute.amazonaws.com:3000/monitor/temperature", data={'temperature': t, 'humidity': h})
			print(r.status_code, r.reason)
			print(r.text[:300] + '...')
		except:
			print("server not responding")
		time.sleep(1)
except KeyboardInterrupt:
	ser.close()
