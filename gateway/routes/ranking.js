const express = require('express');
const axios   = require('axios');
const router  = express.Router();

router.get('/', async (req, res) => {
  const uf     = req.query.uf     || 'BR';
  const decada = req.query.decada || '1930';

  const url = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking?decada=${decada}&localidade=${uf}`;
  try {
    const { data } = await axios.get(url);
    res.json(data[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro no serviço de ranking' });
  }
});

module.exports = router;
