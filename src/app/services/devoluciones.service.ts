import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DevolucionesService {

  constructor(private http: HttpClient) { }

  getDevolucionesPorAnio() {
    return this.http.get<any>(`${environment.URL}/devolucion?tipo=poranio`)
  }

  getDevolucionesPorMes(anio: number) {
    return this.http.get<any>(`${environment.URL}/devolucion?tipo=pormes&anio=${anio}`)
  }

  getDevolucionesPorDia(anio: number, mes: number) {
    return this.http.get<any>(`${environment.URL}/devolucion?tipo=pordia&anio=${anio}&mes=${mes}`)
  }

  getDevolucionesPorLocal(anio: number, mes: number, dia: number) {
    return this.http.get<any>(`${environment.URL}/devolucion?tipo=porlocal&anio=${anio}&mes=${mes}&dia=${dia}`)
  }
  
}
