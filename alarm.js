const spawn = require('child_process').spawn;
const moment = require('moment');
const prompts = require('prompts');
//TODO: Make use of prompts and moment!!!
const brownNoise = 'mp3/brown-noise.mp3';
const alarm = 'mp3/yes-roundabout.mp3';


fuzzyNoise = spawn('mplayer', ['-slave', brownNoise]);

const time = process.argv[2].split(':');

function checkTime() {
    var now = new Date();
    if (now.getUTCHours() >= time[0] && now.getUTCMinutes() >= time[1]) {
        console.log("fuzzy noise should exit");
        fuzzyNoise.kill();
        fuzzyNoise.on('exit', function () {
            console.log('fuzzy noise exited.');
        });
        alarmClock = spawn('mplayer', ['-slave', alarm]);
        alarmClock.on('exit', function () {
            console.log('EXIT.');
        });
    } else {
        console.log(now.getHours() + ':' + now.getMinutes());
        setTimeout(checkTime, 1000 * 60);

    }
}

console.log("Setting alarm for: " + time.join(":"));

checkTime();