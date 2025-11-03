const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Chemin vers ton dossier Angular compilé
app.use(express.static(path.join(__dirname, 'dist/multi-tenant-frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/multi-tenant-frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});
