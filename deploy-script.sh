#!/bin/bash

# Exit on error
set -e

# Variables
APP_NAME="cdn-showcase-website"
DEPLOY_DIR="/var/www/html/$APP_NAME"
NGINX_CONF="/etc/nginx/sites-available/$APP_NAME"
NGINX_ENABLED="/etc/nginx/sites-enabled/$APP_NAME"

echo "Starting deployment process for $APP_NAME..."

# Update system packages
echo "Updating system packages..."
sudo apt update -y || sudo yum update -y

# Install Node.js and npm if not already installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js and npm..."
    # Try apt (Ubuntu/Debian)
    sudo apt install -y nodejs npm || sudo yum install -y nodejs npm
fi

# Install Nginx if not already installed
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    # Try apt (Ubuntu/Debian)
    sudo apt install -y nginx || sudo amazon-linux-extras install nginx1 -y
    sudo systemctl start nginx
    sudo systemctl enable nginx
fi

# Create deployment directory
echo "Creating deployment directory..."
sudo mkdir -p $DEPLOY_DIR
sudo chown -R $USER:$USER $DEPLOY_DIR

# Build the application
echo "Building the application..."
npm install
npm run build

# Deploy the build files
echo "Deploying build files to $DEPLOY_DIR..."
sudo rm -rf $DEPLOY_DIR/*
sudo cp -r dist/* $DEPLOY_DIR/

# Create Nginx configuration
echo "Configuring Nginx..."
sudo tee $NGINX_CONF > /dev/null << EOF
server {
    listen 80;
    server_name _;  # Replace with your domain if available

    root $DEPLOY_DIR;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Disable caching for service worker
    location = /service-worker.js {
        expires off;
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
    }
}
EOF

# Enable the site
if [ -d "/etc/nginx/sites-enabled" ]; then
    # Debian/Ubuntu style
    sudo ln -sf $NGINX_CONF $NGINX_ENABLED
else
    # Amazon Linux/CentOS style
    sudo cp $NGINX_CONF /etc/nginx/conf.d/$APP_NAME.conf
fi

# Test Nginx configuration
echo "Testing Nginx configuration..."
sudo nginx -t

# Reload Nginx
echo "Reloading Nginx..."
sudo systemctl reload nginx

echo "Deployment completed successfully!"
echo "Your application should now be accessible via your EC2 instance's IP address or domain."