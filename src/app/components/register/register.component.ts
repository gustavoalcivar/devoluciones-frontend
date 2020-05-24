import { Component, OnInit } from '@angular/core'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'

import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoading = false; error: string = null

  user = {
    user: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.authService.checkSession()) {
      this.router.navigate(['/devoluciones'])
    }
  }

  register() {
    this.user.user = this.user.user.trim()
    this.user.password = this.user.password.trim()
    this.user.confirmPassword = this.user.confirmPassword.trim()
    if(this.user.user === '' || this.user.password === '' || this.user.confirmPassword === '') {
      this.error = 'Todos los campos son requeridos'
      return
    }
    if(this.user.password !== this.user.confirmPassword) {
      this.error = 'Las contraseñas no coinciden'
      return
    }
    delete this.user.confirmPassword
    this.isLoading = true
    this.authService.register(this.user)
      .subscribe(
        res => {
          this.toastr.success('Ya puede ingresar al sistema', res.message)
          this.router.navigate(['/login'])
          this.isLoading = false
        },
        err => {
          this.error = err.error.message
          this.isLoading = false
        }
      )
  }

}
