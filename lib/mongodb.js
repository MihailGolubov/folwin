import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // citește variabila din .env.local
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI nu este definită în .env.local");
}

if (process.env.NODE_ENV === "development") {
  // În dezvoltare, folosim o conexiune globală pentru a evita reconectarea
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // În producție, creăm o conexiune nouă
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;