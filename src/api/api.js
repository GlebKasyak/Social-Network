import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "d05d220d-a91c-4b83-80e9-0b211000d0bb"
    }
});

export const usersAPI = {
    getUsers( currentPage, pageSize ) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    unFollow( userId ) { return instance.delete(`follow/${ userId }`) },
    follow( userId ) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${ userId }`)
    }
};

export const authAPI = {
    me() { return instance.get("auth/me") },
    login( email, password, rememberMe = false, captcha = null ) {
        return instance.post("auth/login", { email, password, rememberMe, captcha })
    },
    logout() { return instance.delete("auth/login") },
};

export const profileAPI = {
    getProfile( userId ) {
        return instance.get(`profile/${userId}`)
    },
    getStatus( userId ) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus( status ) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto( photoFile ) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    saveProfile( profile ) { return instance.put("profile", profile) }
};

export const securityAPI = {
    getCaptchaUrl() { return instance.get("security/get-captcha-url") }
};


