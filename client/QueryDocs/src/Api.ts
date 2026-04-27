import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000",
});

export const uploadDocument = (file: File) => {

    const formData = new FormData();
    formData.append("file", file);

    return API.post("/uplaod", formData);
};

export const sendMessage = (query: string) => {

    return API.post("/chat", query);

};