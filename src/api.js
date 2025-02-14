import axios from "axios";
import config from "./config";

export async function fetch(url) {
    // header is needed because FastAPI server require "Access-Control-Allow-Origin": "*" to be sent in the request
    const response = await axios.get(`${config.apiUrl}/${url}`, {
        headers: { "Access-Control-Allow-Origin": "*" },
    });
    return response.data;
}

export async function fetchStrategies() {
    return await fetch("strategies")
}

export async function fetchFilesMetadata() {
    return await fetch("files/metadata")
}
