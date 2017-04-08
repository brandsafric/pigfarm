./upload.sh --essential

shopt -s expand_aliases
source ~/.bash_profile
source aliases.sh

ssh-pigfarm 'cd pigfarm; ./stop.sh'
ssh-pigfarm 'cd pigfarm; ./run.sh' &

say -v Yuna 서버를 재시작했습니다, 멋진 주인님
