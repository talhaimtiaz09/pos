#!/bin/bash

# Function to check if PostgreSQL is running and start it if not
start_postgres() {
    pg_isready > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        echo "PostgreSQL is not running. Starting PostgreSQL..."
        brew services start postgresql
        sleep 3  # Give some time for PostgreSQL to start
    else
        echo "PostgreSQL is already running."
    fi
}

# Start PostgreSQL if it's not already running
start_postgres

# Navigate to the backend folder and start the server
echo "Starting backend..."
cd backend
npm run dev &
backend_pid=$!

# Navigate to the frontend folder and start the frontend server
echo "Starting frontend..."
cd ../frontend
npm run dev &
frontend_pid=$!

# Give some time for the servers to start
sleep 5

# Open the frontend in the browser
echo "Opening localhost:5173 in the browser..."
open http://localhost:5173

# Wait for both processes to finish (optional)
wait $backend_pid $frontend_pid

echo "MERN app is running!"
