const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 3000;

const app = express();

// Configuração para parsear JSON e dados de formulário
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar o armazenamento de arquivos com Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Conectar ao banco de dados SQLite
let db;
open({
  filename: './database.db',
  driver: sqlite3.Database
}).then(database => {
  db = database;
  db.run('CREATE TABLE IF NOT EXISTS documentos (id INTEGER PRIMARY KEY, titulo TEXT, descricao TEXT, arquivo TEXT)');
});

// Servir arquivos estáticos, como a página de login
app.use(express.static(path.join(__dirname, 'public')));

// Usar as rotas de autenticação
app.use('/auth', authRoutes);

// Rota para servir a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

// Rota para adicionar um documento
app.post('/api/documentos', upload.single('arquivo'), async (req, res) => {
  const { titulo, descricao } = req.body;
  const arquivo = req.file.filename;

  try {
    await db.run('INSERT INTO documentos (titulo, descricao, arquivo) VALUES (?, ?, ?)', [titulo, descricao, arquivo]);
    res.status(201).json({ message: 'Documento adicionado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
