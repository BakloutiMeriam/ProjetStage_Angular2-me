import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { EmployeService } from 'app/service/employe.service';
@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  importForm: FormGroup;

  constructor(private fb: FormBuilder, private fileservice: EmployeService) {
    this.importForm = this.fb.group({
      file: ['']
    });
   }
   onFileChange(event: any) {
    const file = event.target.files[0];
    this.importForm.get('file').setValue(file);
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.importForm.get('file').value);

    this.fileservice.uploadFile(formData).subscribe(
      (response) => {
        console.log('Fichier importé avec succès', response);
      },
      (error) => {
        console.error('Erreur lors de l\'importation du fichier', error);
      }
    );
  }

   
  ngOnInit() {

  }

}
