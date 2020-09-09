#!/bin/bash
forever list | grep `sudo netstat -tlunp | grep 1437 | awk  '{print $7}' | sed -e 's$/node$$g'` | awk  '{print $2}' | grep -Eo '[0-9]{1,4}' > /var/www/node12_html/neuronexus/port.txt
for num in $(cat /var/www/node12_html/neuronexus/port.txt)
do forever stop $num
done
