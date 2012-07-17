#!/bin/bash

############################################################
# Set-up script when connecting to an EC2 instance via SSH
# for Ubuntu 12.04 LTS Desktop
#
# AMI: 
# ID: 
# Public DNS: 
#
# Author: Sean Baskin
############################################################

# Enable the multiverse
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup
sudo nano /etc/apt/sources.list
# Configure PPAs and install software components
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-jdk7-installer
sudo apt-get install ec2-api-tools

ec2-create-keypair <KEYPAIR>
chmod 400 <KEYPAIR>.pem	# Copy key into <KEYPAIR>.pem

# Set path environment variable
export EC2_KEYPAIR=/home/sean/Documents/UTC/REU_2012/.ec2
export EC2_UTL=https://ec2.us-east-1.amazonaws.com					# export EC2_UTL=https://ec2.<REGION>.amazonaws.com
export EC2_PRIVATE_KEY=${EC2_KEYPAIR}/pk-YOBDXXIN6OA6JJQ24L6LAL7RGAEGXXXG.pem		# export EC2_PRIVATE_KEY=${EC2_KEYPAIR}/pk-<>.pem
export EC2_CERT=${EC2_KEYPAIR}/cert-YOBDXXIN6OA6JJQ24L6LAL7RGAEGXXXG.pem		# export EC2_CERT=${EC2_KEYPAIR}/cert-<>.pem
export EC2_HOME=/usr/lib/ec2-api-tools
# export AWS_RDS_HOME=
export JAVA_HOME=/usr/bin/java
source ~/.bashrc

# Launch an instance
ec2-run-instances ami-a29943cb -g utc_ec2_alpha -k utc_aws_beta_v2 -t t1.micro

# SSH Initialization
ssh -i <KEYPAIR>.pem ubuntu@<Public DNS>

# Create an image from running instance
ec2-create-image -n <imageName> <instanceID>

# Terminate an instance
ec2-terminate-instances i-<instanceID>

# Setup and install NXClient
sudo wget http://64.34.161.181/download/3.5.0/Linux/nxclient_3.5.0-7_amd64.deb
sudo dpkg -i nxclient_3.5.0-7_amd64.deb
