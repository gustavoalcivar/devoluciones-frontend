import { Component, OnInit } from '@angular/core'
import { DevolucionesService } from '../../services/devoluciones.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {

  titulo = ''; cabecera = ''; datos = []; anio = 0; mes = 0; dia = 0

  isLoading = false; error: string = null

  constructor(private devolucionesService: DevolucionesService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true
    this.consultarPorAnio()
    this.isLoading = false
  }

  principal() {
    return this.cabecera === 'AÑO'
  }

  consultar(event: any) {
    this.isLoading = true
    if (this.cabecera === 'AÑO') {
      this.anio = parseInt(event.target.innerText)
      this.conultarPorMes()
    } else if (this.cabecera === 'MES') {
      this.mes = parseInt(event.target.innerText)
      this.consultarPorDia()
    } else if (this.cabecera === 'DÍA') {
      this.dia = parseInt(event.target.innerText)
      this.consultarPorLocal()
    }
    this.isLoading = false
  }

  regresar() {
    this.isLoading = true
    if (this.cabecera === 'MES') {
      this.consultarPorAnio()
    } else if (this.cabecera === 'DÍA') {
      this.conultarPorMes()
    } else if (this.cabecera === 'LOCAL') {
      this.consultarPorDia()
    }
    this.isLoading = false
  }

  consultarPorLocal() {
    this.devolucionesService.getDevolucionesPorLocal(this.anio, this.mes, this.dia)
      .subscribe(res => {
        this.titulo = `DEVOLUCIONES DEL DÍA ${this.dia} DEL MES ${this.mes} DEL ${this.anio}`
        this.cabecera = 'LOCAL'
        this.datos = res.data
      },
        err => {
          this.error = err.error.message
        })
  }

  consultarPorDia() {
    this.devolucionesService.getDevolucionesPorDia(this.anio, this.mes)
      .subscribe(res => {
        this.titulo = `DEVOLUCIONES DEL MES ${this.mes} DEL ${this.anio}`
        this.cabecera = 'DÍA'
        this.datos = res.data
      },
        err => {
          this.error = err.error.message
        })
  }

  conultarPorMes() {
    this.devolucionesService.getDevolucionesPorMes(this.anio)
      .subscribe(res => {
        this.titulo = `DEVOLUCIONES DEL ${this.anio}`
        this.cabecera = 'MES'
        this.datos = res.data
      },
        err => {
          this.error = err.error.message
        })
  }

  consultarPorAnio() {
    this.titulo = 'DEVOLUCIONES PRODUCTOS JOSELO'
    this.cabecera = 'AÑO'
    this.devolucionesService.getDevolucionesPorAnio()
      .subscribe(res => {
        this.datos = res.data
      },
        err => {
          this.error = err.error.message
        })
  }

}
