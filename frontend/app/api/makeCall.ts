import Session from "supertokens-web-js/recipe/session";


interface ApiCallOptions {
    method?: string;
    headers?: HeadersInit;
    body?: any;
}

async function makeApiCall(url: string, options: ApiCallOptions) {
    try {
        const response = await fetch(url, {
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

// const makeApiCallWithRetry = async (url: string, options: ApiCallOptions) => {
//     try {
//         const response = await makeApiCall(url, options);
//         return response;
//     } catch (error) {
//         if (error instanceof Error && error.message === "try refresh token") {
//             try {
//                 // Attempt to refresh the session
//                 await Session.attemptRefreshingSession();
                
//                 const response = await makeApiCall(url, options);
//                 return response;
//             } catch (refreshError) {
//                 console.error("Session refresh failed:", refreshError);
//                 throw refreshError;
//             }
//         } else {
//             throw error;
//         }
//     }
// };

export default makeApiCall;
