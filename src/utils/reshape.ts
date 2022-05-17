

export const formatDate = async (target: Array<object>): Promise<number[]> => {
const formattedDate: Array<number> = Object.keys(target).map((date) => {
    return Date.parse(date);
  });
  return formattedDate
}
  export const reshapeObject = async (target: Array<object>): Promise<object[]> => {
   const objValues: Array<object> = Object.values(target).map((values) => {
    return Object.values(values);
  });
  return objValues
}

export function getVolumeArrayFromOhlcv (objectVals) {
    let volumeArray = objectVals.map((thing) => {
        return thing.pop();
      });
      return volumeArray
}



