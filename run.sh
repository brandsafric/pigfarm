cd /home/android
source .bash_profile

cd pigfarm
cd pigfarm && npm install
DEBUG=pigfarm:* ./bin/www
