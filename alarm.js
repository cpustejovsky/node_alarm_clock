"use strict"
/*  STRATEGY
STEP ONE
    Based on the list of mp3s within the mp3 folder, the script will play them in order.

/*
Generates random list between 1 and the length of the provided audio list.
The random list will create the order in which the mp3 files will be played.
*/

let myaudiolist = [1,2,3,4]; //sample data

function genereteRandomList (audiolist){
    let orderlist = [];
    let maxlength = audiolist.length + 1;
    while (orderlist.length < audiolist.length) {
        let randomNumber = Math.floor(Math.random() * (+maxlength - 1)) + 1;
        if (randomNumber !== 0 && randomNumber !== orderlist[3] && randomNumber !== orderlist[2] && randomNumber !== orderlist[1] && randomNumber !== orderlist[0]) {
            orderlist.push(randomNumber);
        }
    }
    return orderlist
}

console.log(genereteRandomList(myaudiolist));
