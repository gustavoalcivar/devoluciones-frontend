import { Component, OnInit } from '@angular/core'
import {DevolucionesService} from '../../services/devoluciones.service'

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {

  devoluciones = []

  constructor(private devolucionesService: DevolucionesService) { }

  ngOnInit(): void {
    this.devolucionesService.getDevoluciones()
      .subscribe(res => {
        console.log(res)
        this.devoluciones = res.data
      },
      err => console.log(err))
  }

}
