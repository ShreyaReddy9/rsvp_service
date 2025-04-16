import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

type RSVP = 'Yes' | 'No' | 'Maybe';

interface Player {
  name: string;
  status: RSVP;
}

let players: Player[] = [];

app.post('/rsvp', (req, res) => {
  const { name, status } = req.body;
  const existing = players.find(p => p.name === name);
  if (existing) {
    existing.status = status;
  } else {
    players.push({ name, status });
  }
  res.json({ message: 'RSVP recorded.' });
});

app.get('/attendees', (req, res) => {
  const confirmed = players.filter(p => p.status === 'Yes');
  res.json(confirmed);
});

app.get('/stats', (req, res) => {
  const total = players.length;
  const confirmed = players.filter(p => p.status === 'Yes').length;
  const declined = players.filter(p => p.status === 'No').length;
  res.json({ total, confirmed, declined });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
