const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const dummyData = [
  { "latitude": 17.385044, "longitude": 78.486671, "timestamp": "2024-07-20T10:00:00Z" },
  { "latitude": 17.385045, "longitude": 78.486672, "timestamp": "2024-07-20T10:00:05Z" },
  // Add more dummy data points
];

app.get('/api/vehicle-location', (req, res) => {
  res.json(dummyData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
