export class Handler{
    constructor(Service)
    {
        this.Service = Service;
        this.login = this.login.bind(this);
        this.dashboard = this.dashboard.bind(this);
        this.ramadhan = this.ramadhan.bind(this);
        this.quran = this.quran.bind(this);
        this.quran_detail = this.quran_detail.bind(this);
        this.register = this.register.bind(this);
        this.regist_handler = this.regist_handler.bind(this);
        this.login_handler = this.login_handler.bind(this);
        this.signout = this.signout.bind(this);
        this.addJurnal = this.addJurnal.bind(this);
        this.getJurnalID = this.getJurnalID.bind(this);
        this.deleteJurnalByID = this.deleteJurnalByID.bind(this);
        this.updateJurnalByID = this.updateJurnalByID.bind(this);
    }

    async login(req,h)
    {
        return await this.Service.login(req,h)
    }

    async dashboard(req,h)
    {
        return await this.Service.dashboard(req,h);
    }

    async ramadhan(req,h)
    {
        return await this.Service.ramadhan(req,h);
    }

    async quran(req,h)
    {
        return await this.Service.quran(req,h);
    }

    async quran_detail(req,h)
    {
        return await this.Service.quran_detail(req,h);
    }

    async register(req,h)
    {
        return await this.Service.register(req,h);
    }

    async regist_handler(req,h)
    {
        return await this.Service.regist_handler(req,h);
    }

    async login_handler(req,h)
    {
        return await this.Service.login_handler(req,h);
    }

    async signout(req,h)
    {
        return await this.Service.signout(req,h);
    }

    async addJurnal(req,h)
    {
        return await this.Service.addJurnal(req,h);
    }

    async getJurnalID(req,h)
    {
        return await this.Service.getJurnalID(req,h);
    }

    async deleteJurnalByID(req,h)
    {
        return await this.Service.deleteJurnalByID(req,h);
    }

    async updateJurnalByID(req,h)
    {
        return await this.Service.updateJurnalByID(req,h);
    }
}