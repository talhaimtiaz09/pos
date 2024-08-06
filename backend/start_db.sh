#!/bin/bash

# Check if PostgreSQL is running
if pg_isready -q; then
  echo "PostgreSQL is already running."
else
  echo "PostgreSQL is not running. Starting PostgreSQL..."
  brew services start postgresql

  # Wait for PostgreSQL to start
  sleep 3

  if pg_isready -q; then
    echo "PostgreSQL started successfully."
  else
    echo "Failed to start PostgreSQL."
  fi
fi
