import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("Folwin");
    const collection = db.collection("FolwinBase");

    if (req.method === "GET") {
      const items = await collection.find({}).toArray();
      return res.status(200).json(items);
    }

    if (req.method === "POST") {
      const item = req.body;
      const result = await collection.insertOne({
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return res.status(201).json(result);
    }

    if (req.method === "PUT") {
      const { id, ...updateData } = req.body;
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updateData, updatedAt: new Date() } }
      );
      return res.status(200).json(result);
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json(result);
    }

    return res.status(405).json({ message: "Metodă neacceptată" });

  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({ message: "Eroare server", error: error.message });
  }
}
