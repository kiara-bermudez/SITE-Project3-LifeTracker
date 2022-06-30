import { API_BASE_URL } from "../constants";

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
    }
}

export default ApiClient;