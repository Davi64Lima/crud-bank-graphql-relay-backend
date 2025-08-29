import mongoose from "mongoose";
import { config } from "./config";

const connectDb = async () => {
  mongoose.connection.on("close", () =>
    console.log("Database connection closed.")
  );

  mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log("Conectado ao MongoDb!"))
    .catch((err) => console.error("Erro ao conectar com mongo", err));
};

export { connectDb };
