import { makeAutoObservable } from "mobx"
import { IUser } from "../models/user"
import AuthService from "../service/authService"
import { API_URL } from "../http"
import { AuthResponse } from "../models/response/authResponse"
import axios from "axios";


export default class Store{
    user = {} as IUser
    isAuth = false
    isLoading = false;

    constructor(){
        makeAutoObservable(this)
        this.checkAuthOnInit()
    }

    async checkAuthOnInit() {
        const token = localStorage.getItem('refreshToken');
        if (token) {
            await this.checkAtho()
        } else {
            this.setAuth(false)
        }
    }

    setAuth(bool:boolean){
        this.isAuth = bool
    }

    setUser(user: IUser){
        this.user = user
    }
    
    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    authError = false
    authMassengeError = ""
    regError = false
    reqMassengeError = ""

    setAuthError(bool:boolean){
        this.authError = bool
    }
    setRegError(bool:boolean){
        this.regError = bool
    }
    setAuthMassengeError(text:string){
        this.authMassengeError = text
    }
    setRegMassengeError(text:string){
        this.reqMassengeError = text
    }

    async login(user: string, password: string){
        try{
            const response = await AuthService.login(user, password)
            console.log(response)
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            this.setAuthError(false)
            this.setAuthMassengeError("")
            this.setAuth(true)
            this.setUser(response.data.user)
        }catch(e:any){
            this.setAuthError(true)
            if(e.code == 'ERR_BAD_REQUEST'){
                this.setAuthMassengeError("неверное имя пользователя или пароль")
            }
            else{
                this.setAuthMassengeError("неизвестная ошибка")
            }
            console.log(e.status)
        }
    }
    async registration(username: string, email: string, password: string){
        try{
            const response = await AuthService.registration(username, email, password)
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        }catch(e:any){
            if(e.status == 400){
                this.setAuthMassengeError(e.response.data.message)
            }
            else{
                this.setAuthMassengeError("неизвестная ошибка")
            }
            console.log(e.status)
        }
    }
    async logout(){
        try{
            const response = await AuthService.logout()
            this.setAuth(false)
            this.setUser({} as IUser) 
        }catch(e){
            console.log(e)
        }
    }

    async checkAtho(){
        this.setLoading(true);
        try {
            const token = localStorage.getItem('refreshToken')
            const response = await axios.post<AuthResponse>(`${API_URL}/refresh`, { token})
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }
    async checkCookie(){
        const response = await axios.get<AuthResponse>(`${API_URL}/getCookie`,{ withCredentials: true})
        console.log(response)
    }
}