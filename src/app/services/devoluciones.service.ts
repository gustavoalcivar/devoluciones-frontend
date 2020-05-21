import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DevolucionesService {

  private URL = 'http://localhost:4000'
  //private URL = 'https://devoluciones-api.herokuapp.com'

  constructor(private http: HttpClient) { }

  getDevoluciones() {
    return this.http.get<any>(`${this.URL}/devolucion`)
  }
}
