import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const password = bcrypt.hashSync('coder123', 10);

export function generateUser() {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password,
    role: faker.helpers.arrayElement(['user', 'admin']),
    pets: []
  };
}
