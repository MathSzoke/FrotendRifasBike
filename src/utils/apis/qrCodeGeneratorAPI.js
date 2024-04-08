import axios from 'axios';

// const apiUrl = 'http://localhost:8080/';
const apiUrl = 'https://kind-petite-coriander.glitch.me/';

const postApiQrCodeData = async (endpoint, data) =>
{
    const url = `${apiUrl}${endpoint}`;
    try
    {
        const response = await axios.post(url, data);

        return response.data;
    }
    catch (error)
    {
        console.error(error);
    }
};

const getApiQrCodeData = async (endpoint) =>
{
    const url = `${apiUrl}${endpoint}`;
    try
    {
        const response = await axios.get(url);
        return response.data;
    }
    catch (error)
    {
        throw new Error(error.response.data.error || 'Erro ao fazer a requisição');
    }
};

const postAnyURL = async (urlApi, header) =>
{
    const url = `${urlApi}`;
    try
    {
        const response = await axios.post(url, {
            headers: header
        });

        return response.data;
    }
    catch (error)
    {
        console.error(error);
    }
};


export { postApiQrCodeData, getApiQrCodeData, postAnyURL };