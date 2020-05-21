import { environment } from '../../environments/environment'

let URL:string
if (environment.production) {
    URL = 'https://devoluciones-api.herokuapp.com'
} else {
    URL = 'http://localhost:4000'
}

export default URL
