"use server";

import { prisma } from "@/lib/prisma";

// Get today's date key in UTC
function getTodayKeyUTC(): string {
  const now = new Date();
  return now.toISOString().split('T')[0]; // YYYY-MM-DD in UTC
}

// Check if user has played today
export async function hasPlayedToday(fid: number): Promise<boolean> {
  const dayKey = getTodayKeyUTC();
  
  const play = await prisma.dailyPlay.findUnique({
    where: {
      fid_dayKey: {
        fid,
        dayKey,
      },
    },
  });

  return !!play;
}

// Record that user played today
export async function recordDailyPlay(fid: number): Promise<void> {
  const dayKey = getTodayKeyUTC();
  
  await prisma.dailyPlay.upsert({
    where: {
      fid_dayKey: {
        fid,
        dayKey,
      },
    },
    update: {},
    create: {
      fid,
      dayKey,
    },
  });
}

// Save game score
export async function saveGameScore(
  fid: number,
  score: number,
  time: number
): Promise<void> {
  const dayKey = getTodayKeyUTC();
  
  await prisma.gameScore.create({
    data: {
      fid,
      score,
      time,
      dayKey,
    },
  });
}

// Get today's leaderboard (only first score per user)
export async function getTodayLeaderboard(limit: number = 50) {
  const dayKey = getTodayKeyUTC();
  
  // Get all scores for today
  const allScores = await prisma.gameScore.findMany({
    where: { dayKey },
    orderBy: [
      { playedAt: 'asc' }, // Get earliest (first) attempt
    ],
  });

  // Group by FID and keep only first score
  const firstScoresMap = new Map();
  for (const score of allScores) {
    if (!firstScoresMap.has(score.fid)) {
      firstScoresMap.set(score.fid, score);
    }
  }

  // Convert to array and sort by score DESC, time ASC for ranking
  const firstScores = Array.from(firstScoresMap.values());
  firstScores.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score; // Higher score first
    return a.time - b.time; // Lower time first
  });

  return firstScores.slice(0, limit);
}

// Get user's score from today (first attempt only)
export async function getUserTodayScore(fid: number) {
  const dayKey = getTodayKeyUTC();
  
  const score = await prisma.gameScore.findFirst({
    where: { fid, dayKey },
    orderBy: [
      { playedAt: 'asc' }, // Get first (earliest) attempt
    ],
  });

  return score;
}

// Get total players today
export async function getTotalPlayersToday(): Promise<number> {
  const dayKey = getTodayKeyUTC();
  
  const count = await prisma.dailyPlay.count({
    where: { dayKey },
  });

  return count;
}

// Reset user's daily play (for testing)
export async function resetUserDailyPlay(fid: number): Promise<void> {
  const dayKey = getTodayKeyUTC();
  
  // Delete daily play record
  await prisma.dailyPlay.deleteMany({
    where: {
      fid,
      dayKey,
    },
  });

  // Delete all scores for today
  await prisma.gameScore.deleteMany({
    where: {
      fid,
      dayKey,
    },
  });
}
