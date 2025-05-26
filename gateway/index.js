const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const path    = require('path');

const nomeRoutes       = require('./routes/nome');
const rankingRoutes    = require('./routes/ranking');
const comparacaoRoutes = require('./routes/comparacao');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'ui')));

app.get('/', (_, res) =>
  res.sendFile(path.join(__dirname, 'ui', 'index.html')));


app.use('/api/nomes', nomeRoutes);
app.use('/api/ranking', rankingRoutes);
app.use('/api/comparacao', comparacaoRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found'}));

app.listen(PORT, () => console.log(`Gateway running on port ${PORT}`));
