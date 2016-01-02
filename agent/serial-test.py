import serial

ser = serial.Serial('/dev/ttyAMA0', 9600, timeout=1)
ser.open()
#ser.write("testing")

import requests

try:
	while 1:
		response = ser.readline()
		print response
		t = response.split(" ")[1].split("C")[0]
		print t
		try:
			r = requests.post("http://ec2-52-25-245-158.us-west-2.compute.amazonaws.com:3000/monitor/temperature", data={'temperature': t})
			print(r.status_code, r.reason)
			print(r.text[:300] + '...')
		except:
			print("server not responding")
except KeyboardInterrupt:
	ser.close()
