import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app: express.Express = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Connected succesfully, listen to ${PORT}`);
});
