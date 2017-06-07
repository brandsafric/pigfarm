shopt -s expand_aliases
source ~/.bash_profile
source aliases.sh

cd ..

rm -rf pigfarm.tar.gz

if [ "$1" == "--essential" ]; then
	# tar cvf pigfarm.tar.gz --exclude='*.git' --exclude='node_module' --exclude='prettyphoto' --exclude='images' --exclude='fonts' pigfarm
	git -C pigfarm status | grep "\t" | awk '{print "pigfarm/"$NF}' | grep -v xlsx | xargs tar cvf pigfarm.tar.gz
else
	tar cvf pigfarm.tar.gz --exclude='*.git' pigfarm
	ssh-pigfarm 'rm -rf pigfarm'
fi

# scp -i ~/keys/amazon.jiwon.pem pigfarm.tar.gz ubuntu@ec2-52-25-245-158.us-west-2.compute.amazonaws.com:/home/ubuntu
# scp -i ~/keys/amazon.jiwon.pem pigfarm.tar.gz ubuntu@ec2-54-191-187-235.us-west-2.compute.amazonaws.com:/home/ubuntu
scp -i ~/keys/amazon.jiwon.pem pigfarm.tar.gz $PIGFARM1:/home/ubuntu

ssh-pigfarm 'tar xvfm pigfarm.tar.gz'
ssh-pigfarm 'rm pigfarm.tar.gz'

# say -v Yuna 업로드 완료했습니다, 멋진 주인님
osascript -e 'display notification "업로드 완료했습니다" with title "Pigfarm"'
