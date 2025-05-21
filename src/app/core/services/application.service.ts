import { Injectable }      from '@angular/core';
import { HttpClient }      from '@angular/common/http';
import { Observable }      from 'rxjs';
import { environment }     from '../../../environments/environment';
import { Application, ApplicationCreate } from '../../Dtos/dtos';


@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private base = `${environment.apiUrl}/applications`;

  constructor(private http: HttpClient) {}

  /** Lista (con filtros opcionales) */
  getAll(department?: string, ownerId?: number): Observable<Application[]> {
    const params: any = {};
    if (department) params.department = department;
    if (ownerId)    params.ownerId    = ownerId;
    return this.http.get<Application[]>(this.base, { params });
  }

  /** Obtener detalle */
  getById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.base}/${id}`);
  }

  /** Crear */
  create(dto: ApplicationCreate): Observable<number> {
    return this.http.post<number>(this.base, dto);
  }

  /** Actualizar */
  update(id: number, dto: ApplicationCreate): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, dto);
  }

  /** Eliminar */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  /** Búsqueda libre */
  search(query: string, department?: string, ownerId?: number): Observable<Application[]> {
    const params: any = { query };
    if (department) params.department = department;
    if (ownerId)    params.ownerId    = ownerId;
    return this.http.get<Application[]>(`${this.base}/search`, { params });
  }
}
