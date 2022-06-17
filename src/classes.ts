abstract class Department {
  // id: string;
  // name: string;
  protected employees: string[] = [];

  constructor(protected readonly id: string, protected name: string) {
    this.name = name;
    this.id = id;
  }

  static createEmployee(name: string) {
    return { name };
  }

  abstract describe(this: Department): void;

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

  describe(): void {
    console.log(`Department (${this.id}): ${this.name}`);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  private constructor(id: string, private reports: string[]) {
    super(id, "IT");
    this.lastReport = reports[0];
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReports(value);
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }

    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  describe(): void {
    console.log(`Department acc: (${this.id}): ${this.name}`);
  }

  addEmployees(this: AccountingDepartment, employee: string): void {
    if (employee === "Max") {
      return;
    }

    this.employees.push(employee);
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

const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();
console.log(accounting === accounting2);

accounting.addReports("Something was went wrong....");
accounting.printReports();

accounting.mostRecentReport = "Lucy";
console.log(accounting.mostRecentReport);

accounting.addEmployees("Max");
accounting.addEmployees("Muaa");

Department.createEmployee("Fengxiu");

// const accountingCopy = { name: "Dumm", describe: accounting.describe };

// accountingCopy.describe();
