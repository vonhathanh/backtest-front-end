import axios from "axios";
import config from "./config";

export async function fetchStrategies() {
    const response = await axios.get(`${config.apiUrl}/strategies`, {
        // needed because FastAPI server require "Access-Control-Allow-Origin": "*" to be sent in the request
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
    return response.data
}


export async function fetchFilesMetadata() {
    const response = await axios.get(`${config.apiUrl}/files/metadata`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
    return response.data
}