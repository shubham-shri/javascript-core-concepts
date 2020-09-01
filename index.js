// --------------------------------Polyfill for bind------------------------------------------------

// Normal working of the bind function

var myName = {
  name: 'Shubham',
  surname: 'Shrivastava',
}

function printName(hometown, city) {
  console.log(this.name, this.surname, hometown, city)
}

var printMyName = printName.bind(myName, 'Bihar')
printMyName('Patna')

// Our implementation of the bind method
// As all function have access to the bind method, our implementation of the bind method should also do the same
// For that we will have to add it in the function prototype

Function.prototype.myBind = function (...args) {
  let obj = this // this will store the function ref that is calling the bind method, on our case printMyNameWithBind
  let ref = args[0] // this will store the reference to the obj by which the myBind method is called. i.e. myName
  let params = args.slice(1) // this will store the rest of the params by which are passed inside the myBind method.i.e. 'Bihar'
  return function (...args2) {
    // args2 will be the arguments passed to the returned function i.e. 'Patna'
    obj.apply(ref, [...params, ...args2])
  }
}
var printMyNameWithMyBind = printName.myBind(myName, 'Bihar')
printMyNameWithMyBind('Patna')

// --------------------------------Currying in Javascript------------------------------------------------
// concept to borrow the method and preset the arguments

// method 1 - using bind method
let multiply = function (x, y) {
  // console.log(x * y)
}
let multiplyByTwo = multiply.bind(this, 2)
multiplyByTwo(3) // returns 6

// method 2 - using closure
let multiplyClosure = function (x) {
  return function (y) {
    console.log(x * y)
  }
}
let multiplyByTwoClosure = multiplyClosure(2)
multiplyByTwoClosure(3)

// ----------------------------------------- Debouncing -----------------------------------------
let counter = 0
function apiHit(...args) {
  console.log('apiHit', counter++, ...args)
}

function debounce(fn, delay) {
  let ref = this
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(ref, ...args)
    }, delay)
  }
}
const debounceApiHit = debounce(apiHit, 2000)
