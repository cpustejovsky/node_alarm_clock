"use strict"

const async = require('async');
const lame = require('lame');
const fs = require('fs');
const Speaker = require('speaker');
const volume = require("pcm-volume");

var audioOptions = {
    channels: 2,
    bitDepth: 16,
    sampleRate: 44100,
    mode: lame.STEREO
};


var song = 'mp3/how_far.mp3';

function playStream(input, options) {
    var decoder = lame.Decoder();
    options = options || {};
    var v = new volume();
    if (options.volume) {
        v.setVolume(options.volume);
    }
    var speaker = new Speaker(audioOptions);
    speaker.on('finish', function() {
        if (options.loop) {
            console.log('loop');
            // i want to restart here
            start();
        }
    });
    function start() {
        //input.pos = 0;
        console.dir(input);
        v.pipe(speaker);
        decoder.pipe(v);
        input.pipe(decoder);
    }
    start();
}

var inputStream = fs.createReadStream(song);


playStream(inputStream, {
    volume: 0.5,
    loop: true
});
