import { MainController } from "./controller/mainController";
import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: express.Express = express();
const PORT = process.env.PORT || 3001;
const Controller: MainController = new MainController();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Connected succesfully, listen to ${PORT}`);
});

app.get("/all", async (req: Request, res: Response) => {
  try {
    res.json(await Controller.getContacts());
  } catch (err) {
    console.log(err);
    return err;
  }
});

app.post("/create", async (req: Request, res: Response) => {
  try {
    const controller = await Controller.createContact(req.body);
    res.json(controller ? "Criado  om sucesso" : "Algo deu errado");
  } catch (err) {
    console.log(err);
    return err;
  }
});
