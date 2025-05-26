const express = require('express');
const axios   = require('axios');
const router  = express.Router();

router.get('/:nome', async (req, res) => {
  const { nome } = req.params;
  const { de, ate } = req.query;

  const apiUrl = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${encodeURIComponent(nome)}` +
                 (de && ate ? `?decada=${de}&ate=${ate}` : '');

  try {
    const { data } = await axios.get(apiUrl);
    res.json(data[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro no serviço de nomes' });
  }
});

module.exports = router;
