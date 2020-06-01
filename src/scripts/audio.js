"use strict";
// if API of web work here
// we will not net to make internal script

// when we change the platform just remove ;;const path = require("path");
const path = require("path");

function MediaPlayer(path_audio_file) {
    this.__audio = new Audio(path.resolve(__dirname, path_audio_file));
}

MediaPlayer.prototype.start = function() {
    this.__audio.play();
};

MediaPlayer.prototype.stop = function() {
    this.__audio.pause();
    this.__audio.currentTime = 0;
};

MediaPlayer.prototype.restart = function() {
    this.stop();
    this.__audio.load();
    this.__audio.play();
};

MediaPlayer.prototype.setVolume = function(value) {
    this.__audio.volume = value;
};


exports.MediaPlayer = MediaPlayer;