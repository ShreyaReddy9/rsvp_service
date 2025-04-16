import React, { useState, useEffect } from 'react';

type RsvpStatus = 'Yes' | 'No' | 'Maybe';

interface Player {
  name: string;
  status: RsvpStatus;
}

const App = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<RsvpStatus>('Maybe');
  const [players, setPlayers] = useState<Player[]>([]);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, declined: 0 });

  const fetchData = async () => {
    const res = await fetch('http://localhost:4000/attendees');
    const attendees = await res.json();
    setPlayers(attendees);

    const statsRes = await fetch('http://localhost:4000/stats');
    const statsData = await statsRes.json();
    setStats(statsData);
  };

  const submitRsvp = async () => {
    const trimmedName = name.trim();
    const isValidName = /^[a-zA-Z ]{2,}$/.test(trimmedName);
    if (!isValidName) {
      alert("Enter a valid name (letters only, min 2 characters).");
      return;
    }

    await fetch('http://localhost:4000/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: trimmedName, status })
    });

    setName('');
    setStatus('Maybe');
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-black-600"> RSVP Form</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name"
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value as RsvpStatus)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Maybe">Maybe</option>
        </select>
        <button
          onClick={submitRsvp}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>

      <p className="text-sm italic text-black-500 mb-4">
        You can update your RSVP anytime by submitting again.
      </p>

      <h2 className="text-lg font-semibold text-green-600 mb-2">Confirmed Attendees</h2>
      <ul className="space-y-1 mb-4">
        {players.map((p, i) => (
          <li key={i} className="bg-gray-100 p-2 rounded-md">
            {p.name} — <strong>{p.status}</strong>
          </li>
        ))}
      </ul>

      <h3 className="text-md font-medium text-gray-700">📊 Stats</h3>
      <p>Total: {stats.total} | ✅ Yes: {stats.confirmed} | ❌ No: {stats.declined}</p>
    </div>
  );
};

export default App;
