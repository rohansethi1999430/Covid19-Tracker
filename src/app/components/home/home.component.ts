import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { GoogleChartsModule } from 'angular-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed=0;
  totalActive=0;
  totalDeaths=0;
  totalRecovered=0;
  datatable=[];
  globalData:GlobalDataSummary[];
  chart={
    PieChart:"PieChart",
    ColumnChart:'ColumnChart',
    height : 500,
  
  options: {
    
    animation:{
      duration:1000,
      erasing:'out',
    },
  }
}
  constructor(private dataService:DataServiceService) { }

  initChart(caseType: string){
    this.datatable=[];
    //this.datatable.push(["Country","Cases"])
    this.globalData.forEach(cs=>{
      let value: number;
      if(caseType=='c'){
      if(cs.confirmed > 20000){
      value=cs.confirmed
      }}

      if(caseType=='r'){
        if(cs.recovered > 20000){
        value=cs.recovered
        }}

        if(caseType=='a'){
          if(cs.active > 20000){
          value=cs.active
          }}

          if(caseType=='d'){
            if(cs.deaths > 20000){
            value=cs.deaths
            

            }}
            this.datatable.push([
              cs.country,value
            ])
    })
    console.log(this.datatable);
    
      
    
  }

  ngOnInit():void {
    this.dataService.getGlobalData()
    .subscribe(
      {
        next :(result :any) =>{
          console.log(result);
          this.globalData=result;
          result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed))
            {
              this.totalActive+=cs.active
              this.totalConfirmed+=cs.confirmed
              this.totalDeaths+=cs.deaths
              this.totalRecovered+=cs.active
            }
          })
          this.initChart('c');
        }
      }
    )
  }
  updateChart(input : HTMLInputElement){
    console.log(input.value);
    this.initChart(input.value)
  }

}
