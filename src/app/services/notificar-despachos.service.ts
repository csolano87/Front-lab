import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Notificar, Notificarcion } from '../interfaces/carga-notificar.interface';
const baseUrl = environment.url;
@Injectable({
  providedIn: 'root'
})
export class NotificarDespachosService {
  socketsStatus = false;
  userToken!: string;
  constructor(private http: HttpClient,
      private socket: Socket,) { this.checkStatus(); }
      get token(): string {
        return localStorage.getItem('token') || '';
      }
      get headers() {
        return { headers: { 'x-token': this.token } };
      }
  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketsStatus = true;
    });
    this.socket.on('disconnect', () => {
      console.log('Disconectado del servidor');
      this.socketsStatus = false;
    });
  }

  emit(evento: string, payload: any, callback?: Function) {
    console.log(`*****EMITIENDO****`, evento);
    console.log(`*****EMITIENDO****`, payload);
    console.log(`*****EMITIENDO****`, callback);
    this.socket.emit(evento, payload, callback);
  }
  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  getNotificar():Observable<Notificar[]>{

    return this.http.get<Notificarcion>(`${baseUrl}/api/notificar`,this.headers)
    .pipe(map(({notificar})=>notificar))
  }
}
