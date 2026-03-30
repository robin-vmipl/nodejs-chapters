const runtime = () => {
  console.log("Testing runtime error in this function");
  console.log(x); // ReferenceError: x is not defined
};

module.exports = runtime;
