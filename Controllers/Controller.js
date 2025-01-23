class Controller {
    constructor()
    {
        this.login = this.login.bind(this);
        this.dashboard = this.dashboard.bind(this);
    }

    async login(req,h){
        return h.view('main/authentication/login',{ title: "Welcome To " })
    }

    async dashboard(req,h)
    {
        return h.view('main/dashboard/main', { title: "Dashboard Admin", username: "Rasya Putra Pratama" });
    }

    async register(req,h)
    {
        return h.view('main/authentication/register', { title: "Register User" });
    }
}


export default Controller;