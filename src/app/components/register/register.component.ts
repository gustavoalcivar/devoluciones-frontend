import { Component, OnInit } from '@angular/core'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    user: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.user)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/login'])
        },
        err => console.log(err)
      )
  }

}
