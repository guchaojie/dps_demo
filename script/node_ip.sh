#!/bin/bash

light3_ip=`sed '/^light3=/!d;s/.*=//;s/:.*//' node_ip.conf`
light3_port=`sed '/^light3=/!d;s/.*=//;s/.*://' node_ip.conf`
light2_ip=`sed '/^light2=/!d;s/.*=//;s/:.*//' node_ip.conf`
light2_port=`sed '/^light2=/!d;s/.*=//;s/.*://' node_ip.conf`
light1_ip=`sed '/^light1=/!d;s/.*=//;s/:.*//' node_ip.conf`
light1_port=`sed '/^light1=/!d;s/.*=//;s/.*://' node_ip.conf`
light_ip=`sed '/^light=/!d;s/.*=//;s/:.*//' node_ip.conf`
light_port=`sed '/^light=/!d;s/.*=//;s/.*://' node_ip.conf`
TV_ip=`sed '/^TV=/!d;s/.*=//;s/:.*//' node_ip.conf`
TV_port=`sed '/^TV=/!d;s/.*=//;s/.*://' node_ip.conf`
fan_ip=`sed '/^fan=/!d;s/.*=//;s/:.*//' node_ip.conf`
fan_port=`sed '/^fan=/!d;s/.*=//;s/.*://' node_ip.conf`
curtain_ip=`sed '/^curtain=/!d;s/.*=//;s/:.*//' node_ip.conf`
curtain_port=`sed '/^curtain=/!d;s/.*=//;s/.*://' node_ip.conf`
door_ip=`sed '/^door=/!d;s/.*=//;s/:.*//' node_ip.conf`
door_port=`sed '/^door=/!d;s/.*=//;s/.*://' node_ip.conf`
