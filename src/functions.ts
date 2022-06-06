function addCb(n1: number, n2: number) {
  return n1 + n2;
}

function printResultFn(result: number): void {
  console.log("Result is: " + result);
}

console.log(printResultFn(addCb(33, 22)));

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(12, 44, (result) => {
  console.log(result);
});
