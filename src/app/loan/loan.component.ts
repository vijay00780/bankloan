import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Options, LabelType } from 'ng5-slider';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {

  loanData:any;
  amount: number = 500;
  monthPayment: number= 6;
  loading:boolean=true;
  gif = "../../assets/loading.gif";
  
  loanAmt: Options = {
    floor: 500,
    ceil: 5000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>loan amount:</b> $' + value;       
        default:
          return '$' + value;
      }
    }
  };

  duration: Options = {
    floor: 6,
    ceil: 24,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + " months";       
        default:
          return value+ " months";
      }
    }
  };
  constructor(public service: ServiceService) { }

  ngOnInit() {    
    this.getLoanInterest();
  }

  public getLoanInterest() {
    this.service.getInterest(this.amount, this.monthPayment).
    subscribe (
      data => {
       this.loading = false;
       this.loanData = data;       
      });
  }

  public loanAmount(amt) {
    this.loanData.monthlyPayment.amount = "";
    this.loading = true;
    this.service.getInterest(amt, this.monthPayment).
    subscribe (
      data => {
       this.loading = false;
       this.loanData = data;       
      });    
  }

  public installments(months) {
    this.loanData.monthlyPayment.amount = "";
    this.loading = true;
    this.service.getInterest(this.amount, months).
    subscribe (
      data => {
       this.loading = false;
       this.loanData = data;       
      });    
  }


}
