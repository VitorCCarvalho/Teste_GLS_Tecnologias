import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective } from "@angular/forms";

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.css']
})
export class TextFormComponent implements OnInit{
  @Input() formName: string = ''
  @Input() label: string = ''
  @Input() form: any
  @Input() parentForm : any
  @Input() placeholder? :any
  @Input() inputMask? :any

  constructor(private rootFormGroup: FormGroupDirective) {
    
  }
  
  ngOnInit(){
    this.form = this.rootFormGroup.control;
  }

  
}
