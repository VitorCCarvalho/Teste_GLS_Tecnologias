import { HttpClient } from '@angular/common/http';
import { Component, Inject} from '@angular/core';
import { Pessoa } from './pessoa'
import { Cep } from './cep'
import { FormGroup, FormBuilder } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { TextFormComponent } from '../text-form/text-form.component'


@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.css'],
})
export class AddPessoaComponent {
  http: HttpClient
  formPessoa: FormGroup
  formBuilder: FormBuilder

  opt_gender: string[] = ['Masculino', 'Feminino', 'Outro']
  opt_civil_state: string[] = ['Solteiro', 'Casado', 'Divorciado', 'Viúvo']
  opt_credit: string[] = ['Bom', 'Regular', 'Ruim']

  telephoneMask: any
  emailMask: any
  rgMask: any
  cpfMask: any
  cepMask: any
  incomeMask: any

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http
    this.formBuilder = new FormBuilder()
    this.formPessoa = this.createForm(new Pessoa())

    this.getLocalStorage()
    this.createMasks()
    this.formPessoa.controls['cep'].valueChanges.subscribe(res => {
      this.checkCEP(res)
    })
  }

  getLocalStorage() {
    let arrayControls = Object.keys(this.formPessoa.value)
    arrayControls.forEach((key) => {
      if (localStorage.getItem(key) != null) {
        this.formPessoa.controls[key].setValue(localStorage.getItem(key))
      }
    })
  }

  createMasks() {
    this.telephoneMask = createMask({ mask: '(99) [9] 9999-9999', removeMaskOnSubmit: true })
    this.emailMask = createMask({ alias: 'email', removeMaskOnSubmit: true })
    this.rgMask = createMask({ mask: '999.999.999-99', removeMaskOnSubmit: true })
    this.cpfMask = createMask({ mask: '999.999.999-99', removeMaskOnSubmit: true })
    this.cepMask = createMask({ mask: '99999-999', removeMaskOnSubmit: true })

    this.incomeMask = createMask({
      alias: 'numeric',
      groupSeparator: ',',
      digits: 2,
      digitsOptional: false,
      prefix: 'R$ ',
      placeholder: '0',
      removeMaskOnSubmit: true
    })
  }

  fillInAddress(cep: Cep){
    this.formPessoa.controls['public_place'].setValue(cep.logradouro)
    this.formPessoa.controls['neighbourhood'].setValue(cep.bairro)
    this.formPessoa.controls['city'].setValue(cep.localidade)
    this.formPessoa.controls['state'].setValue(cep.uf)
  }

  checkCEP(cep : string) {
    let strCep = cep.replace('_', '')
    
    if (strCep.length == 9) {
      strCep = strCep.replace('-', '')
      this.http.get<Cep>('https://viacep.com.br/ws/' + strCep + '/json/').subscribe(result => {

      this.fillInAddress(result)

      }, error => console.error(error));
    }
  }

  checkDone() {
    const arrayControls = Object.keys(this.formPessoa.value)

    let indexOptional = arrayControls.indexOf('passport')
    arrayControls.splice(indexOptional, 1)
    indexOptional = arrayControls.indexOf('cnh')
    arrayControls.splice(indexOptional, 1)

    let check : Boolean = true

    arrayControls.forEach((key, value) => {
      if (this.formPessoa.value[key] == '') {
        check = false
      }
    })
    return check
  }

  onSubmit() {
    if (!this.checkDone()) {
      localStorage.clear();

      const arrayControls = Object.keys(this.formPessoa.value)
      arrayControls.forEach((key) => {

        localStorage.setItem(key, this.formPessoa.value[key])
      })
    } else {
      alert("Por favor preencher todos os dados necessários")
    }
    
  }
  

  createForm(pessoa: Pessoa) {
    const formG = this.formBuilder.group({
      name: [pessoa.name],
      birth: [pessoa.birth],
      gender: [pessoa.gender],
      civil_state: [pessoa.civil_state],
      nacionality: [pessoa.address],
      address: [pessoa.address],
      telephone: [pessoa.telephone],
      email: [pessoa.email],
      rg: [pessoa.rg],
      cpf: [pessoa.cpf],
      passport: [pessoa.passport],
      cnh: [pessoa.cnh],
      cep: [pessoa.cep],
      public_place: [pessoa.public_place],
      neighbourhood: [pessoa.neighbourhood],
      city: [pessoa.city],
      state: [pessoa.state],
      income: [pessoa.income],
      credit: [pessoa.credit],
      account: [pessoa.account],
      emergency: [pessoa.emergency],
      medical: [pessoa.medical]
    })

    return formG;
  }
}
