const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 3000;

const app = express();

// Configuração para parsear JSON e dados de formulário
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos, como a página de login
app.use(express.static(path.join(__dirname, 'public')));

// Usar as rotas de autenticação
app.use('/auth', authRoutes);

// Rota para servir a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
