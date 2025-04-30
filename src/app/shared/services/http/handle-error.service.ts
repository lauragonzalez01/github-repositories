import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpConstants } from '../../constants/http-constant';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor() { }

  public handleHttpError(error: HttpErrorResponse, username?: string) {
    let errorMessage = 'Ocurrió un error inesperado; por favor, inténtalo de nuevo más tarde.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case HttpConstants.not_found:
          errorMessage = `Usuario de GitHub "${username || 'desconocido'}" no encontrado.`;
          break;
        case HttpConstants.connection_error:
          errorMessage = `No se pudo conectar con la API de GitHub. Verifica tu conexión de red.`;
          break;
        default:
          errorMessage = `Error al obtener los repositorios. Código: ${error.status}, Mensaje: ${error.error.message || error.statusText}`;
          break;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}