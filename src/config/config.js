module.exports = {
    port: process.env.port || '8081',
    authentication: {
        jwsSecret: process.env.JSW_SECRET || 'secret'
    },
    db: {
        development: {
            username: 'root',
            password: 'password1',
            database: 'songbook',
            url: 'mongodb://root:password1@ds261450.mlab.com:61450/songsbook'
        },
        production: {
            username: 'root',
            password: 'password1',
            database: 'songbook',
            url: 'mongodb://root:password1@ds261450.mlab.com:61450/songsbook'
        }
    }
};
