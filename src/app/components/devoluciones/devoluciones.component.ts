import { Component, OnInit } from '@angular/core'
import { DevolucionesService } from '../../services/devoluciones.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {

  titulo = ''; cabecera = ''; datos = []; anio = 0; mes = 0; dia = 0; total = 0

  isLoading = false; error: string = null

  constructor(private devolucionesService: DevolucionesService, private router: Router) { }

  ngOnInit(): void {
    this.consultarPorAnio()
  }

  principal() {
    return this.cabecera === 'AÑO'
  }

  consultar(event: any) {
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
  }

  regresar() {
    if (this.cabecera === 'MES') {
      this.consultarPorAnio()
    } else if (this.cabecera === 'DÍA') {
      this.conultarPorMes()
    } else if (this.cabecera === 'LOCAL') {
      this.consultarPorDia()
    }
  }

  consultarPorLocal() {
    this.isLoading = true
    this.devolucionesService.getDevolucionesPorLocal(this.anio, this.mes, this.dia)
      .subscribe(res => {
        this.titulo = `DEVOLUCIONES DEL DÍA ${this.dia} DEL MES ${this.mes} DEL ${this.anio}`
        this.cabecera = 'LOCAL'
        this.datos = res.data
        this.total = res.total
        this.isLoading = false
      },
        err => {
          this.error = err.error.message || err.message
          this.isLoading = false
        })
  }

  consultarPorDia() {
    this.isLoading = true
    this.devolucionesService.getDevolucionesPorDia(this.anio, this.mes)
      .subscribe(res => {
        this.titulo = `DEVOLUCIONES DEL MES ${this.mes} DEL ${this.anio}`
        this.cabecera = 'DÍA'
        this.datos = res.data
        this.total = res.total
        this.isLoading = false
      },
        err => {
          this.error = err.error.message || err.message
          this.isLoading = false
        })
  }

  conultarPorMes() {
    this.isLoading = true
    this.devolucionesService.getDevolucionesPorMes(this.anio)
      .subscribe(res => {
        this.titulo = `DEVOLUCIONES DEL ${this.anio}`
        this.cabecera = 'MES'
        this.datos = res.data
        this.total = res.total
        this.isLoading = false
      },
        err => {
          this.error = err.error.message || err.message
          this.isLoading = false
        })
  }

  consultarPorAnio() {
    this.isLoading = true
    this.titulo = 'DEVOLUCIONES PRODUCTOS JOSELO'
    this.cabecera = 'AÑO'
    this.devolucionesService.getDevolucionesPorAnio()
      .subscribe(res => {
        this.datos = res.data
        this.total = res.total
        this.isLoading = false
      },
        err => {
          this.error = err.error.message || err.message
          this.isLoading = false
        })
  }

}
