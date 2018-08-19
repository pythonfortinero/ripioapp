export const objectToArray = function(obj){
  return Object.keys(obj).map(function(key) {
    return Object.assign({id: key}, obj[key]);
  });
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
