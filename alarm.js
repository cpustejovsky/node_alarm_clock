const spawn = require('child_process').spawn;
const moment = require('moment');
const prompts = require('prompts');
//TODO: Make use of prompts
//TODO: Test with lofi hiphop and something else at the office and kill two birds with one stone
const brownNoise = 'mp3/brown-noise.mp3';
const alarm = 'mp3/yes-roundabout.mp3';

fuzzyNoise = spawn('mplayer', ['-slave', brownNoise]);
fuzzyNoise.stdout.on('data', function (data) { console.log('fuzzyNoise stdout: ' + data); });
fuzzyNoise.stderr.on('data', function (data) { console.log('fuzzyNoise stderr: ' + data); });
fuzzyNoise.on('exit', function () {
    console.log('fuzzy noise exited.');
});

const time = process.argv[2].split(':');
let sleep = true;

function checkTime() {
    if (sleep) {
        var now = moment();
        if (now.hours() >= time[0] && now.minutes() >= time[1]) {
            wakeUp()
        } else {
            console.log(now.format("LTS"));
            setTimeout(checkTime, 1000 * 10);
        }
    }
}

function wakeUp() {
    console.log("fuzzy noise should exit");
    fuzzyNoise.kill();
    sleep = false;
    console.log("wake up!")
    alarmClock = spawn('mplayer', ['-slave', alarm]);
    alarmClock.stdout.on('data', function (data) { console.log('alarmClock stdout: ' + data); });
    alarmClock.stderr.on('data', function (data) { console.log('alarmClock stderr: ' + data); });
    alarmClock.on('exit', function () {
        console.log('EXIT.');
    });
}

console.log("Setting alarm for: " + time.join(":"));

checkTime();