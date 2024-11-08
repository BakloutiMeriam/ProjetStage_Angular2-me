import { Component,OnInit } from '@angular/core';
import { EmployeService } from 'app/service/employe.service';
declare var require: any;
const data: any = require('../../shared/data/chartist.json');

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component {
  currentDateTime: Date = new Date();
  constructor(private employeService: EmployeService) { }
  totalEmployes: number;
  ngOnInit(): void {
    this.loadTotalEmployes();
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

}
