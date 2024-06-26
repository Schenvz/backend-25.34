import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "events";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    poster: {
      type: String,
      default: "https://i.postimg.cc/HxdvTwqJ/events.jpg",
      //utilizo la misma imagen porque no encontré otra similar ja
    },
    place: {
      type: String,
      default: "Village",
      enum: ["Hoyts", "Showcase", "Village", "Stadium"],
      index: true,
    },
    price: { type: Number, default: 12 },
    capacity: { type: Number, default: 100 },
    date: { type: Date, default: new Date(), index: true },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Event = model(collection, schema);
export default Event;
