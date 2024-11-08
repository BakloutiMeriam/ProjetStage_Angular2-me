import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from 'app/model/employe.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = 'http://localhost:8000';
  tab_emp : Employe[];
  constructor(private http: HttpClient) { }
  getEmployes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getemploye`);
  }

  ajouterEmploye(employe: Employe): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, employe);
  }
  deleteEmploye(id: number): Observable<any> {
    return this.http.delete<any[]>(`${this.apiUrl}/deleteid/${id}`);
  }
  updateEmploye(id: number, employe: Employe): Observable<any> {
    const url = `${this.apiUrl}/edit/${id}`;
    return this.http.put<any[]>(url, employe);
  }
  getEmployeById(id: number): Observable<Employe> {
    const url = `${this.apiUrl}/getemployeid/${id}`;
    return this.http.get<Employe>(url);
  }
  getTotalEmployes(): Observable<number> {
    const url = `${this.apiUrl}/total`; // Assurez-vous d'ajuster le chemin de l'API Symfony
    return this.http.get<number>(url);
  }
  uploadFile(formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/upload`;
    return this.http.post(url, formData).pipe(
      catchError((error) => {
        console.error('Erreur lors de la requête HTTP', error);
        throw error;
      })
      );
  }
  getTotalHours(idEmploye: string, dateDebut: string, dateFin: string): Observable<any> {
    const url = `${this.apiUrl}/nbrheuretot/${idEmploye}/${dateDebut}/${dateFin}`;
    return this.http.get(url);
  }
  getAbsenceStats(employeeId: string, startDate: string, endDate: string): Observable<any> {
    const url = `${this.apiUrl}/absences/${employeeId}/${startDate}/${endDate}`;
    return this.http.get<any>(url);
  }
  getHeuresSupplementaires(employeeId: number, startDate: string, endDate: string) {
    const url = `${this.apiUrl}/heures-supplementaires/${employeeId}/${startDate}/${endDate}`;
    return this.http.get<any>(url);
}
importExcel(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return this.http.post(`${this.apiUrl}/import-excel`, formData);
}
registerAdmin(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, data);
}
  
}
