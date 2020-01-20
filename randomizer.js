const log = x => console.log(x);

const originalArr = ["A", "B", "C", "D"];
log(originalArr);

const getUniqueRandInts = arr => {
  let retunArr = [];
  while (retunArr.length < arr.length) {
    let r = Math.floor(Math.random() *  Math.floor(arr.length));
    if (retunArr.indexOf(r) === -1) retunArr.push(r);
  }
  return retunArr;
};

const uniqueRandIntArr = getUniqueRandInts(originalArr)
log(uniqueRandIntArr)
const newArr = originalArr.map((item)=>
{
  return {
        position: uniqueRandIntArr[originalArr.indexOf(item)],
        data: item
    }
}
);

log(newArr);
