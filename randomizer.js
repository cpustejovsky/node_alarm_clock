const getUniqueRandInts = arr => {
  let retunArr = [];
  while (retunArr.length < arr.length) {
    let r = Math.floor(Math.random() * Math.floor(arr.length));
    if (retunArr.indexOf(r) === -1) retunArr.push(r);
  }
  return retunArr;
};

const randomizeArr = (arr) => {
  const uniqueItems = getUniqueRandInts(arr);
  const positions = arr.map(item => {
    return {
      position: uniqueItems[arr.indexOf(item)],
      data: item
    };
  });

  let randomizedArr = [];
  for (let i = 0; i < positions.length; i++) {
    randomizedArr.splice(positions[i].position, 0, positions[i].data);
  }
  return randomizedArr;
};

module.exports.randomizeArr = randomizeArr;