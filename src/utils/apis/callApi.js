import axios from 'axios';

// const apiUrl = 'http://localhost:8080/';
const apiUrl = 'https://kind-petite-coriander.glitch.me/';

const headers = {'Content-Type' : 'application/json', 'Access-Control-Allow-Origin' : '*'}

const postApiData = async (endpoint, data) =>
{
    const url = `${apiUrl}${endpoint}`;
    try
    {
        const response = await axios.post(url, data, { headers });
        return response.data;
    }
    catch (error)
    {
        throw new Error(error.response.data.error || 'Erro ao fazer a requisição');
    }
};

const getApiData = async (endpoint, email) =>
{
    const url = `${apiUrl}${endpoint}`;
    try
    {
        const response = await axios.get(url, { params: { email }, headers });
        return response.data;
    }
    catch (error)
    {
        throw new Error(error.response.data.error || 'Erro ao fazer a requisição');
    }
};

const getNumbersApiData = async (endpoint) =>
{
    const url = `${apiUrl}${endpoint}`;
    try
    {
        const response = await axios.get(url, { headers });
        return response.data;
    }
    catch (error)
    {
        throw new Error(error.response.data.error || 'Erro ao fazer a requisição');
    }
};

const deleteApiData = async (endpoint, email, waitTimeInMilliseconds = 0) =>
{
    const url = `${apiUrl}${endpoint}`;
    try
    {
        // Esperar o tempo especificado antes de realizar a exclusão
        await new Promise((resolve) => setTimeout(resolve, waitTimeInMilliseconds));

        const response = await axios.delete(url, { params: {email}, headers });
        return response.data;
    }
    catch (error)
    {
        throw new Error(error.response.data.error || 'Erro ao fazer a requisição');
    }
};

export { postApiData, getApiData, getNumbersApiData, deleteApiData };
