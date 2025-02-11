import { passwordConfig } from './config';
import { createDatabaseConnection } from './Database';

const database = await createDatabaseConnection(passwordConfig);

export async function getCabinById(id: number) {
  const data = await database.getCabinById(id);
  return data;
}

export async function getAllCabins() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const data =  await database.getAllCabins();
  return data;
}

export async function getCabinPrice(id: number) {
  const data = await database.getCabinPrice(id);
  return data;
}

// export async function createCabin(cabin) {
//   const data = await database.createCabin(cabin);
//   return data;
// }

// export async function updateCabin(cabin) {
//   const data = await database.updateCabin(cabin);
//   return data;
// }

// export async function deleteCabin(id: number) {
//   const data = await database.deleteCabin(id);
//   return data;
// }
