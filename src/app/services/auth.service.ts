import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient, private router: Router) { }

  register(user) {
    return this.http.post<any>(`${environment.URL}/register`, user)
  }

  login(user) {
    return this.http.post<any>(`${environment.URL}/login`, user)
  }

  checkSession() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
