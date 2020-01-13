const testCheckTime = () => {
  let sleep = true;
  const testTime = {
    hour: 12,
    minute: 5,
    meridiem: "AM"
  };

  const testAlarm = {
    hour: 5,
    minute: 30,
    meridiem: "AM"
  };
  if (sleep) {
    if (
      Number(testTime.hour) === testAlarm.hour &&
      Number(testTime.minute) === testAlarm.minute &&
      testTime.meridiem === testAlarm.meridiem
    ) {
      console.log("test failed");
    } else {
      console.log("test is passing");
      setTimeout(function() {
        testCheckTime();
      }, 1000);
    }
  }
}

testCheckTime();