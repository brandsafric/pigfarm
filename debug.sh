./upload.sh --essential

shopt -s expand_aliases
source ~/.bash_profile

ssh-pigfarm 'cd pigfarm; ./stop.sh'
ssh-pigfarm 'cd pigfarm; ./run.sh' &
