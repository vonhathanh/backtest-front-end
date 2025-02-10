import axios from "axios";
import config from "./config";

export async function fetchStrategies() {
    const response = await axios.get(`${config.apiUrl}/strategies`, {
        // needed because FastAPI server require "Access-Control-Allow-Origin": "*" to be sent in the request
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
    return response.data.strategies
}


export async function fetchFilenames() {
    const response = await axios.get(`${config.apiUrl}/filenames`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    });
    return response.data.filenames
}