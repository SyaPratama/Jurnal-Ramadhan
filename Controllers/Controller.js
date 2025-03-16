import { Authentication } from "../Services/Authentication.js";
import { Jurnal } from "../Services/Jurnal.js";
class Controller {
  constructor() {
    this.JurnalService = new Jurnal();
    this.AuthService = new Authentication();
  }

  async login(req, h) {
    return h.view("main/authentication/login", {
      title: "Welcome To Jurnal Ramadhan",
    });
  }

  async dashboard(req, h) {
    const JurnalData = await this.JurnalService.getAll();
    return h.view("main/dashboard/main", {
      title: "Dashboard",
      username: "Rasya Putra Pratama",
      data: JurnalData.data,
      currentRoute: req.url.pathname,
    });
  }

  async ramadhan(req, h) {
    const JadwalSholat = await this.JurnalService.getJadwalSholat();
    return h.view("main/ramadhan/page", {
      title: "Ramadhan Jurnal",
      username: "Rasya Putra Pratama",
      data: JadwalSholat.data,
      currentRoute: req.url.pathname,
    });
  }

  async quran(req, h) {
    const ListQuran = await this.JurnalService.getListQuran();
    console.dir(ListQuran,{ depth: null });
    return h.view("main/ramadhan/quran", {
      title: "Al Qur`An",
      username: "Rasya Putra Pratama",
      data: ListQuran,
      currentRoute: req.url.pathname,
    });
  }

  async quran_detail(req,h)
  {
    const { idSurat } = req.params;
    const ListQuran = await this.JurnalService.getListQuranSpecific(idSurat);
    return h.view("main/quran/single", {
      title: `Al Qur'an Surat - ${ListQuran.nama_latin}`,
      data: ListQuran,
    });
  }

  async register(req, h) {
    return h.view("main/authentication/register", {
      title: "Registration User",
    });
  }

  async regist_handler(req, h) {
    const data = req.payload;
    if (data.password != data.password_confirmation) {
      return h
        .response({
          status: "Failed",
          message: "Password Anda Tidak Sama!",
          code: 400,
        })
        .code(400)
        .header("Content-Type", "application/json")
        .header("Accept", "application/json");
    } else {
      const result = await this.AuthService.registration(data);
      return h
        .response(result)
        .code(result.code)
        .header("Content-Type", "application/json")
        .header("Accept", "application/json");
    }
  }

  async login_handler(req, h) {
    const data = req.payload;
    const {
      status,
      message,
      account = null,
      token = null,
      expired_at = null,
      code,
      redirect = null,
    } = await this.AuthService.login(data);
    if (code === 200) {
      req.cookieAuth.set({
        id: account[0].id,
        token: token,
        user: account,
      });
      req.cookieAuth.ttl(expired_at);
      return h
        .response({
          status,
          message,
          redirect,
          code,
        })
        .code(code)
        .header("Content-Type", "application/json")
        .header("Accept", "application/json");
    } else {
      return h
        .response({ status, message, code })
        .code(code)
        .header("Content-Type", "application/json")
        .header("Accept", "application/json");
    }
  }

  async signout(req, h) {
    req.cookieAuth.clear();
    return h
      .response({
        status: 200,
        message: "Berhasil Logout",
        redirect: "/login",
        code: 200,
      })
      .code(200)
      .header("Content-Type", "application/json")
      .header("Accept", "application/json");
  }

  async addJurnal(req, h) {
    const result = await this.JurnalService.add();
    return h
      .response(result)
      .code(result.code)
      .header("Content-Type", "application/json")
      .header("Accept", "application/json");
  }

  async getJurnalID(req, h) {
    const { id } = req.params;
    const result = await this.JurnalService.getById(id);
    return h.view("main/jurnal/single", {
      title: "Single Jurnal Page",
      data: result.data,
    });
  }

  async deleteJurnalByID(req, h) {
    const { id } = req.params;
    const result = await this.JurnalService.delete(id);
    return h
      .response(result)
      .code(result.code)
      .header("Content-Type", "application/json")
      .header("Accept", "application/json");
  }

  async updateJurnalByID(req, h) {
    const { id } = req.params;
    const { title, content } = req.payload;
    const response = await this.JurnalService.update(title, content, id);
    return h
      .response(response)
      .code(response?.code)
      .header("Content-Type", "application/json")
      .header("Accept", "application/json");
  }
}

export default Controller;
