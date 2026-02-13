my server ip - 
ssh root@ip

Step 2: Install Node.js and NPM
# Update package index
sudo apt update
# Install curl if not present
sudo apt install curl -y
# Download setup script for Node.js 18.x (or current LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
# Install Node.js
sudo apt install -y nodejs
# Verify installation
node -v
npm -v

Step 3: Install PM2 Globally
sudo npm install -g pm2

Step 4: Setup Your Application
Clone your repository or upload your files to the VPS.

# Example using git clone
git clone https://github.com/MANSIAG1/Referal-Earning-System
# Navigate to the backend directory
cd Referal-Earning-System/server
If needed, create a 
.env
 file with your environment variables:

nano .env
# Paste your environment variables (e.g., MONGO_URI, PORT)
# Press Ctrl+X, then Y, then Enter to save

Step 5: Install Dependencies
Install the required packages for your backend.

bash
npm install
Step 6: Start the Application with PM2
Start your server using PM2. The entry file appears to be 
server.js
 (based on file listing).

bash
# Start the application
pm2 start server.js --name "backend-api"
# If you need to pass environment variables explicitly:
# PM2_SERVE_PORT=5000 pm2 start server.js --name "backend-api"

Step 7: Configure PM2 for Startup
Ensure your app restarts automatically if the server reboots.

bash
# Save the current process list
pm2 save
# Generate startup script
pm2 startup
# Copy and run the command output by the previous step
Useful PM2 Commands
Check Status: pm2 status
View Logs: pm2 logs backend-api
Restart App: pm2 restart backend-api
Stop App: pm2 stop backend-api
Delete App: pm2 delete backend-api
Monitor: pm2 monit
Step 8: Configure Firewall (Optional)
If you are using a firewall (like UFW on Ubuntu), allow the port your app runs on (e.g., 5000).

bash
sudo ufw allow 5000
# If using Nginx as a reverse proxy (recommended for production), allow Nginx full
sudo ufw allow 'Nginx Full'
Setup Nginx as Reverse Proxy (Recommended)
To access your API via a domain or standard port 80/443 instead of http://your_ip:5000:

Install Nginx: sudo apt install nginx -y
Create config: sudo nano /etc/nginx/sites-available/backend
Add configuration:
nginx
server {
    listen 80;
    server_name your_domain_or_ip;
    location / {
        proxy_pass http://localhost:5000; # Change port if needed
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
Enable site: sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled/
Test config: sudo nginx -t
Restart Nginx: sudo systemctl restart nginx
