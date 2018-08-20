const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: {
        type: String
    },
    artist: {
        type: String
    },
    genre: {
        type: String
    },
    album: {
        type: String
    },
    albumImageUrl: {
        type: String
    },
    youtubeId: {
        type: String
    },
    lyrics: {
        type: String
    },
    tab: {
        type: String
    }
});

module.exports = mongoose.model('Song', SongSchema);
