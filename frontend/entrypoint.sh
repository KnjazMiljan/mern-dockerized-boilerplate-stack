#!/bin/sh

Set working directory

cd /app

if [ ! -f index.html ]; then
echo "--- Project files missing. Scaffolding new Vite project (react-ts) into /tmp/scaffold ---"

mkdir -p /tmp/scaffold
cd /tmp/scaffold

yes | npx create-vite@latest . --template react-ts

echo "--- Moving scaffolded files to /app ---"

mv ./* /app

mv ./.gitignore /app 2>/dev/null

cd /app

fi

if [ ! -d node_modules ]; then
echo "--- node_modules folder missing. Running npm install ---"
npm install
fi

if [ ! -f node_modules/vite/bin/vite.js ]; then
echo "ERROR: Vite executable not found. Check logs."
exit 1
fi

echo "--- Starting Vite Development Server ---"
exec npm run dev -- --host 0.0.0.0