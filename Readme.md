
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
APP_TIER_ALB_URL="http://<internal-application-tier-alb-end-point.region.elb.amazonaws.com>"  # Replace with your actual alb endpoint


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

```