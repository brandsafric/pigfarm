shopt -s expand_aliases
source ~/.bash_profile

cd ..

rm -rf pigfarm.tar.gz
tar cvf pigfarm.tar.gz --exclude='*.git' pigfarm

ssh-cidar 'rm -rf pigfarm'
scp pigfarm.tar.gz android@175.208.198.94:/home/android

ssh-cidar 'tar xvf pigfarm.tar.gz'
ssh-cidar 'rm pigfarm.tar.gz'
