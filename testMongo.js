import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Conexiune reușită!");
  } catch (err) {
    console.error("❌ Eroare:", err);
  } finally {
    await client.close();
  }
}

run();
