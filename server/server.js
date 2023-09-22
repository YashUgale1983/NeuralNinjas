import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

/* CONFIGURATIONS */
dotenv.config();

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful !!!");
  });

/* SERVER SETUP */
const server = app.listen(PORT, () => {
  console.log("Server set up at port : " + PORT);
});

/* ON ERROR OUTSIDE THE SCOPE OF EXPRESS. HENCE AT LAST */
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION....... SHUTTING DOWN!!!");

  server.close(() => {
    process.exit(1);
  });
});
