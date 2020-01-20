const spawn = require("child_process").spawn;
const moment = require("moment");
const prompts = require("prompts");
const fs = require("fs");
const Randomizer = require("./randomizer");
// const alarm = "mp3/alarms/mr_blue_sky.mp3";
const brownNoise = "mp3/brown-noise.mp3";
console.clear();
const data = fs.readdirSync("./mp3/alarms");
let alarmMp3s = Randomizer.randomizeArr(data).map(item => `mp3/alarms/${item}`);

let sleep = true;
const playFuzzyNoise = () => {
  fuzzyNoise = spawn("mplayer", ["-slave", brownNoise]);
  fuzzyNoise.stdout.on("data", function(data) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("fuzzyNoise stdout: " + data);
  });
  fuzzyNoise.stderr.on("data", function(data) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("fuzzyNoise stderr: " + data);
  });
  fuzzyNoise.on("exit", function() {
    console.log("fuzzy noise exited.");
  });
};

const setWakeUpTime = async function() {
  const questions = [
    {
      type: "number",
      name: "hour",
      message: "Set Hour",
      validate: hour =>
        13 > hour > 0 ? true : "Please enter a correct hour (1-12)"
    },
    {
      type: "number",
      name: "minute",
      message: "Set Minute",
      validate: minute =>
        61 > minute > -1 ? true : "Please enter a correct minute (0-60)"
    },
    {
      type: "select",
      name: "meridiem",
      message: "AM or PM?",
      choices: [{ value: "AM" }, { value: "PM" }]
    }
  ];

  const response = await prompts(questions);
  if (response) {
    playFuzzyNoise();
    console.log(
      `Setting alarm for ${response.hour}:${response.minute} ${response.meridiem}`
    );
    checkTime(response);
  }
};

function checkTime(time) {
  if (sleep) {
    let now = moment();
    if (
      Number(now.format("hh")) === time.hour &&
      Number(now.format("mm")) === time.minute &&
      now.format("A") === time.meridiem
    ) {
      wakeUp();
    } else {
      setTimeout(function() {
        checkTime(time);
      }, 1000);
    }
  }
}
function wakeUp(mp3Arr) {
  console.log("fuzzy noise should exit");
  // fuzzyNoise.kill();
  sleep = false;
  console.log("wake up!");

  alarmClock = spawn("mplayer", ["-slave", alarmMp3s[0]]);
  alarmClock.stdout.on("data", function(data) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("Alarm clock stdout: " + data);
  });
  alarmClock.stderr.on("data", function(data) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("Alarm clock stderr: " + data);
  });
  alarmClock.on("exit", function() {
    console.log("Bubye!")
  });
}
// setWakeUpTime();
wakeUp(alarmMp3s);
