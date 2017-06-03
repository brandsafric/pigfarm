rm -rf ~tmp
mkdir ~tmp
cd ~tmp
git clone ../../pigfarm
cd pigfarm/
./upload.sh 
./start.sh 
cd ../..
rm -rf ~tmp
