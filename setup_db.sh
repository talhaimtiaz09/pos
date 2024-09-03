#!/bin/bash

# Function to check if Node.js is installed
check_node_installed() {
  if command -v node > /dev/null 2>&1; then
    echo "Node.js is installed."
    return 0
  else
    echo "Node.js is not installed. Please install Node.js first."
    return 1
  fi
}

# Function to create PostgreSQL user and database
setup_postgres() {
  local user="talhaimtiaz"
  local dbname="inventory"
  local password="root"

  echo "Creating PostgreSQL user and database..."
# Switch to the postgres user and open psql
    #  psql -U postgres  
    # sudo -u talhaimtiaz createuser $user 
    #  psql -U postgres -c "\q;"
    sudo psql -U postgres -c "CREATE ROLE test LOGIN NOSUPERUSER INHERIT CREATEDB CREATEROLE;" postgres



#   # Execute PostgreSQL commands
#   sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"  # Replace 'newpassword' with your actual password
#   sudo -u postgres psql -c "CREATE USER $user WITH PASSWORD '$password';"
#   sudo -u postgres psql -c "CREATE DATABASE $dbname;"
#   sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $dbname TO $user;"
}

# Function to run the Node.js script
run_node_script() {
  local script="backend/config/db_setup.js"
  echo "Running Node.js script: $script"
  node $script
}

# Main script execution
if check_node_installed; then
  setup_postgres
  # Uncomment the line below if you have a Node.js script to run
  # run_node_script
fi
