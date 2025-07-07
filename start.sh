#!/bin/bash

# Make script executable automatically
chmod +x "$0"

echo "🚀 Starting DTS Developer Challenge Project..."
echo "⚠️  Make sure Docker is running on your system"
echo ""

echo "📦 Starting Docker services..."
# shellcheck disable=SC2164
cd backend/task-manager
docker-compose up -d

echo ""
echo "🔨 Building backend..."
./gradlew clean build

echo ""
echo "⚡ Starting backend application..."
./gradlew bootRun &

echo ""
echo "⏳ Waiting for backend to initialize (30 seconds)..."
sleep 30

echo ""
echo "🎨 Installing frontend dependencies and starting..."
# shellcheck disable=SC2164
cd ../../frontend/task-manager-ui
npm install
npm start