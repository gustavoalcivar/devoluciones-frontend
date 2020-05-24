import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false; error: string = null

  user = {
    user: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.authService.checkSession()) {
      this.router.navigate(['/devoluciones'])
    }
  }

  login() {
    this.user.user = this.user.user.trim()
    this.user.password = this.user.password.trim()
    if(this.user.user === '' || this.user.password === '') {
      this.error = 'Todos los campos son requeridos'
      return
    }
    this.isLoading = true
    this.authService.login(this.user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.data.token)
          this.router.navigate(['/devoluciones'])
          this.toastr.info('Bienvenid@', res.data.user)
          this.isLoading = false
        },
        err => {
          this.error = err.error.message || err.message
          this.isLoading = false
        }
      )
  }

}
