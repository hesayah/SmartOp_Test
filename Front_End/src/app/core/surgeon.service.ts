import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { surgeonDTO } from './dto/surgeon.dto';


@Injectable({
  providedIn: 'root'
})
export class SurgeonService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getRankingSurgeons(page: number, search: string): Observable<surgeonDTO[]> {
    const url = `${this.apiUrl}/surgeons?page=${page}&search=${search}`;
    return this.http.get<surgeonDTO[]>(url);
  }
}
