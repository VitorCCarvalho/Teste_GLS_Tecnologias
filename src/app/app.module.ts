import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AddPessoaComponent } from './add-pessoa/add-pessoa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputMaskModule } from '@ngneat/input-mask';
import { TextFormComponent } from './text-form/text-form.component';
import { DateFormComponent } from './date-form/date-form.component';
import { SelectFormComponent } from './select-form/select-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPessoaComponent,
    TextFormComponent,
    DateFormComponent,
    SelectFormComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,

    RouterModule.forRoot([
      { path: '', component: AddPessoaComponent, pathMatch: 'full' },
    ]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
