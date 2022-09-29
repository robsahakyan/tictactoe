export function toFilterBoardArray(data) {
    let singleArrLength = Math.sqrt(data.length);
      let boardFilteredArray = [];
      for (let i = 0; i < singleArrLength; i++) {
        boardFilteredArray[i] = [];
        for (let j = 0; j < singleArrLength; j++) {
          boardFilteredArray[i].push(data[i * singleArrLength + j])
        }
      }
      return boardFilteredArray
}