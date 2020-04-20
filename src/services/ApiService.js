import axios from "axios";
import {apiURL} from "../main/Constants";

const httpClient = axios.create({
    baseURL: apiURL
});

class ApiService {

    apiUrl = '';

    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    post (url, data) {
        return httpClient.post(url, data);
    }

    put (url, data) {
        return httpClient.put(url, data);
    }

    delete(url) {
        return httpClient.delete(url);
    }

    get(url) {
        return httpClient.get(url);
    }

}

export default ApiService;