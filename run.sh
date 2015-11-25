#!/bin/bash

cd ~
#source .bash_profile
source .profile # aws

export LC_ALL=C; cd ~/db/pigfarm/; mongod --dbpath . &

cd ~/pigfarm
cd pigfarm && npm install
DEBUG=pigfarm:* ./bin/www
