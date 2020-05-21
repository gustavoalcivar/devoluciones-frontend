import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import URL from './config'

@Injectable({
  providedIn: 'root'
})
export class DevolucionesService {

  constructor(private http: HttpClient) { }

  getDevoluciones() {
    return this.http.get<any>(`${URL}/devolucion`)
  }
}
