export function adder(initNum: number = 0) {
    return function (numToAdd: number) {
      return initNum + numToAdd;
    };
  }
  