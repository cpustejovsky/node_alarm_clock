function testCheckTimeAM() {
    let sleep = true;
    const testTime ={
        hour: 12,
        minute: 5,
        meridiem: "AM"
    }
    
    const testAlarm ={
        hour: 5,
        minute: 30,
        meridiem: "AM"
    }
    if (sleep) {
      let now = moment();
      if (
        Number(testTime.hour) >= testAlarm.hour &&
        Number(testTime.minute) >= testAlarm.minute &&
        testTime.meridiem === testAlarm.meridiem
      ) {
        if (
          Number(testTime.hour) !== 12 &&
          testTime.meridiem === "AM"
        ) {
          console.log("test failed")
        }
      } else {
        console.log("test is passing");
        setTimeout(function() {
          testCheckTime();
        }, 1000);
      }
    }
  }

  testCheckTimeAM();