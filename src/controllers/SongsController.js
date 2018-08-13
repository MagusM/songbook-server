const {Song} = require('../models');

module.exports = {
    async index (req, res) {
        try {
            const song = await Song.findAll({
                where: {}
            }); // will return all songs
            res.send(song);
        } catch (error) {
            res.status(500).send({
                error: 'An Error has accured with songs.'
            });
        }
    },
    async songById(req, res) {
        try {
            const song = await Song.find({
                where: req.params
            });
            if (!song) {
                res.send(500).send({
                    error: 'Failed find song.'
                });
            } else {
                res.send(song);
            }
        } catch (error) {
            res.status(500).send({
                error: 'An Error has accured with songs.'
            });
        }
    },
    async save (req, res) {
        try {
            const song = await Song.create(req.body);
            res.send(song);
        } catch (error) {
            res.status(500).send({
                error: 'Saving song failed, please try again later or contact support.'
            });
        }
    },
    async update (req, res) {
        try {
            const result = await Song.update(req.body, {
                where: req.params
            });
            res.send(result);
        } catch (error) {
            res.status(500).send({
                // error: 'An Error has accured updating song.'
                error: error
            });
        }
    }
}