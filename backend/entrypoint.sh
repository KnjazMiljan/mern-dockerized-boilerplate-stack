#!/bin/sh
set -e

echo "Ensuring backend dependencies are installed..."
npm install

ls -la /app
ls -la /app/src

echo "Starting the application..."
exec "$@"