import axios from "axios";
import config from "./config";

export async function fetch(url) {
    // header is needed because FastAPI server require "Access-Control-Allow-Origin": "*" to be sent in the request
    const response = await axios.get(url, {
        headers: { "Access-Control-Allow-Origin": "*" },
    });
    return response.data;
}

export async function fetchStrategies() {
    return await fetch(`${config.apiUrl}/strategies`)
}

export async function fetchFilesMetadata() {
    return await fetch(`${config.apiUrl}/files/metadata`)
}

export async function backtest(data) {
    const response = await axios.post(`${config.apiUrl}/backtest`, data, { 
        headers: { "Access-Control-Allow-Origin": "*" },
    })
    return response.data
}
