import { myAxios } from "./helper";

export const signUp = (user) => {
    return myAxios.post('/api/v1/auth/register', user).then((res) => res.data)
}
export const signIn = (loginData) => {
    return myAxios.post('/api/v1/auth/login', loginData).then((res) => res.data)
}

export const fetchArticls=()=>{
    return myAxios.get('https://dummyjson.com/posts').then((res)=>res.data);
}