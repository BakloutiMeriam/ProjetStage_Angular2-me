import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { EmployeService } from 'app/service/employe.service';
import { Employe } from 'app/model/employe.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  id: number;
  formemployer: FormGroup;

  employe: Employe = new Employe();
  constructor(private employeService: EmployeService,
    private route: ActivatedRoute,private formBuilder: FormBuilder,
    private router: Router) { }

    ngOnInit(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.initForm();
      this.loadEmployeeDetails();
    }
    initForm(): void {
      this.formemployer = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        mail: ['', [Validators.required, Validators.email]],
        tel: ['', Validators.required],
            });
            this.id = this.route.snapshot.params['id'];
    }
    loadEmployeeDetails(): void {
      this.employeService.getEmployeById(this.id).subscribe(
        (employee) => {
          this.formemployer.patchValue({
            nom: employee.nom,
            prenom: employee.prenom,
            mail: employee.mail,
            tel: employee.tel,
          });
        },
        (error) => {
          console.error('Erreur lors du chargement des détails de l\'employé', error);
        }
      );
    }
    
    onSubmit(): void {
      if (this.formemployer.valid) {
        const updatedEmployee = this.formemployer.value;
        this.employeService.updateEmploye(this.id, updatedEmployee).subscribe(
          (response) => {
            console.log('Employé mis à jour avec succès', response);
            this.router.navigate(['/datatables']);
            // Gérez la réponse comme nécessaire
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de l\'employé', error);
            // Gérez l'erreur comme nécessaire
          }
        );
      }
    }
    edit(id :string): void {
      this.router.navigate(['/edit', id]);
    }

}
