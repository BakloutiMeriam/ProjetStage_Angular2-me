import { Component,OnInit} from '@angular/core';
import * as Chartist from 'chartist';
import {ChartEvent } from "ng-chartist";
import { FormsModule } from '@angular/forms';
declare var require: any;
const data: any = require('../../shared/data/chartist.json');
import { EmployeService } from 'app/service/employe.service';
import { ChartDataSets,ChartPointOptions,ChartType ,ChartOptions} from 'chart.js';
import { Label } from 'ng2-charts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})

export class Dashboard2Component  {
  employeeId: number;
  id: number;
  formemployer: FormGroup;
  totalTime: number = 0;
  absenceDays: number = 0;
  heuresSupplementaires: number=0;
  totalDays: number = 0;
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: string[] = ['Total des heures'];
  barChartType: string = 'bar';
  barChartLegend: boolean = true;
  barChartData: any[] = [
    { data: [0], label: 'Total des heures' }
  ];

  donutChartData: any = {
    data: {
      labels: ['Jours Absents', 'Jours Travaillés'],
      series: [this.absenceDays, this.totalDays - this.absenceDays]
    },
    type: 'doughnut',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  };

  pieChartLabels: Label[] = ['Heures supplémentaires', 'Heures normales'];
  pieChartData: number[] = [this.heuresSupplementaires, 40]; // Remplacez par les valeurs appropriées

  // Options du graphique à secteurs
  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom'
    }
  };

  // Légende du graphique à secteurs
  pieChartLegend: boolean = true;

  
  currentDateTime: Date = new Date();
  constructor(private employeservice:EmployeService,private router: Router,private route: ActivatedRoute) {

}
ngOnInit(): void {
  setInterval(() => {
    this.currentDateTime = new Date();
  }, 1000);
  this.route.params.subscribe(params => {
    const employeeId = params['id'];
    this.employeeId = employeeId; 
  });
  
}
calculateTotalHours(form: any) {
  if (form.valid) {
    const { employeeId, minDate, maxDate } = form.value;

    this.employeservice.getTotalHours(employeeId, minDate, maxDate).subscribe(
      (response) => {
        this.totalTime = response.totalTime;
        this.barChartData[0].data = [this.totalTime];
      },
      (error) => {
        console.error('Error fetching total hours:', error);
      }
    );
    this.employeservice.getAbsenceStats(employeeId, minDate, maxDate).subscribe(
      (response) => {
        this.absenceDays = response.absenceDays;
        
      },
      (error) => {
        console.error('Error fetching absence days:', error);
      }
    );
    this.employeservice.getHeuresSupplementaires(employeeId, minDate, maxDate).subscribe(
      (response) => {
          this.heuresSupplementaires = response.heuresSupplementaires;
      },
      (error) => {
          console.error('Erreur lors de la récupération des heures supplémentaires :', error);
      }
  );

  }
}


}
  

