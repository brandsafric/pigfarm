/*
   Temperature Alarm
*/
float sinVal;
int toneVal;
unsigned long tepTimer;

void setup() {
	pinMode(8, OUTPUT);
	Serial.begin(9600);
}

void loop() {
	int val;
	double data;
	val=analogRead(0);
	data = (double) val * (5/10.24);  // convert the voltage to temperature

	if (data > 30) {	// If the temperature is over threshold, buzzer will alarm.
		for (int x=0; x<180; x++) {
			sinVal = (sin(x*(3.1412/180)));
			toneVal = 2000+(int(sinVal*1000));
			tone(8, toneVal);
			delay(2);
		}
	} else {
		noTone(8);
	}

	if(millis() - tepTimer > 500) {	 // output the temperature value per 500ms
		 tepTimer = millis();
		 Serial.print("temperature: ");
		 Serial.print(data);
		 Serial.println("C");
	}
}
