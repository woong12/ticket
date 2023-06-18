import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const newData = { name: data.name, books: data.book };
    // MongoDB에 연결
    try {
      // bookList 데이터를 MongoDB에 저장
      const db = (await connectDB).db("Ticket");
      const collection = await db.collection("seat");

      const filter = { _id: new ObjectId("648eed856b2ce9346c558f9d") };
      const update = { $push: { data: newData } };
      const options = { returnOriginal: false };
      console.log(newData);

      const result = await collection.findOneAndUpdate(filter, update, options);

      console.log("Modified document:", result.value);
      res.status(200).json({ message: "name list saved to MongoDB!" });
    } catch (error) {
      console.error("Error saving name list to MongoDB:", error);
      res.status(500).json({ message: "Failed to save name list to MongoDB." });
    }
  } else {
    res.status(400).json({ message: "Invalid request method." });
  }
}
