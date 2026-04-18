Luddy Score Stream — Backend

This backend implements a dynamic leaderboard system for the Luddy Hackathon. It allows judges to submit scores, computes rankings, and generates statistical insights in real time.

Tech Stack

Backend: Node.js, Express.js
Database: MongoDB
API Testing: Postman
Deployment: Render
Containerization: Docker

Core Endpoints

POST /login → judge login
POST /add → submit score
DELETE /remove/:teamName → remove team
GET /leaderboard → ranked results
GET /info → statistics (mean, median, std, range, gap)
GET /history → submissions with filtering
GET /performance → API performance
GET /dashboard → aggregated data

How to Run

git clone <BACKEND_REPO_URL>
cd server
npm install
node server.js

To build and run the backend:

docker build -t luddy-backend .
docker run -p 5000:5000 luddy-backend

Server runs at: http://localhost:5000
