function merge<T extends object, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "fengxiu" }, { age: 32 });
console.log(mergedObj);
console.log(mergedObj.name);

interface Lengthly {
  length: number;
}

function countAndDescripe<T extends Lengthly>(element: T): [T, string] {
  let descriptionText = "Got no value.";

  if (element.length === 1) {
    descriptionText = "Got 1 value.";
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} value`;
  }

  return [element, descriptionText];
}

console.log(countAndDescripe("hello genenrics!"));
console.log(countAndDescripe(["coding", "gaming", "sleeping"]));

function extractAndConvert<T extends object, K extends keyof T>(
  obj: T,
  key: K
) {
  return obj[key];
}

console.log(extractAndConvert({ name: "Fengxiu" }, "name"));

type PrimitiveType = string | number | boolean;
class DataStorage<T extends PrimitiveType> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Fengxiu");
textStorage.addItem("Lucy");
textStorage.removeItem("Fengxiu");
console.log(textStorage.getItems());
