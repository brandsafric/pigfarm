(cd ~/pigfarm/; rm -rf node_modules; cd pigfarm; rm -rf node_modules)

cd ~/pigfarm
./stop.sh

cd ~/pigfarm
# (cd ~/pigfarm; npm install monk mongodb exceljs@0.2.9)
npm install monk@4.0.0 mongodb@2.2.26 exceljs@0.2.9
# npm install monk mongodb exceljs@0.2.9

cd ~/pigfarm/pigfarm
node import.js

cd ~/pigfarm/pigfarm
npm install
# mkdir -p node_modules/bson/build/Release
# cp node_modules/bson/browser_build/* node_modules/bson/build/Release



sp1
(cd ~/pigfarm; npm list) > 1
(cd ~/pigfarm/pigfarm; npm list) > 2
exit

spi
(cd ~/pigfarm; npm list) > 1
(cd ~/pigfarm/pigfarm; npm list) > 2
exit




scp $PIGFARM_PI:/home/pi/1 1
scp $PIGFARM_PI:/home/pi/2 2

scp $KEY $PIGFARM1:/home/ubuntu/2 22
scp $KEY $PIGFARM1:/home/ubuntu/1 11

bcomp 1 11 &
bcomp 2 22 &

