import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective } from "@angular/forms";


@Component({
  selector: 'app-date-form',
  templateUrl: './date-form.component.html',
  styleUrls: ['./date-form.component.css']
})
export class DateFormComponent implements OnInit{
  @Input() formName: string = ''
  @Input() label: string = ''
  @Input() form: any
  @Input() parentForm : any



  constructor(private rootFormGroup: FormGroupDirective) {
    
  }
  
  ngOnInit(){
    this.form = this.rootFormGroup.control;
  }
}
