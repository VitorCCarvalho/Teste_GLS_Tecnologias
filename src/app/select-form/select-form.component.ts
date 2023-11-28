import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective } from "@angular/forms";

@Component({
  selector: 'app-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.css']
})
export class SelectFormComponent implements OnInit{
  @Input() formName: string = ''
  @Input() label: string = ''
  @Input() form: any
  @Input() parentForm : any
  @Input() optionArray : any

  constructor(private rootFormGroup: FormGroupDirective) {
    
  }
  
  ngOnInit(){
    this.form = this.rootFormGroup.control;
  }
}
