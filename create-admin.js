const bcrypt = require("bcryptjs");

const password = process.env.ADMIN_PASSWORD;

if (!password) {
  throw new Error("Set ADMIN_PASSWORD before generating the admin password hash.");
}

const hash = bcrypt.hashSync(password, 12);

console.log("Password hash:");
console.log(hash);