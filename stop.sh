ps -ef | grep "node ./bin/www" | grep -v grep | awk '{print $2}' | xargs -i kill {}
