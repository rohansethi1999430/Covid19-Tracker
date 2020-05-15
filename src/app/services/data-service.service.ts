import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{map} from 'rxjs/operators'
import { GlobalDataSummary } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private  dateWiseDataUrl='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
  private globalDataUrl= 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-26-2020.csv'

getDateWiseData(){
  return this.http.get(this.dateWiseDataUrl,{responseType:'text'})
  .pipe(map(result=>{
    let rows=result.split('\n');
    console.log(rows);
  }))
}

  constructor(private http: HttpClient) { }
  getGlobalData(){
    return this.http.get(this.globalDataUrl,{responseType :'text'}).pipe(
      map(result=>{
        let data:GlobalDataSummary[]=[];
        let raw={}
        let rows=result.split('\n');
        rows.splice(0, 1);
        //console.log(rows);
        
        rows.forEach(rows =>{
          let cols=rows.split(/,(?=\S)/)
          let cs={
            country : cols[3],
            confirmed : +cols[7],
            deaths : +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          };
          let temp : GlobalDataSummary=raw[cs.country]
          if (temp){
            temp.active=cs.active + temp.active
            temp.confirmed=cs.confirmed+temp.confirmed
            temp.deaths=cs.deaths+temp.deaths
            temp.recovered=cs.recovered+temp.recovered
            raw[cs.country]=temp;
          }
            else{
              raw[cs.country]=cs;
            }
        })
        return <GlobalDataSummary[]>Object.values(raw);
      })
    )
    
      
    }

  }

