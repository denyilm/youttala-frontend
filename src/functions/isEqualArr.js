/* eslint-disable eqeqeq */
function isEqualArr(arr1, arr2){
  let isEqual = true
  if(arr1.length != arr2.length){
    isEqual = false
  } else {
    for(let i = 0; i < arr1.length ; i++){
      if(arr1[i] != arr2[i]){
        isEqual = false
        break
      }
    }
  }
  return isEqual
}

export default isEqualArr