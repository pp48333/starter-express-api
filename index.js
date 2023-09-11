const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/hubspot/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.get(`https://api.hubapi.com/crm/v3/objects/contacts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      },
    });

    if (!response.status === 200) {
      throw new Error(`Réponse du serveur HubSpot non OK - Statut : ${response.status}`);
    }

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Erreur lors de la requête vers HubSpot : ', error);
    res.status(500).json({ error: 'Erreur lors de la requête vers HubSpot' });
  }
});

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
