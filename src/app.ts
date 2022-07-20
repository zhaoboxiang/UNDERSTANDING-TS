function Logger(logingString: string) {
  console.log("logger decorators");
  return function (constructor: Function) {
    console.log(logingString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("template decorators");

  return function (constructor: any) {
    console.log("RENDING TEMPLATE....");
    const hookEl = document.getElementById(hookId)!;
    const p = new constructor();
    hookEl.innerHTML = template;
    hookEl.querySelector("h1")!.innerText = p.name;
  };
}
@Logger("LOGGING - PERSON")
@WithTemplate("<h1>Creating person object...</h1>", "app")
class Person {
  name = "Fengxiu";
  constructor() {
    console.log("Creating person object ....");
  }
}

const person = new Person();

console.log(person);

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator.");
  console.log(target, propertyName);
}

function Log2(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Assessor Decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method Decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parametor Decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invail Price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "this works.";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const btn = document.querySelector("button")!;
btn.addEventListener("click", p.showMessage);

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}

const registeredValidator: ValidatorConfig = {};

function Required(target: Object, propName: string) {
  registeredValidator[target.constructor.name] = {
    ...registeredValidator[target.constructor.name],
    [propName]: ["Required"],
  };
}

function PositiveNumber(target: Object, propName: string) {
  registeredValidator[target.constructor.name] = {
    ...registeredValidator[target.constructor.name],
    [propName]: ["Positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidator[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "Required":
          isValid = isValid && !!obj[prop];
          break;
        case "Positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }

  return isValid;
}

class Course {
  @Required
  title: string;
  @Required
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert("Invail input, please try again!");
    return;
  }
  console.log(createdCourse);
});
