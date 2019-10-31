const spawn = require('child_process').spawn;
const brownNoise = 'mp3/brown-noise.mp3';
const alarm = 'mp3/yes-roundabount.mp3';


fuzzyNoise = spawn('mplayer', ['-slave', brownNoise]);

const time = process.argv[2].split(':');

function checkTime() {
    const now = new Date();

    if (now.getUTCHours() >= time[0] && now.getUTCMinutes() >= time[1]) {
        fuzzyNoise.kill();
        fuzzyNoise.on('exit', function () {
            console.log('fuzzy noise exited.');
        });
        alarmClock = spawn('mplayer', ['-slave', alarm]);
        alarmClock.on('exit', function () {
            console.log('EXIT.');
        });
    } else {
        setTimeout(checkTime, 1000 * 30);
    }
}

console.log("Setting alarm for: " + time.join(":"));

checkTime();