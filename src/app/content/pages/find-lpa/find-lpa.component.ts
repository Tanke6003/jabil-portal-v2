import { Component } from '@angular/core';
import { register } from '../admin/add-update-lpa/add-update-lpa.component';
import { RegisterLpaService } from '../../../core/services/register-lpa.service';


@Component({
  selector: 'app-find-lpa',
  templateUrl: './find-lpa.component.html',
  styleUrls: ['./find-lpa.component.scss']
})
export class FindLPAComponent {
  searched:boolean = false;
  code:string='';
register:register =  {
} as register

constructor(public service:RegisterLpaService){

}

search(){
  return new Promise<void>((resolve,reject)=>{
    this.service.GetRegister(this.code).subscribe({
      next:(res)=>{
        //g(res)
        this.register = res;
        this.searched = true;
        resolve();
      },
      error:(error)=>{
        console.error(error)
        this.register  = {} as register
        this.searched = true;
        reject();
      }
    })
  })
}
}
