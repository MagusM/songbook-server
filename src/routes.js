const AuthenticationController = require('./controllers/AthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const SongsController = require('./controllers/SongsController');

function findOne(model, obj) {
    try {
        const result = model.find({
            where: obj
        });
        
        return result;
    } catch (error) {
        
    }
}

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send({
            message: 'SongBook is server is up and running'
        });
    });
    
    app.post('/register', 
        AuthenticationControllerPolicy.register,
        AuthenticationController.register
    );

    app.post('/login', AuthenticationController.login);

    app.get('/songs', SongsController.index)
       .get('/songs/:id', SongsController.songById)
       .post('/songs', SongsController.save)
       .put('/songs/:id', SongsController.update);
};
