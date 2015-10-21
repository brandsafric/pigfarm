shopt -s expand_aliases
source ~/.bash_profile

ssh-cidar 'cd pigfarm; ./stop.sh'
ssh-cidar 'cd pigfarm; ./run.sh </dev/null >run.log 2>&1 &'
