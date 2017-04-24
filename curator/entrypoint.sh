#!/bin/sh

CRON=${CRON:-"* * * * *"}
echo "Register cronjob: $CRON /usr/bin/curator ${COMMAND}"
/usr/bin/curator ${COMMAND}
echo "$CRON /usr/bin/curator ${COMMAND}" >>/etc/crontabs/root
crond -f -d 8 -l 8