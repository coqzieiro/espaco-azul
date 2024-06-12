const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findUser(username, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor' });
        }
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Erro no servidor' });
            }
            if (!result) {
                return res.status(400).json({ message: 'Senha incorreta' });
            }

            res.status(200).json({ message: 'Login bem-sucedido' });
        });
    });
};
