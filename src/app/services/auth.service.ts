import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:4000'
  //private URL = 'https://devoluciones-api.herokuapp.com'

  constructor(private http: HttpClient, private router: Router) { }

  register(user) {
    return this.http.post<any>(`${this.URL}/register`, user)
  }

  login(user) {
    return this.http.post<any>(`${this.URL}/login`, user)
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
