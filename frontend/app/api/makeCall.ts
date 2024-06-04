import Session from "supertokens-web-js/recipe/session";


interface ApiCallOptions {
    method?: string;
    headers?: HeadersInit;
    body?: any;
}

async function makeApiCall(endpoint: string, options: ApiCallOptions) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    try {
        const response = await fetch(`${backendUrl}/${endpoint}`, {
            method: options.method || 'GET',
            headers: options.headers || { 'Content-Type': 'application/json' },
            body: options.method && options.method !== 'GET' ? JSON.stringify(options.body) : undefined,
            credentials: 'include'
        });

        if (!response.ok) {
            console.log(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error making API call:', error);
        throw error;
    }
}


export default makeApiCall;
