import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tio } from '../models/tio';
import axios from "axios";
import { tokenName } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  urlToken:string = 'http://localhost:8090/api/security/oauth/token';
  tokenURL = 'http://localhost:8762/token/';
  tioURL = 'http://localhost:8762/api/tio/';
  apiv1URL = 'http://localhost:9756/api/v1';
  usuariologeado = false;
  constructor(private httpClient: HttpClient) { }

  obtenerToken(){
    const token = localStorage.getItem('token');
    return token;
  }

  async listaName(name: string) {
    var response;
    try{
        response = await this.httpClient.get<Tio[]>(this.apiv1URL + '/users/' + name + '/todos').toPromise();
        //response = await this.httpClient.get<Tio[]>(this.tioURL + 'lista').toPromise();        
        console.log('response');
        console.log(JSON.stringify(response));
    }catch(e){
        console.log(e);
        return e.response;
    }
    return response;
  }

  async listaId() {
    var response;
    try{
        const id:string = "0";
        response = await this.httpClient.get<Tio[]>(this.apiv1URL + '/users/' + id + '/id').toPromise();
        //response = await this.httpClient.get<Tio[]>(this.tioURL + 'lista').toPromise();        
        console.log('response');
        console.log(JSON.stringify(response));
    }catch(e){
        console.log(e);
        return e.response;
    }
    return response;
  }

  async listaSinToken() {
    var response;
    try{
        response = await this.httpClient.get<Tio[]>(this.tioURL + 'lista').toPromise();
        //response = await this.httpClient.get<Tio[]>(this.tioURL + 'lista').toPromise();        
        console.log('response');
        console.log(JSON.stringify(response));
    }catch(e){
        console.log(e);
        return e.response;
    }
    return response;
  }


  async lista() {
    var response;
    try{
        const token = localStorage.getItem('token');
        console.log('token: ' + token);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          });
        const requestOptions = { headers: headers };
        response = await this.httpClient.get<Tio[]>(this.tioURL + 'lista', requestOptions).toPromise();
        //response = await this.httpClient.get<Tio[]>(this.tioURL + 'lista').toPromise();        
        console.log('response');
        console.log(JSON.stringify(response));
    }catch(e){
        console.log(e);
        return e.response;
    }
    return response;
  }

  async login(tio: Tio){
    try{
      var response;
      var token:string = "";
      const headers = new HttpHeaders(
        {
          'Authorization':'Basic ZnJvbnRlbmRhcHA6MTIzNDU=',
          'Content-Type':'application/x-www-form-urlencoded'
        }
      );
      const body = new HttpParams()
      .set('username', tio.nombre)
      .set('password', tio.password)
      .set('grant_type','password');
    
      response = await  this.httpClient.post(this.urlToken , body, {headers: headers}).toPromise();
      if(response){
        /*
        {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhbmRyZXMiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiYXBlbGxpZG8iOiJHdXptYW4iLCJjb3JyZW8iOiJwcm9mZXNvckBib2xzYWRlaWRlYXMuY29tIiwiZXhwIjoxNjY3OTYzOTMyLCJub21icmUiOiJBbmRyZXMiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiYjIwNGYxZjItNjQ5Yy00OGFjLWIwODQtMzhlNDgxMzAwZWE4IiwiY2xpZW50X2lkIjoiZnJvbnRlbmRhcHAifQ.VrplfQY_iGr5D7oBcyJTQCj7ccdWZHlxMJpy0UHfqkg",
    "token_type": "bearer",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhbmRyZXMiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiYXBlbGxpZG8iOiJHdXptYW4iLCJjb3JyZW8iOiJwcm9mZXNvckBib2xzYWRlaWRlYXMuY29tIiwiYXRpIjoiYjIwNGYxZjItNjQ5Yy00OGFjLWIwODQtMzhlNDgxMzAwZWE4IiwiZXhwIjoxNjY3OTYzOTMyLCJub21icmUiOiJBbmRyZXMiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiZWU0ZDIwNWMtMzQ3YS00NmZlLTlkMjYtNjdiMjE2NGI4ZTZiIiwiY2xpZW50X2lkIjoiZnJvbnRlbmRhcHAifQ.LHaYCkJybaO6WvXIZ4xLFKJfuauuWUhFbhl8LX5qgo0",
    "expires_in": 3599,
    "scope": "read write",
    "apellido": "Guzman",
    "correo": "profesor@bolsadeideas.com",
    "nombre": "Andres",
    "jti": "b204f1f2-649c-48ac-b084-38e481300ea8"
}
        */
        token = response.access_token;
        window.localStorage.removeItem('token');
        window.localStorage.setItem('token', token);   
      }
    }catch(e){
        console.log(e);
    }
  }

  async loginAnterior(tio: Tio) {
    var token:string = "";
    const user = {
      "username": tio.nombre,
      "password": tio.password
    }
    try{
        var response;
        response = await this.httpClient.post<any>(this.tokenURL + 'login', user).toPromise();
        if(response){
            token = response.token;
            window.localStorage.removeItem('token');
            window.localStorage.setItem('token', token);   
        }
    }catch(e){
        console.log(e);
    }
  } 

  async logout() {
    try{
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('login');
    }catch(e){
        console.log(e);
    }
  } 

  async login2() {
    var token = "";
    //const username:string = "randomuser123";
    //const password:string = "password";
  
    const username:string = "luis13711";
    const password:string = "123456";

    const user = {
      "username": username,
      "password": password
    }
    try{
        var response;
        // en el post también al final se coloca , { 'headers': headers }
        response = await this.httpClient.post<any>(this.tokenURL + 'login', user).toPromise();
        if(response){
            token = response.token;
            window.localStorage.removeItem('token');
            window.localStorage.setItem('token', token);
            return token;
        }
        
    }catch(e){
        console.log(e);
        return token;
    }
    
  } 
}
