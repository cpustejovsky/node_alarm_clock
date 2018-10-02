# Node Alarm Clock

Here is the scope of the project: 

## Step One: User Input
Ask them what time they want to wake up.
    Verify that they entered a time that the computer understands. Make sure the program can convert things like 5:00am into something useful.
## Step Two: Present Options
Tell them what times they would need to sleep in order to have:
    9 hours of sleep
    7.5 hours of sleep
    6 hours of sleep
    4.5 hours of sleep (include a warning not to do this)
## Step Three:
 Determine the amount of time between NOW/PRESENT and the time indicated by user input
    inputTime - presentTime = programingRunTime
## Step Four:
Begin playing soft brown noise or some other kind of fuzzy noise for programmingRunTime - 15 minutes
    Wait for 15 minutes once brown noise finished playing (after programmingRunTime - 15 minutes)
    After programmingRunTime, play a random selection of music from an array.
## Step Five:
Keep playing the songs until the user submits the input:
        "I am awake and out of bed and intend to have a good day by the Grace of God"
## What's needed:

To git gud with asynchronous programming because of all the waiting this will have to do.
Basically, how do I make JavaScript function wait?

I'll need to write up a function that runs before it even asks for user-input
    Check for .mp3s in /mp3s and push them into var randomlySelectedArray[]

