import { promises as fs } from "fs";
import { Contato } from "../interfaces/interface";
import path from "path";

export class MainModel {
  controller?: Boolean;
  nextId: Promise<Number> = this.getNextId();
  async getData() {
    try {
      const data = await this.readFile();
      return JSON.parse(data.toString());
    } catch (err) {
      console.log(err);
    }
  }

  async readFile() {
    return await fs.readFile(path.join(__dirname, "../database/contatos.json"));
  }

  async getNextId() {
    return (await this.getData()).nextId;
  }

  async createData(data: Contato) {
    try {
      let nextId = await this.getNextId();
      data.id = nextId;
      this.controller = await this.reWriteFile(data);
      return this.controller;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async reWriteFile(contato: Contato) {
    let newData = await this.getData();
    newData.data.push(contato);
    newData.nextId = Number(newData.nextId) + 1;
    try {
      await fs.writeFile(
        path.join(__dirname, "../database/contatos.json"),
        JSON.stringify(newData, null, 2)
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
