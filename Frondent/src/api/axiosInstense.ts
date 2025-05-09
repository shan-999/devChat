import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import { store } from "@/Store/store";
import { persistor } from "@/Store/store";
import { setLogoutState } from "@/Store/slice/auth";




const BASE_URL = 'http://localhost:3000'


const api:AxiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:10000,
    headers:{
        "Content-Type": 'application/json'
    },
    withCredentials:true
})


const refreshAccessTocken = async () => {
    try {
        const respones = await axios.post(`${BASE_URL}/refresh-tocken`,null,{
            withCredentials:true
        })
        
        const {accessTocken} = respones.data
        console.log(accessTocken);        
        document.cookie = `access_tocken=${accessTocken}; SameSite=Strict; Path=/;`;
        return accessTocken;
    } catch (error) {
        console.log("Error from refreshing access token : ", error);
       
		throw error;
    }
}



api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRespones = error.config;
        
        if(error.response.status === 401 && !originalRespones._retry){
            originalRespones._retry = true

            try {
                const newAccessTocken = await refreshAccessTocken()
                
                return api(originalRespones)

            } catch (error:any) {
                console.log('error from create axious intersepture',error);
                console.log(error.response.data.tockenExpired);
                
                if(error.response.data.tockenExpired){
                    store.dispatch(setLogoutState())
                    persistor.purge();
                }
            }
        }
        return Promise.reject(error)
    }
)

export default api