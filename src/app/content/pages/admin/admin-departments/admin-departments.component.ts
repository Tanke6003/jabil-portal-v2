import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DepartmentService } from 'src/app/core/services/department.service';
import { Department } from 'src/app/core/types/general';

@Component({
  selector: 'app-admin-departments',
  templateUrl: './admin-departments.component.html',
  styleUrls: ['./admin-departments.component.scss']
})
export class AdminDepartmentsComponent implements OnInit {
  departments:Department[] = [];
  selectedDepartment:Department = {} as Department;
  openDialogDepartment:boolean = false;
  isLoad: boolean = false;
    @ViewChild('dt1') table!: Table;
    @ViewChild('inputSearch') inputSearch!: any;
  
  constructor(
    private _departmentService: DepartmentService,
    private _messageService: MessageService,
  ) { }
  async ngOnInit() {
    await this.getDepartments();
    this.isLoad = true;
  }
  applyFilter(event: any, stringVal: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(filterValue, stringVal);
  }
  async getDepartments(){
    return new Promise((resolve, reject) => {
      this._departmentService.getDepartments().subscribe(
        {
          next: (data) => {
            this.departments = data;
            resolve(data);
          },
          error: (error) => {
            this._messageService.add({severity:'error', summary:'Error', detail:'Error al obtener los departamentos',key:'tr'});
            reject(error);
          }
        }
      );
    })
  }

  onCancelDepartment(){
    this.selectedDepartment = {} as Department;
    this.openDialogDepartment = false;
  }
  validateDepartment(){
   if(this.selectedDepartment.name == null || this.selectedDepartment.name == ""){
      this._messageService.add({severity:'error', summary:'Error', detail:'El nombre del departamento es requerido',key:'tr'});
      return false;
    }
    return true; 
  }
  onSaveDepartment(){
    if(!this.validateDepartment()){
      return;
    }
    this._departmentService.addUpdateDepartment(this.selectedDepartment).subscribe({
      next:(res)=>{
        this._messageService.add({severity:'success', summary:'Success', detail:'Departamento guardado correctamente',key:'tr'});
        this.getDepartments();
        this.openDialogDepartment = false;
      },
      error:(error)=>{
        this._messageService.add({severity:'error', summary:'Error', detail:'Error al guardar el departamento',key:'tr'});
        console.error(error);
      }
    })
  }

  editDepartment(departmentId:number){
    this.selectedDepartment = this.departments.find(x => x.id == departmentId)!;
    this.openDialogDepartment = true;
  }
  addDepartment(){
    this.selectedDepartment = {} as Department;
    this.selectedDepartment.id = 0;
    this.selectedDepartment.available = true;
    this.openDialogDepartment = true;
  }



}
