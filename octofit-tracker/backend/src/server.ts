import express from 'express';
import { connectDatabase } from './config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';
import { createCrudRouter } from './routes/crud.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl, database: 'octofit_db' });
});

app.use('/api/users', createCrudRouter(User));
app.use('/api/teams', createCrudRouter(Team));
app.use('/api/activities', createCrudRouter(Activity));
app.use('/api/leaderboard', createCrudRouter(Leaderboard));
app.use('/api/workouts', createCrudRouter(Workout));

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(400).json({ error: 'Request could not be completed' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
  connectDatabase().catch((error: unknown) => {
    console.error('Error connecting to octofit_db:', error);
  });
});