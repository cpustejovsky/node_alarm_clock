const spawn = require("child_process").spawn;
const moment = require("moment");
const prompts = require("prompts");
//TODO: Make use of prompts
//TODO: Test with lofi hiphop and something else at the office and kill two birds with one stone
const brownNoise = "mp3/brown-noise.mp3";
const alarm = "mp3/yes-roundabout.mp3";

const playFuzzyNoise = () => {
  fuzzyNoise = spawn("mplayer", ["-slave", brownNoise]);
  fuzzyNoise.stdout.on("data", function(data) {
    console.log("fuzzyNoise stdout: " + data);
  });
  fuzzyNoise.stderr.on("data", function(data) {
    console.log("fuzzyNoise stderr: " + data);
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
    console.log(`Setting alarm for ${response.hour}:${response.minute} ${response.meridiem}`);
    checkTime(response);
  }
};

let sleep = true;

function checkTime(time) {
  if (sleep) {
    var now = moment();
    if (
      Number(now.format("hh")) >= time.hour &&
      Number(now.format("mm")) >= time.minute &&
      now.format("A") === time.meridiem
    ) {
      wakeUp();
    } else {
      console.log(now.format("LTS"));
      setTimeout(function() {
        checkTime(time);
      }, 1000);
    }
  }
}

function wakeUp() {
  console.log("fuzzy noise should exit");
  fuzzyNoise.kill();
  sleep = false;
  console.log("wake up!");
  alarmClock = spawn("mplayer", ["-slave", alarm]);
  alarmClock.stdout.on("data", function(data) {
    console.log("alarmClock stdout: " + data);
  });
  alarmClock.stderr.on("data", function(data) {
    console.log("alarmClock stderr: " + data);
  });
  alarmClock.on("exit", function() {
    console.log("EXIT.");
  });
}

setWakeUpTime();
