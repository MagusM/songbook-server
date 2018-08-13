'use strict';

module.exports = (sequelize, DataTypes) => {
  var Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    genre: DataTypes.STRING,
    album: DataTypes.STRING,
    albumImageUrl: DataTypes.TEXT,
    youtubeId: DataTypes.STRING,
    lyrics: DataTypes.TEXT,
    tab: DataTypes.TEXT
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
  };
  
  return Song;
};