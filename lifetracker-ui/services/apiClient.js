import { API_BASE_URL } from "../constants";
import axios from "axios";

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
        this.tokenName = "lifetracker_token";
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem(this.tokenName, token);
    }

    async request({ endpoint, method=`GET`, data={}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`;
        console.log(url)
        const headers = {
            "Content-Type": "application/json",
            "Authorization": this.token ? `Bearer ${this.token}` : "",
        }
        console.log("token", this.token)
        try {
            const res = await axios({url, method, data, headers});
            console.log("reiskfjgeridkl", res.data, "for", url)
            return {data: res.data, error: null};
        }catch(error) {
            console.error({ errorResponse: error.response})
            const message = error?.response?.data?.error?.message;
            return {data: null, error: message || String(error)};
        }
    }

    async fetchUserFromToken() {
        return await this.request({ endpoint: "auth/me", method: `GET`});
    }

    async login(credentials) {
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials});
    }

    async signup(credentials) {
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials});
    }

    async logout() {
        this.setToken(null);
        localStorage.setItem(this.tokenName, "");
    }

    async fetchActivityStats() {
        return await this.request({ endpoint: "activity", method:`GET`});
    }

    async fetchUserNutritions() {
        return await this.request({ endpoint: "nutrition", method:`GET`})
    }

    async createNutrition(nutrition) {
        return await this.request({ endpoint: "nutrition", method:`POST`, data: nutrition} )
    }

    async fetchNutritionById(nutritionId) {
        return await this.request({ endpoint: `nutrition/${nutritionId}`, method:`GET`})
    }
}

export default new ApiClient(API_BASE_URL);