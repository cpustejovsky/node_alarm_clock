/*
Step One: Ask for User Input
Ask them what time they want to wake up.
    Verify that they entered a time that the computer understands. Make sure the program can convert things like 5:00am into something useful.
Step Two: Tell them what times they would need to sleep in order to have:
    9 hours of sleep
    7.5 hours of sleep
    6 hours of sleep
    4.5 hours of sleep (include a warning not to do this)
Step Three:
    Determine the amount of time between NOW/PRESENT and the time indicated by user input
    inputTime - presentTime = programingRunTime
Step Four:
    Begin playing soft brown noise or some other kind of fuzzy noise for programmingRunTime - 15 minutes
    Wait for 15 minutes once brown noise finished playing (after programmingRunTime - 15 minutes)
    After programmingRunTime, play a random selection of music from an array.
Step Five:
    Keep playing the songs until the user submits the input:
        "I am awake and out of bed and intend to have a good day by the Grace of God"
What's needed:

To git gud with asynchronous programming because of all the waiting this will have to do.
Basically, how do I make JavaScript function wait?

I'll need to write up a function that runs before it even asks for user-input
    Check for .mp3s in /mp3s and push them into var randomlySelectedArray[]
    */


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


var song = '/home/cpustejovsky/Desktop/alarm/mp3s/chopsuey.mp3';

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