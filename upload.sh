shopt -s expand_aliases
source ~/.bash_profile

cd ..

rm -rf pigfarm.tar.gz
tar cvf pigfarm.tar.gz --exclude='*.git' pigfarm

ssh-pigfarm 'rm -rf pigfarm'
scp -i ~/keys/amazon.jiwon.pem pigfarm.tar.gz ubuntu@ec2-52-25-245-158.us-west-2.compute.amazonaws.com:/home/ubuntu

ssh-pigfarm 'tar xvf pigfarm.tar.gz'
ssh-pigfarm 'rm pigfarm.tar.gz'
