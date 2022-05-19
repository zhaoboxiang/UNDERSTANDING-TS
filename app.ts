const person: {
  name: string;
  age: number;
  hobbies: string[];
  roles: [number, string];
} = {
  name: "zhaoboxiang",
  age: 30,
  hobbies: ["Coding", "Sports"],
  roles: [2, "author"],
};

enum Role {
  ADMIN = 0,
  READ_ONLY = 100,
  AUTHOR = "author",
}

const person2 = {
  roleType: Role.ADMIN,
};

if (person2.roleType === Role.ADMIN) {
  console.log("role is admin...");
}

// person.roles = [3, "admin", "any"];

console.log(person.roles);

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby);
}
