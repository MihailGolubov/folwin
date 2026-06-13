import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("fruitsDB"); // numele bazei tale
    const collection = db.collection("fruits");

    if (req.method === "GET") {
      // Citire (Read)
      const fruits = await collection.find({}).toArray();
      res.status(200).json(fruits);

    } else if (req.method === "POST") {
      // Adăugare (Create)
      const fruit = req.body;
      const result = await collection.insertOne({
        ...fruit,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json(result);

    } else if (req.method === "PUT") {
      // Actualizare (Update)
      const { id, ...updateData } = req.body;
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updateData, updatedAt: new Date() } }
      );
      res.status(200).json(result);

    } else if (req.method === "DELETE") {
      // Ștergere (Delete)
      const { id } = req.body;
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json(result);

    } else {
      res.status(405).json({ message: "Metodă neacceptată" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Eroare server" });
  }
}
