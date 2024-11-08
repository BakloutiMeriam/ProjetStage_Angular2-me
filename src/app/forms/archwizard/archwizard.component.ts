import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm,FormBuilder } from '@angular/forms';
import { EmployeService } from 'app/service/employe.service';
import { Employe } from 'app/model/employe.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-archwizard',
  templateUrl: './archwizard.component.html',
  styleUrls: ['./archwizard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchwizardComponent implements OnInit, AfterViewInit {

  nouvelEmploye: any = {};
  formemployer!: FormGroup;

  constructor(private ref: ChangeDetectorRef,private fb:FormBuilder,private employeService: EmployeService,private route:Router) {
  }

  ngOnInit():void {
    this.formemployer = this.fb.group({
      IDemployer: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.pattern('[0-9]*')],
        });
  }
  /*submit() {
    if (this.formemployer.valid) {
      const employeData: Employe = this.formemployer.value;
      this.employeService.ajouterEmploye(employeData).subscribe(response => {
          console.log('Employé ajouté avec succès !', response);
          // Réinitialisez le formulaire ou effectuez d'autres actions nécessaires.
          this.formemployer.reset();
        },
         error => {
          console.error('Erreur lors de l\'ajout de l\'employé', error);
        });
      }
    }*/
    submit() {
      this.employeService.ajouterEmploye(this.formemployer.value).subscribe(
        data => {
          console.log('Post request successful', data);
          this.route.navigate(['/datatables']);
          
        },
        error => {
          console.error('Error during post request', error);
        }
      );
    }
    
  ngAfterViewInit() {
    setTimeout(() => {this.ref.detectChanges();}, 100);
  }

  

}
