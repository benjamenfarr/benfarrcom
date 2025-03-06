# Deploying Your React Application to Amazon EC2

This guide will walk you through the process of deploying your React application to an Amazon EC2 instance.

## Prerequisites

1. An AWS account with EC2 access
2. An EC2 instance running Amazon Linux, Ubuntu, or similar Linux distribution
3. SSH access to your EC2 instance
4. A domain name (optional, but recommended for production)

## Step 1: Build Your Application

First, build your React application to generate static files:

```bash
npm run build
```

This will create a `dist` directory containing optimized static files ready for deployment.

## Step 2: Set Up Your EC2 Instance

### Connect to Your EC2 Instance

```bash
ssh -i /path/to/your-key.pem ec2-user@your-ec2-public-dns
```

Replace `/path/to/your-key.pem` with the path to your private key file and `your-ec2-public-dns` with your EC2 instance's public DNS.

### Install Node.js and npm (if not already installed)

For Amazon Linux:
```bash
sudo yum update -y
sudo yum install -y nodejs npm
```

For Ubuntu:
```bash
sudo apt update
sudo apt install -y nodejs npm
```

### Install Nginx as a Web Server

For Amazon Linux:
```bash
sudo amazon-linux-extras install nginx1
sudo systemctl start nginx
sudo systemctl enable nginx
```

For Ubuntu:
```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Step 3: Configure Nginx

Create a new Nginx configuration file:

```bash
sudo nano /etc/nginx/conf.d/react-app.conf
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # Replace with your domain or EC2 public IP

    root /var/www/html/react-app;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
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
```

Save and exit the editor (Ctrl+X, then Y, then Enter).

Test the Nginx configuration:

```bash
sudo nginx -t
```

If the test is successful, reload Nginx:

```bash
sudo systemctl reload nginx
```

## Step 4: Deploy Your Application

Create a directory for your application:

```bash
sudo mkdir -p /var/www/html/react-app
sudo chown -R $USER:$USER /var/www/html/react-app
```

### Option 1: Transfer Files Using SCP

From your local machine, use SCP to transfer the build files:

```bash
scp -i /Users/benfarr/Downloads/cdn-project-key-pair.pem -r ./dist/* ubuntu@52.53.251.117:/var/www/html/react-app/
```

### Option 2: Clone from Git Repository (if your code is in a repository)

```bash
cd /tmp
git clone https://github.com/benjamenfarr/multi-cdn-project
cd your-repo
npm install
npm run build
cp -r dist/* /var/www/html/react-app/
```

## Step 5: Set Up HTTPS (Recommended for Production)

For a production environment, you should secure your site with HTTPS using Let's Encrypt:

```bash
# For Amazon Linux
sudo amazon-linux-extras install epel
sudo yum install -y certbot python-certbot-nginx

# For Ubuntu
sudo apt install -y certbot python3-certbot-nginx
```

Obtain and install a certificate:

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Follow the prompts to complete the certificate installation.

## Step 6: Set Up Automatic Deployment (Optional)

For continuous deployment, you can set up a simple deployment script:

Create a deployment script:

```bash
nano ~/deploy.sh
```

Add the following content:

```bash
#!/bin/bash
cd /tmp
rm -rf temp-deploy
mkdir temp-deploy
cd temp-deploy

# Clone your repository
git clone https://github.com/yourusername/your-repo.git .
npm install
npm run build

# Deploy to Nginx directory
rm -rf /var/www/html/react-app/*
cp -r dist/* /var/www/html/react-app/

# Clean up
cd ..
rm -rf temp-deploy
```

Make the script executable:

```bash
chmod +x ~/deploy.sh
```

You can run this script manually or set up a webhook to trigger it automatically when you push to your repository.

## Step 7: Monitor Your Application

Set up basic monitoring for your application:

```bash
sudo yum install -y htop
```

You can use `htop` to monitor system resources:

```bash
htop
```

## Troubleshooting

### Check Nginx Logs

```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Check Nginx Status

```bash
sudo systemctl status nginx
```

### Restart Nginx

```bash
sudo systemctl restart nginx
```

### Check Firewall Settings

Make sure your EC2 security group allows inbound traffic on ports 80 (HTTP) and 443 (HTTPS).

## Conclusion

Your React application should now be deployed and accessible via your EC2 instance's public IP address or your domain name if you configured one.

For a production environment, consider setting up:

1. A load balancer for high availability
2. Auto-scaling for handling traffic spikes
3. CloudFront for CDN capabilities
4. Route 53 for DNS management
5. CloudWatch for monitoring and alerts