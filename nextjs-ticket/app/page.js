import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import PageIn from "../components/PageIn";

export const dynamic = "force-dynamic";

export default async function Home() {
  const db = (await connectDB).db("Ticket");
  let book = await db
    .collection("seat")
    .find({ _id: new ObjectId("648de37c52547832ccd82bf2") })
    .toArray();
  // console.log(book[0].booked);

  let name = await db
    .collection("seat")
    .find({ _id: new ObjectId("648eed856b2ce9346c558f9d") })
    .toArray();
  // console.log(name[0].data);

  return (
    <div>
      <PageIn book={book[0].booked} name={name[0].data}></PageIn>
    </div>
  );
}
