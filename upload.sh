shopt -s expand_aliases
source ~/.bash_profile

cd ..

rm -rf pigfarm.tar.gz

if [ "$1" == "--essential" ]; then
	tar cvf pigfarm.tar.gz --exclude='*.git' --exclude='node_module' --exclude='prettyphoto' --exclude='images' --exclude='fonts' pigfarm
else
	tar cvf pigfarm.tar.gz --exclude='*.git' pigfarm
	ssh-pigfarm 'rm -rf pigfarm'
fi

scp -i ~/keys/amazon.jiwon.pem pigfarm.tar.gz ubuntu@ec2-52-25-245-158.us-west-2.compute.amazonaws.com:/home/ubuntu

ssh-pigfarm 'tar xvf pigfarm.tar.gz'
ssh-pigfarm 'rm pigfarm.tar.gz'

say -v Yuna 업로드 완료했습니다, 멋진 주인님
