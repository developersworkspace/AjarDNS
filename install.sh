# -- BUILD AND INSTALL AjarDNS --

# Update machine package indexes
sudo apt-get update

# Download and run script to install node 7
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

# Install node 7
apt-get install -y nodejs

# Install 'typescript' node package
npm install -g typescript

# Install 'gulp' node package
npm install -g gulp

# Install 'angular-cli' node package
#npm install -g @angular/cli

# Clone 'TechRadar' repository
git clone https://github.com/developersworkspace/AjarDNS.git

# Change directory to 'server'
cd ./AjarDNS/server

# Install node packages for 'server'
npm install

# Build 'web'
npm run build

# Change to root of repository
cd ./../

# Build docker images
docker-compose build --no-cache

# Run docker compose as deamon
docker-compose up -d

# Open 53 port
sudo ufw allow 53/udp
