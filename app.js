const express = require('express');
const bodyParser = require('body-parser');
const professoresRoutes = require('./routes/professores');

const app = express();
app.use(bodyParser.json());

app.use('/api/professores', professoresRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando', {PORT});
});
