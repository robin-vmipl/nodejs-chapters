const logical = () => {
  let num = 10;
  if ((num = 5)) {
    console.log(num);
  } else {
    console.log("Number is not 5");
  }
};

module.exports = logical;
