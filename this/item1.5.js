var a = 1

function foo() {
  var a = 2

  function inner() {
    console.log(this.a)
  }

  inner()
}

foo()

// 1

// ? inner中，this还是指向的window

