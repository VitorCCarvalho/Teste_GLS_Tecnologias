import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit} from '@angular/core';
import { Pessoa } from './pessoa'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';


@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.css'],
})
export class AddPessoaComponent {
  http: HttpClient
  formPessoa: FormGroup
  formBuilder: FormBuilder

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

  checkCEP(cep : string) {
    if (cep.length == 9) {
      let strCep = cep.replace('-', '')
      this.http.get<any>('https://viacep.com.br/ws/' + strCep + '/json/').subscribe(result => {
        console.log(result)

        this.formPessoa.controls['public_place'].setValue(result['logradouro'])
        this.formPessoa.controls['neighbourhood'].setValue(result['bairro'])
        this.formPessoa.controls['city'].setValue(result['localidade'])
        this.formPessoa.controls['state'].setValue(result['uf'])

      }, error => console.error(error));
    }
  }

  onSubmit() {
    if (this.checkDone()) {
      localStorage.clear();
      let masks = ['telephone', 'email', 'rg', 'cpf', 'cep']

      const arrayControls = Object.keys(this.formPessoa.value)
      arrayControls.forEach((key, value) => {
        if (masks.includes(key)) {
          localStorage.setItem(key, this.formPessoa.value[key])
        }
        localStorage.setItem(key, this.formPessoa.value[key])
      })
    } else {
      alert("Por favor preencher todos os dados necessários")
    }
    
  }

  getLocalStorage() {
    let arrayControls = Object.keys(this.formPessoa.value)
    arrayControls.forEach((key, value) => {
      if (localStorage.getItem(key) != null) {
        this.formPessoa.controls[key].setValue(localStorage.getItem(key))
      }
    })
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



interface gender {
  value: number;
  viewValue: String
}

interface civil_state {
  value: number;
  viewValue: String
}