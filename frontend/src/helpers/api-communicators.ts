import axios from "axios"

export const loginUser = async(email:string, password:string)=>{
    const res=await axios.post("/user/login",{email,password});
    if(res.status!==200){
        throw new Error("Unable to login");
        
    }
    const data=await res.data;
    return data;
}

export const checkAuthStatus = async()=>{
    const res=await axios.get("/user/auth-status");
    if(res.status!==200){
        throw new Error("Unable to authenticate");
        
    }
    const data=await res.data;
    return data;
}

export const signupUser = async (name: string, email: string, password: string) => {
    try {
        const res = await axios.post("/user/signup", { name, email, password });
        if (res.status !== 200) {
            throw new Error("Unable to signup");
        }
        return res.data;
    } catch (error: any) {
        console.error("Signup error:", error.response?.data || error.message);
        throw error;
    }
};


export const logoutUser = async () => {
    const res = await axios.post("/user/logout");
    if (res.status !== 200) {
        throw new Error("Unable to logout");
    }
};

export const sendChatRequest = async (content: string) => {
    try {
        const response = await axios.post('http://localhost:8100/api/chat', { message: content }, { withCredentials: true });
        console.log("Response data:", response.data);  // Log response data to check its structure
        return response.data;
    } catch (error) {
        console.error("Error in sendChatRequest:", error);
        throw error;
    }
};
