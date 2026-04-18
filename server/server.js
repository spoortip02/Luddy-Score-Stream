const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    performanceLogs.push({
      method: req.method,
      endpoint: req.originalUrl,
      duration
    });
  });

  next();
});

// In-memory storage
let submissions = [];
let performanceLogs = [];

// Home route
app.get("/", (req, res) => {
  res.send("Luddy Hackathon Leaderboard API is running");
});

// Add score submission
app.post("/add", (req, res) => {
  const { teamName, judgeId, innovation, technical, presentation } = req.body;

  // Basic validation
  if (!teamName || !judgeId || innovation == null || technical == null || presentation == null) {
    return res.status(400).json({
      error: "Missing required fields: teamName, judgeId, innovation, technical, presentation"
    });
  }

  const totalScore = innovation + technical + presentation;

  const newSubmission = {
    teamName,
    judgeId,
    innovation,
    technical,
    presentation,
    totalScore,
    timestamp: new Date().toISOString()
  };

  submissions.push(newSubmission);

  res.status(201).json({
    message: "Submission added successfully",
    submission: newSubmission
  });
});

// Temporary route to view all submissions
app.get("/submissions", (req, res) => {
  res.json(submissions);
});
// Leaderboard route
app.get("/leaderboard", (req, res) => {
  // Step 1: group scores by team
  const teamScores = {};

  submissions.forEach((entry) => {
    if (!teamScores[entry.teamName]) {
      teamScores[entry.teamName] = [];
    }
    teamScores[entry.teamName].push(entry.totalScore);
  });

  // Step 2: calculate average score for each team
  const leaderboard = Object.keys(teamScores).map((team) => {
    const scores = teamScores[team];
    const avg =
      scores.reduce((sum, val) => sum + val, 0) / scores.length;

    return {
      teamName: team,
      averageScore: avg
    };
  });

  // Step 3: sort descending
  leaderboard.sort((a, b) => b.averageScore - a.averageScore);

  // Step 4: return top 10
  res.json(leaderboard.slice(0, 10));
});
// Remove all submissions for a team
app.delete("/remove/:teamName", (req, res) => {
  const teamName = req.params.teamName;

  const initialLength = submissions.length;

  submissions = submissions.filter(
    (entry) => entry.teamName.toLowerCase() !== teamName.toLowerCase()
  );

  const removedCount = initialLength - submissions.length;

  if (removedCount === 0) {
    return res.status(404).json({
      message: `No submissions found for team '${teamName}'`
    });
  }

  res.json({
    message: `Removed ${removedCount} submission(s) for team '${teamName}'`
  });
});
// Info route - statistics for all submissions
app.get("/info", (req, res) => {
  if (submissions.length === 0) {
    return res.json({
      message: "No submissions available",
      totalSubmissions: 0
    });
  }

  const scores = submissions.map((entry) => entry.totalScore).sort((a, b) => a - b);
  const n = scores.length;

  const mean = scores.reduce((sum, score) => sum + score, 0) / n;

  const median =
    n % 2 === 0
      ? (scores[n / 2 - 1] + scores[n / 2]) / 2
      : scores[Math.floor(n / 2)];

  const min = scores[0];
  const max = scores[n - 1];

  const getMedian = (arr) => {
    const len = arr.length;
    if (len === 0) return 0;
    return len % 2 === 0
      ? (arr[len / 2 - 1] + arr[len / 2]) / 2
      : arr[Math.floor(len / 2)];
  };

  const lowerHalf = scores.slice(0, Math.floor(n / 2));
  const upperHalf = scores.slice(Math.ceil(n / 2));

  const q1 = getMedian(lowerHalf);
  const q3 = getMedian(upperHalf);

  const variance =
    scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / n;
  const standardDeviation = Math.sqrt(variance);

  const distribution = {
    low: scores.filter((score) => score < 10).length,
    medium: scores.filter((score) => score >= 10 && score < 20).length,
    high: scores.filter((score) => score >= 20).length
  };

  res.json({
    totalSubmissions: n,
    mean: Number(mean.toFixed(2)),
    median,
    min,
    max,
    quartiles: {
      q1,
      q2: median,
      q3
    },
    standardDeviation: Number(standardDeviation.toFixed(2)),
    distribution
  });
});
// Performance route
app.get("/performance", (req, res) => {
  if (performanceLogs.length === 0) {
    return res.json({
      message: "No performance data available yet",
      totalRequests: 0
    });
  }

  const totalTime = performanceLogs.reduce((sum, log) => sum + log.duration, 0);
  const averageTime = totalTime / performanceLogs.length;

  res.json({
    totalRequests: performanceLogs.length,
    averageExecutionTimeMs: Number(averageTime.toFixed(2)),
    logs: performanceLogs
  });
});
// History route
app.get("/history", (req, res) => {
  const { judgeId, teamName, startDate, endDate } = req.query;

  let filteredHistory = [...submissions];

  if (judgeId) {
    filteredHistory = filteredHistory.filter(
      (entry) => entry.judgeId.toLowerCase() === judgeId.toLowerCase()
    );
  }

  if (teamName) {
    filteredHistory = filteredHistory.filter(
      (entry) => entry.teamName.toLowerCase() === teamName.toLowerCase()
    );
  }

  if (startDate) {
    filteredHistory = filteredHistory.filter(
      (entry) => new Date(entry.timestamp) >= new Date(startDate)
    );
  }

  if (endDate) {
    filteredHistory = filteredHistory.filter(
      (entry) => new Date(entry.timestamp) <= new Date(endDate)
    );
  }

  res.json({
    totalRecords: filteredHistory.length,
    history: filteredHistory
  });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});