#!/bin/bash

#############################
# EC2 configuration script
#
# Author: Sean Baskin
#############################

# Initial upgrades and updates
sudo apt-get update
sudo DEBIAN_FRONTEND=noninteractive apt-get -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold" dist-upgrade
# Configure PPAs and install software components
# sudo apt-get install python-software-properties

# Install FreeNX server for GUI use. 
sudo add-apt-repository ppa:freenx-team
sudo apt-get update
sudo apt-get install freenx-server freenx-smb freenx-rdp freenx-session-launcher gnome-session-fallback 


