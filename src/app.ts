class Department {
  // id: string;
  // name: string;
  private employees: string[] = [];

  constructor(private readonly id: string, private name: string) {
    this.name = name;
    this.id = id;
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployees(this: Department, employee: string) {
    this.employees.push(employee);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, public admin: string[]) {
    super(id, "IT");
    this.admins = admin;
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, "IT");
  }

  addReports(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports);
  }
}

const it = new ITDepartment("28", ["Accounting"]);
console.log(it);

it.addEmployees("Muus");

it.addEmployees("dddd");

it.describe();

const accounting = new AccountingDepartment("d2", []);
accounting.addReports("Something was went wrong....");
accounting.printReports();

// const accountingCopy = { name: "Dumm", describe: accounting.describe };

// accountingCopy.describe();
