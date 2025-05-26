const express = require('express');
const axios   = require('axios');
const router  = express.Router();

router.get('/', async (req, res) => {
  const { nomeA, nomeB } = req.query;
  if (!nomeA || !nomeB) 
    return res.status(400).json({ 
  error: 'Parâmetros nomeA e nomeB são obrigatórios' 
});

  const url = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${encodeURIComponent(nomeA)}|${encodeURIComponent(nomeB)}`;

  try {
    const { data } = await axios.get(url);
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro no serviço de comparação' });
  }
});

module.exports = router;
