

export function formatDate (target: Array<object>) {
const formattedDate: Array<number> = Object.keys(target).map((date) => {
    return Date.parse(date);
  });
  return formattedDate
}
  export function reshapeObject (target: Array<object>) {
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



