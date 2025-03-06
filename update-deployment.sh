#!/bin/bash

# Exit on error
set -e

# Variables
APP_NAME="cdn-showcase-website"
DEPLOY_DIR="/var/www/html/$APP_NAME"

echo "Starting update process for $APP_NAME..."

# Build the application
echo "Building the application..."
npm install
npm run build

# Deploy the build files
echo "Deploying build files to $DEPLOY_DIR..."
sudo rm -rf $DEPLOY_DIR/*
sudo cp -r dist/* $DEPLOY_DIR/

# Reload Nginx
echo "Reloading Nginx..."
sudo systemctl reload nginx

echo "Update completed successfully!"
echo "Your application has been updated and should be accessible via your EC2 instance's IP address or domain."