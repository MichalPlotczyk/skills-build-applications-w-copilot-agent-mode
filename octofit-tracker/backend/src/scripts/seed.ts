import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'maya_runner',
        email: 'maya.runner@example.com',
        profile: { firstName: 'Maya', grade: 10, goal: 'Build endurance' },
      },
      {
        username: 'liam_lifts',
        email: 'liam.lifts@example.com',
        profile: { firstName: 'Liam', grade: 11, goal: 'Increase strength' },
      },
      {
        username: 'zoe_moves',
        email: 'zoe.moves@example.com',
        profile: { firstName: 'Zoe', grade: 9, goal: 'Stay active' },
      },
    ]);

    const [maya, liam, zoe] = users;

    await Team.create([
      {
        name: 'Trail Blazers',
        description: 'Run, walk, and explore together.',
        members: [maya._id, zoe._id],
      },
      {
        name: 'Power Squad',
        description: 'Strength and consistency challenge team.',
        members: [liam._id],
      },
    ]);

    await Activity.create([
      { user: maya._id, type: 'running', durationMinutes: 35, points: 70 },
      { user: liam._id, type: 'strength', durationMinutes: 45, points: 90 },
      { user: zoe._id, type: 'walking', durationMinutes: 30, points: 45 },
    ]);

    await Leaderboard.create([
      { user: liam._id, points: 320, rank: 1 },
      { user: maya._id, points: 280, rank: 2 },
      { user: zoe._id, points: 215, rank: 3 },
    ]);

    await Workout.create([
      {
        title: 'Easy Endurance Run',
        description: 'A steady run designed to build aerobic endurance.',
        difficulty: 'beginner',
        targetMinutes: 30,
      },
      {
        title: 'Full Body Circuit',
        description: 'A balanced circuit using bodyweight strength exercises.',
        difficulty: 'intermediate',
        targetMinutes: 35,
      },
      {
        title: 'Strength Builder',
        description: 'A challenging progression for experienced athletes.',
        difficulty: 'advanced',
        targetMinutes: 45,
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
