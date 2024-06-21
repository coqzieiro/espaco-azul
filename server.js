const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
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

// Servir arquivos estáticos, como a página de login
app.use(express.static(path.join(__dirname, 'public')));

// Sessões para login
const sessionSecret = process.env.SECRET || 'espaço-blue';
app.use(session({secret: sessionSecret, resave: false, name:'session', saveUninitialized:false}))

// Usar as rotas de autenticação
app.use('/auth', authRoutes);

// Rota para servir a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/home.html'));
});

app.get('/logout', (req, res) => {
    req.session.loggedIn = false;
    req.session.save(function (err) {
        if (err) next(err)

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err) next(err)
            res.redirect('/')
        })
    })
});

app.get('/loggedin', (req, res) => {
    res.status(200).json({ message: req.session.loggedIn ? "Sim" : "Não"});
});

// Rota para adicionar um documento
app.post('/api/documentos', upload.single('documents'), async (req, res) => {
    if(!req.session.loggedIn){
        res.status(403).json({ message: "Não autorizado" });
        return;
    }
    const { descricao } = req.body;
    const titulo = req.file.filename;

    try {
        await db.run('INSERT INTO documents (title, description) VALUES (?, ?)', [titulo, descricao]);
        res.status(201).json({ message: 'Documento adicionado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
