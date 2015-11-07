#!/bin/bash

cd /home/ubuntu
#source .bash_profile
source .profile # aws

cd pigfarm
cd pigfarm && npm install
DEBUG=pigfarm:* ./bin/www
