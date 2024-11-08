import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableData } from './data/datatables.data';
import { EmployeService } from 'app/service/employe.service';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType
} from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employe } from 'app/model/employe.model';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-datatables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss', '../../assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTablesComponent implements OnInit {
  currentDateTime: Date = new Date();
  
  faEdit = faEdit;
  faTrash = faTrash;
  ColumnMode = ColumnMode; 
  columns: any[] = [];
  employes: Employe[] = [];
  filterText: string = '';
  constructor(private employeService: EmployeService,private router:Router) {}
  totalEmployes: number;
  applyFilter(): void {
    this.employes = this.employes.filter(employe =>
      employe.nom.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  ngOnInit(): void {
    
    this.columns = [
      { name: 'ID', prop: 'id', width: 100 },
      { name: 'Nom', prop: 'nom', width: 200 },
      { name: 'Prenom', prop: 'prenom', width: 200 },
      { name: 'Mail', prop: 'mail', width: 250 },
      { name: 'Tel', prop: 'tel', width: 150 },
      { name: 'Action', width: 100 },
    ];

    this.loadEmployes();
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }
  loadTotalEmployes(): void {
    this.employeService.getTotalEmployes().subscribe(
      (total) => {
        this.totalEmployes = total;
      },
      (error) => {
        console.error('Erreur lors du chargement du nombre total d\'employés', error);
      }
    );
  }

  loadEmployes(): void {
    this.employeService.getEmployes().subscribe(
      (data) => {
        this.employes = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des employés', error);
      }
    );
  }


deleteEmploye(id:number): void {
  this.employeService.deleteEmploye(id).subscribe(
    (data) => {
      this.employes = this.employes.filter((employe) => employe.id !== id);
    },
    (error) => {
      console.error('Erreur lors de la suppression de l\'employé', error);
    }
  );
}
edit(id :string): void {
  this.router.navigate(['/forms/layout', id]);
}
detail(id :string): void {
  this.router.navigate(['/dashboard/dashboard2', id]);
}
submit(): void {
  this.router.navigate(['/forms/archwizard']);
}
updateEmploye(id: number, employe: Employe): void {
  this.employeService.updateEmploye(id, employe).subscribe(
    (data) => {
      // Mettez à jour vos données locales si nécessaire
      console.log('Employé mis à jour avec succès', data);
    },
    (error) => {
      console.error('Erreur lors de la mise à jour de l\'employé', error);
    }
  );
}


onFileChange(event: any) {
  const file = event.target.files[0];
  this.employeService.importExcel(file).subscribe(
    (response) => {
      console.log(response);
      alert('Le fichier Excel a été importé avec succès.');
    },
    (error) => {
      console.error(error);
      alert('Une erreur s\'est produite lors de l\'importation du fichier Excel.');
    }
  );
}


}
