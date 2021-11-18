import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Script } from '../models/script';


@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  private _scripts: BehaviorSubject<Script[]>;
 
  private datastore: {
    scripts: Script[]
  }

  constructor( private http: HttpClient) { 
    this.datastore = {scripts: [] };
    this._scripts = new BehaviorSubject<Script[]>([]);
  }

  get scripts(): Observable<Script[]> {
    return this._scripts.asObservable();
  }

  scriptById(id: number){
    return this.datastore.scripts.find(x => x.id == id);
  }
  loadAll() {
    const scriptUrl = 'assets/callScript.JSON';

    return this.http.get<Script[]>(scriptUrl)
    .subscribe( data => {
      this.datastore.scripts = data;
      this._scripts.next(Object.assign({}, this.datastore).scripts);
    }, error => {
      console.log("Failed to find JSON");
    })
  }
}
