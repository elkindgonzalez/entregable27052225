// src/mocks/petsMock.js
import { faker } from '@faker-js/faker';

export function generatePet() {
  return {
    name: faker.animal.dog(),
    species: faker.animal.type(),
    age: faker.number.int({ min: 1, max: 15 }),
    adopted: faker.datatype.boolean(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
}
