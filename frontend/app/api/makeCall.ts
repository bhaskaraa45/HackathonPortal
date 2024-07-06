import axios from "axios";

interface ApiCallOptions {
    method?: string;
    headers?: { [key: string]: string };
    body?: any;
}

interface CustomApiError extends Error {
    status?: number;
    data?: any;
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
            const apiError: CustomApiError = new Error('API Error');
            apiError.status = error.response?.status;
            apiError.data = error.response?.data;
            throw apiError;
        } else {
            console.error('Error making API call:', error);
            throw error;
        }
    }
}

export default makeApiCall;
