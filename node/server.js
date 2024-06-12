const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const db = require('./db/database');
const migration = require('./migrations/create_users_table'); // Executa o script de migração

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
