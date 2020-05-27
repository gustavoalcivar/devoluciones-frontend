import { Component } from '@angular/core'
import { FileUploaderService } from 'src/app/services/file-uploader.service'

import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent {

  isLoading = false; error: string = null

  constructor(private fileUploadService: FileUploaderService, private toastr: ToastrService) {}

  onFileSelected(event) {
    this.isLoading = true
    for(let i = 0; i < event.target.files.length; i ++) {
      const fd = new FormData()
      fd.append('file', event.target.files[i], event.target.files[i].name)
      this.fileUploadService.uploadFile(fd)
        .subscribe(res => {
          this.toastr.success('', res.message, { timeOut: 2000 })
        },
        err => {
          this.error = err.error.message || err.message
          this.isLoading = false
        })
    }
    // Una vez  están todos los archivos en el servidor, se procesan
    this.fileUploadService.read()
      .subscribe(res => {
        this.toastr.success(res.message)
        this.isLoading = false
      },
      err => {
        this.error = err.error.message || err.message
        this.isLoading = false
      })
  }
}
