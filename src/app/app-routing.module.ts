import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import {LoginComponent} from './components/login/login.component'
import {RegisterComponent} from './components/register/register.component'
import {DevolucionesComponent} from './components/devoluciones/devoluciones.component'

import {AuthGuard} from './auth.guard'
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component'


const routes: Routes = [
  { path: '', redirectTo: '/devoluciones', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'devoluciones', component: DevolucionesComponent, canActivate: [AuthGuard] },
  { path: 'uploader', component: FileUploaderComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
