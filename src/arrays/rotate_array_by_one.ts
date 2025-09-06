// Given an array of numbers, rotate the array to the left by one place
// Input : [1,2,3,4,5] => [2,3,4,5,1]

export function rotate_by_one(arr:number[]){
  const temp = arr[0]!

  for(let i = 0 ; i < arr.length ; i++){
    arr[i] = arr[i+1]!
  }

  arr[arr.length - 1] = temp
}

const arr = [1,2,3,4,5]
rotate_by_one(arr)
console.log(arr);

