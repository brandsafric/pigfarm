rm -rf test
mkdir test
cd test
git clone ../../pigfarm
cd pigfarm/
./upload.sh 
./start.sh 
cd ../..
rm -rf test
