const News = require("../models/news");

exports.getNews = (_, res) => {
    // Busca o usuário pelo nome de usuário
    News.getNews((err, news) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        return res.status(200).json({news: news})
    });
};

exports.fetchNewsById = (req, res) => {
    // Busca o usuário pelo nome de usuário
    News.fetchNewsById(req.params.id,(err, news) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        return res.status(200).json({news: news})
    });
};
