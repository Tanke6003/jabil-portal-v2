import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DiscrepancyService } from 'src/app/core/services/discrepancy.service';
import { IshikawaService } from 'src/app/core/services/ishikawa.service';
import { ReasonService } from 'src/app/core/services/reason.service';
import { Discrepancy, Reason } from 'src/app/core/types/general';

@Component({
  selector: 'app-admin-discrepancies',
  templateUrl: './admin-discrepancies.component.html',
  styleUrls: ['./admin-discrepancies.component.scss']
})
export class AdminDiscrepanciesComponent implements OnInit {
  isLoad: boolean = false;
  discrepancies:Discrepancy [] = [];
  selectedDiscrepancy:Discrepancy = {} as Discrepancy;
  openDialogDiscrepancy:boolean = false;
  openDialogReason:boolean = false;
  showFormReason:boolean = false;
  reasons: Reason[] = [];
  selectedReason: Reason = {} as Reason;
  ishikawas:any[]=[];
  
    @ViewChild('dt1') table!: Table;
    @ViewChild('dt2') table2!:Table;
    @ViewChild('inputSearch') inputSearch!: any;

  constructor(
    private _discrepancyService: DiscrepancyService,
    private _messageService: MessageService,
    private _reasonService: ReasonService,
    private _IshikawaService:IshikawaService
  ) { }
  async ngOnInit() {
    await this.getIshikawas();
    await this.getDiscrepancies();
    this.isLoad = true;
  }
  async getIshikawas(){
    return new Promise((resolve, reject) => {
      this._IshikawaService.GetIshikawa().subscribe(
        {
          next: (data) => {
            this.ishikawas = data;
            resolve(data);
          },
          error: (error) => {
            this._messageService.add({severity:'error', summary:'Error', detail:'Error al obtener las discrepancias',key:'tr'});
            reject(error);
          }
        }
      );
    })
  }
  async getDiscrepancies(){
    return new Promise((resolve, reject) => {
      this._discrepancyService.GetDiscrepancies().subscribe(
        {
          next: (data) => {
            this.discrepancies = data;
            resolve(data);
          },
          error: (error) => {
            this._messageService.add({severity:'error', summary:'Error', detail:'Error al obtener las discrepancias',key:'tr'});
            reject(error);
          }
        }
      );
    })
  }
  getIshikawaName(id:number)
  {
    let found = this.ishikawas.find((x)=> x.id === id);
    return found?.name ??"No Encontrado"
  }

  addDiscrepancy(){
    this.selectedDiscrepancy = {} as Discrepancy;
    this.selectedDiscrepancy.id = 0;
    this.selectedDiscrepancy.available = true;
    this.openDialogDiscrepancy = true;
  }
  editDiscrepancy(discrepancyId:number){
    this.selectedDiscrepancy = this.discrepancies.find(x => x.id == discrepancyId)!;
    this.openDialogDiscrepancy = true;
  }
  onSaveDiscrepancy(){
    if(this.selectedDiscrepancy.name == null || this.selectedDiscrepancy.name == ""){
      this._messageService.add({severity:'error', summary:'Error', detail:'El nombre de la discrepancia es requerido',key:'tr'});
      return;
    }
    this._discrepancyService.addUpdateDiscrepancy(this.selectedDiscrepancy).subscribe({
      next:(res)=>{
        this._messageService.add({severity:'success', summary:'Success', detail:'Discrepancia guardada',key:'tr'});
        this.getDiscrepancies();
        this.onCancelDiscrepancy();
      },
      error:(error)=>{
        this._messageService.add({severity:'error', summary:'Error', detail:'Error al guardar la discrepancia',key:'tr'});
      }
    });

  }
  onCancelDiscrepancy(){
    this.selectedDiscrepancy = {} as Discrepancy;
    this.openDialogDiscrepancy = false;
  }
  async getReasons(){
    this.reasons = [];
    return new Promise((resolve, reject) => {
      this._reasonService.GetReasonsByDiscrepancyId(this.selectedDiscrepancy.id).subscribe(
        {
          next: (data) => {
            this.reasons = data;
            resolve(data);
          },
          error: (error) => {
            this._messageService.add({severity:'error', summary:'Error', detail:'Error al obtener las razones',key:'tr'});
            reject(error);
          }
        }
      );
    })
  }
  openModelReasons(discrepancyId:number){
    this.selectedDiscrepancy = this.discrepancies.find(x => x.id == discrepancyId)!;
    this.getReasons();
    this.openDialogReason = true;
  }
  addReason(){
    this.selectedReason = {} as Reason;
    this.selectedReason.id = 0;
    this.selectedReason.available = true;
    this.selectedReason.discrepancyId = this.selectedDiscrepancy.id;
    this.showFormReason = true;
  }
  editReason(reasonId:number){
    this.selectedReason = this.reasons.find(x => x.id == reasonId)!;
    this.showFormReason = true;
  }
  cancelReason(){
    this.selectedReason = {} as Reason;
    this.showFormReason = false;
  }
  saveReason(){
    if(this.selectedReason.name == null || this.selectedReason.name == ""){
      this._messageService.add({severity:'error', summary:'Error', detail:'El nombre de la razón es requerido',key:'tr'});
      return;
    }
    this._reasonService.addUpdateReason(this.selectedReason).subscribe({
      next:(res)=>{
        this._messageService.add({severity:'success', summary:'Success', detail:'Razón guardada',key:'tr'});
        this.getReasons();
        this.cancelReason();
      },
      error:(error)=>{
        this._messageService.add({severity:'error', summary:'Error', detail:'Error al guardar la razón',key:'tr'});
      }
    });
  }
  applyFilter(event: any, stringVal: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(filterValue, stringVal);
  }
  applyFilterChild(event: any, stringVal: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table2.filterGlobal(filterValue, stringVal);
  }
}
