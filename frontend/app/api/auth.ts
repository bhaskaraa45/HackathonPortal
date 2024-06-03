import axios from "axios";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUserStatus = async () => {
    try {
        const response = await axios.get(`${backendUrl}/exists`);
        if (response.status === 200) {
            return response.data.isAdmin ? 1 : 2;
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
    }
    return 0;
}

export const getSessionUser = async () => {
    try {
        const response = await axios.get(`${backendUrl}/session-info`);
        console.log(response.data)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
    }
    return null;
}
