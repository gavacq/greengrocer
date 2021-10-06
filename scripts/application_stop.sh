#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
pm2 stop greengrocer && pm2 delete greengrocer
pkill -f node