import { readFileSync } from 'fs';

function getPassword() {
  return readFileSync('.password', 'utf8').trim();
}

export const MONGO_URI = `mongodb+srv://lovebirdsx:${getPassword()}@cluster0.egbcdxd.mongodb.net/`;
