import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor(private http: HttpClient) { }

  uploadFile(fd: FormData) {
    return this.http.post<any>(`${environment.URL}/upload`, fd)
  }

  read() {
    return this.http.get<any>(`${environment.URL}/read`)
  }

}
