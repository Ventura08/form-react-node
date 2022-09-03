import { Contato } from "interfaces/interface";
import { MainModel } from "../model/mainModel";

export class MainController {
  DB: MainModel = new MainModel();
  async getContacts() {
    return await this.DB.getData();
  }

  async createContact(data: Contato) {
    return this.DB.createData(data);
  }
}
