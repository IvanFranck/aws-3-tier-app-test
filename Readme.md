
### USER DATA SCRIPT

### App tier template data script

```bash

#!/bin/bash 
# Update package list and install required packages 
sudo yum update -y 
sudo yum install -y git 

# Install Node.js (use NodeSource for the latest version) 
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash - 
sudo yum install -y nodejs 

# Install PM2 globally 
sudo npm install -g pm2 

# Install pnpm globally 
sudo npm install -g pnpm 

# Define variables 
REPO_URL="https://github.com/IvanFranck/aws-3-tier-app-test.git" 
BRANCH_NAME="main" 
REPO_DIR="my-app"

# Clone the repository 
cd /home/ec2-user 
sudo -u ec2-user git clone $REPO_URL $REPO_DIR
cd $REPO_DIR

# Checkout to the specific branch 
sudo -u ec2-user git checkout $BRANCH_NAME 
cd backend 

# Install Node.js dependencies as ec2-user
sudo -u ec2-user pnpm install

# Start the application using PM2 as ec2-user
sudo -u ec2-user pnpm serve

# Ensure PM2 restarts on reboot as ec2-user
sudo -u ec2-user pm2 startup systemd 
sudo -u ec2-user pm2 save 
```

#### Web tier app template data script

```bash
#!/bin/bash
# Update package list and install required packages
sudo yum update -y
sudo yum install -y git

# Install Node.js (use NodeSource for the latest version)
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install pnpm globally 
sudo npm install -g pnpm 

# Install NGINX
sudo yum install -y nginx

# Start and enable NGINX
sudo systemctl start nginx
sudo systemctl enable nginx

REPO_URL="https://github.com/IvanFranck/aws-3-tier-app-test.git"
BRANCH_NAME="main"
REPO_DIR="my-app"
FULL_PATH_REPO_DIR="/home/ec2-user/$REPO_DIR/frontend"
ENV_FILE="$FULL_PATH_REPO_DIR/.env"



# Clone the repository as ec2-user
cd /home/ec2-user
sudo -u ec2-user git clone $REPO_URL $REPO_DIR
cd $REPO_DIR

# Checkout to the specific branch
sudo -u ec2-user git checkout $BRANCH_NAME
cd frontend

# Ensure ec2-user owns the directory
sudo chown -R ec2-user:ec2-user /home/ec2-user/my-app

# Install Node.js dependencies as ec2-user
sudo -u ec2-user pnpm install

# Build the frontend application as ec2-user
sudo -u ec2-user pnpm build

# Copy the build files to the NGINX directory
sudo cp -r dist /usr/share/nginx/html/

# Update NGINX configuration
NGINX_CONF="/etc/nginx/nginx.conf"
SERVER_NAME="<domain subdomain>"  # Replace with your actual domain name

# Backup existing NGINX configuration
sudo cp $NGINX_CONF ${NGINX_CONF}.bak

# Write new NGINX configuration
sudo tee $NGINX_CONF > /dev/null <<EOL
user nginx;
worker_processes auto;

error_log /var/log/nginx/error.log warn;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '\$remote_addr - \$remote_user [\$time_local] "\$request" '
                    '\$status \$body_bytes_sent "\$http_referer" '
                    '"\$http_user_agent" "\$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    include /etc/nginx/conf.d/*.conf;
}
EOL

# Create a separate NGINX configuration file
sudo tee /etc/nginx/conf.d/presentation-tier.conf > /dev/null <<EOL
server {
    listen 80;
    server_name $SERVER_NAME;
    root /usr/share/nginx/html/dist;
    index index.html index.htm;

    #health check
    location /health {
        default_type text/html;
        return 200 "<!DOCTYPE html><p>Health check endpoint</p>\n";
    }

    location / {
        try_files \$uri /index.html;
    }

}
EOL


# Restart NGINX to apply the new configuration
sudo systemctl restart nginx

```