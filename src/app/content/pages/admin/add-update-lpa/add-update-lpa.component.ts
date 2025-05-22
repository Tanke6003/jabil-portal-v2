import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RegisterLpaService } from 'src/app/core/services/register-lpa.service';
export interface register{
  id?:number;
  name?:string;
  project:string;
  line:string;
  station:string;
  url:string;
}
@Component({
  selector: 'app-add-update-lpa',
  templateUrl: './add-update-lpa.component.html',
  styleUrls: ['./add-update-lpa.component.scss']
})
export class AddUpdateLPAComponent implements OnInit {
  newRegister:register = {} as register
  registers:register[]=[
  ]
  consulting:boolean = false;

  constructor(public service:RegisterLpaService,
    public _messageService: MessageService
  ){
  
  }
  ngOnInit(): void {
    this.getRegisters();
  }
  async save(){
    this.consulting =true;
   await this.AddRegister();
   this.consulting =false;
   await this.getRegisters();
  }
  AddRegister(){
    return new Promise<void>((resolve,reject)=>{
      this.service.AddRegister(this.newRegister).subscribe({
        next:(res)=>{
          this.newRegister = {} as register
          this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado correctamente' ,key:'tr' });
          resolve();
          },
        error:(error)=>{
          console.error(error)
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar', key: 'tr' });
          reject();
         
        }
      })
    })
  }
  getRegisters(){
    return new Promise<void>((resolve,reject)=>{
      this.service.GetRegisters().subscribe({
        next:(res)=>{
          this.registers = res
          //this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Registro guardado correctamente' ,key:'tr' });
          resolve();
          },
        error:(error)=>{
          console.error(error)
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener registros', key: 'tr' });
          reject();
         
        }
      })
    })
  }
}
