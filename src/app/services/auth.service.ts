import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
import URL from './config'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient, private router: Router) { }

  register(user) {
    return this.http.post<any>(`${URL}/register`, user)
  }

  login(user) {
    return this.http.post<any>(`${URL}/login`, user)
  }

  checkSession(): boolean {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
    this,this.router.navigate(['/login'])
  }
}
