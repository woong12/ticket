import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    // MongoDB에 연결

    try {
      // bookList 데이터를 MongoDB에 저장
      const db = (await connectDB).db("Ticket");
      const collection = await db.collection("seat");

      const filter = { _id: new ObjectId("648de37c52547832ccd82bf2") };
      const update = { $push: { booked: body } };
      const options = { returnOriginal: false };
      const check = await collection.find(filter, { _id: 0 });
      console.log(check.value);
      if (!check.value.booked.includes(body)) {
        const result = await collection.findOneAndUpdate(
          filter,
          update,
          options
        );

        console.log("Modified document:", result.value);

        res.status(200).json({ message: "Book list saved to MongoDB!" });
      } else {
        res.status(404).json({ message: "동시 접속 오류" });
      }
    } catch (error) {
      console.error("Error saving book list to MongoDB:", error);
      res.status(500).json({ message: "Failed to save book list to MongoDB." });
    }
  } else {
    res.status(400).json({ message: "Invalid request method." });
  }
}
