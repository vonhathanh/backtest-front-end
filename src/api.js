import axios from "axios";
import config from "./config";

// needed because FastAPI server require "Access-Control-Allow-Origin": "*" to be sent in the request
const headers = { "Access-Control-Allow-Origin": "*" };

export async function fetchStrategies() {
    const response = await axios.get(`${config.apiUrl}/strategies`, {
        headers: headers,
    });
    return response.data;
}

export async function fetchFilesMetadata() {
    const response = await axios.get(`${config.apiUrl}/files/metadata`, {
        headers: headers,
    });
    return response.data;
}
