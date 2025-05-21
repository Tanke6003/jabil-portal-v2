import { Injectable }       from '@angular/core';
import { HttpClient }       from '@angular/common/http';
import { Observable }       from 'rxjs';
import { map }              from 'rxjs/operators';
import { environment }      from '../../../environments/environment';
import { LoginResponse, RegisterRequest } from '../../Dtos/dtos';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private base = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  /** Llama a POST /api/auth/login */
  login(creds: { username: string; password: string; }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, creds);
  }

  /** Llama a POST /api/auth/register */
  register(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.base}/register`, data);
  }

  /** Obtiene el token almacenado */
  get token(): string | null {
    return localStorage.getItem('token');
  }

  /** Guarda el token */
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  /** Borra el token */
  logout() {
    localStorage.removeItem('token');
  }
}
