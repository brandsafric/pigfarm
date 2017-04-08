shopt -s expand_aliases
source ~/.bash_profile
source aliases.sh

ssh-pigfarm 'cd pigfarm; ./stop.sh'
ssh-pigfarm 'cd pigfarm; ./run.sh </dev/null >run.log 2>&1 &'
