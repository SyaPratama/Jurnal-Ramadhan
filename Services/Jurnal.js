import { Database } from "../App/Core/Database.js";

export class Jurnal {
  constructor() {
    this.connection = new Database();
  }

  async add() {
    await this.connection.insert("jurnals", { title: "", content: "" });
    return {
      status: "Complete",
      message: "Berhasil Menambahkan Jurnal",
      redirect: "/",
      code: 201,
    };
  }

  async getAll() {
    const result = await this.connection.getAll("jurnals");
    return {
      status: "Complete",
      message: "Berhasil Mendapatkan Jurnal",
      code: 200,
      data: result,
    };
  }

  async getJadwalSholat() {
    const zoneDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    const currentYear = zoneDate.getFullYear();
    const currentMonth = zoneDate.getMonth() + 1;
    const resullt = await fetch(`https://api.myquran.com/v2/sholat/jadwal/1403/${currentYear}/${currentMonth}`);
    return resullt.json();
  }

  async getListQuran()
  {
    const result = await fetch("https://equran.id/api/surat");
    return result.json();
  }

  async getListQuranSpecific(surat)
  {
    const result = await fetch(`https://equran.id/api/surat/${surat}`);
    return result.json();
  }

  async getById(id) {
    const result = await this.connection.find("jurnals", id);
    if (result.length > 0) {
      return {
        status: "Complete",
        message: "Berhasil Mendapatkan Jurnal",
        code: 200,
        data: result[0],
      };
    } else {
      return {
        status: "Failed",
        message: "Gagal Mendapatkan Jurnal",
        code: 404,
      };
    }
  }

  async delete(id) {
    const res = await this.connection.deleted("jurnals", id);
    if (res[0].affectedRows == 1) {
      return {
        status: "Success",
        message: "Berhasil Menghapus Jurnal",
        redirect: "/",
        code: 200,
      };
    } else {
      return {
        status: "Failed",
        message: "Jurnal Tidak Ditemukan",
        code: 404,
      };
    }
  }

  async update(title = "", content = "", id) {
    const findJurnals = await this.connection.find("jurnals", id);
    if (findJurnals.length > 0) {
      if (title) {
        await this.connection.raw(
          `UPDATE jurnals SET title="${title}" WHERE id = ${id}`
        );
        return {
          status: "Success",
          message: "Berhasil Update Jurnal",
          code: 200,
        };
      } else if (content) {
        await this.connection.raw(
          `UPDATE jurnals SET content="${content}" WHERE id = ${id}`
        );
        return {
          status: "Success",
          message: "Berhasil Update Jurnal",
          code: 200,
        };
      }
    } else {
      return {
        status: "Failed",
        message: "Gagal Update Jurnal",
        code: 400,
      };
    }
  }
}
