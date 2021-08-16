#!/usr/bin/env bash

# Make executable

chmod 755 todoapp.sh



# Install postgres

# Create the file repository configuration:
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# Import the repository signing key:
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Update the package lists:
sudo apt-get update

# Install the latest version of PostgreSQL.
sudo apt-get -y install postgresql



# Install Node js

sudo apt install nodejs

sudo apt install npm




# Install Node dependencies

npm install



# Create database and tables

sudo -u postgres psql -c "CREATE DATABASE todoapp;"
sudo -u postgres psql -d todoapp -f ./db.sql



# Run index.js file

node index


# Now the app is running in localhost:3000