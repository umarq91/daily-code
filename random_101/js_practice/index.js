// custom built in Map in js
function customMap(arr, cb) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(cb(arr[i]));
  }
  return newArr;
}

let doubled = customMap([1, 2, 3, 4], (n) => n * 100);

// console.log(doubled);


// custom filter 
function customFilter(arr,cb){
    let newARr  = [];
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
         if(cb(element)){
            newARr.push(element);
         }
    }
    return newARr;
}

let filtered = customFilter([1, 2, 3, 4], (n) => n > 2);
// console.log(filtered);