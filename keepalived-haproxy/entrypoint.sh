#!/bin/sh
set -e

# exec haproxy entry point script
exec /docker-entrypoint.sh "$@" &

# start keepalived
exec /keepalived/start-keepalived.sh