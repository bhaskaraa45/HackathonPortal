import axios from "axios";
import Session from "supertokens-web-js/recipe/session";

interface ApiCallOptions {
    method?: string;
    headers?: { [key: string]: string };
    body?: any;
}

async function makeApiCall(endpoint: string, options: ApiCallOptions) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        const response = await axios({
            url: `${backendUrl}/${endpoint}`,
            method: options.method || 'GET',
            headers: options.headers || { 'Content-Type': 'application/json' },
            data: options.body || undefined,
            withCredentials: true,
        });

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error making API call:', error.response?.status, error.response?.data);
            throw { status: error.response?.status, data: error.response?.data };
        } else {
            console.error('Error making API call:', error);
            throw error;
        }
    }
}

export default makeApiCall;
