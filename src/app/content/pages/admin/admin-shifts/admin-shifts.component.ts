import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ShiftService } from 'src/app/core/services/shift.service';
import { Shift } from 'src/app/core/types/general';

@Component({
  selector: 'app-admin-shifts',
  templateUrl: './admin-shifts.component.html',
  styleUrls: ['./admin-shifts.component.scss']
})
export class AdminShiftsComponent implements OnInit {
  isLoad: boolean = false;
  shifts: Shift[] = [];
  selectedShift: Shift = {} as Shift;
  openDialogShift: boolean = false;
  @ViewChild('dt1') table!: Table;
  @ViewChild('inputSearch') inputSearch!: any;
  constructor(
    private _shiftService: ShiftService,
    private _messageService: MessageService
  ) { }

  async ngOnInit() {
    await this.getShifts();
    this.isLoad = true;
  }
  async getShifts() {
    return new Promise((resolve, reject) => {
      this._shiftService.getShifts().subscribe(
        {
          next: (data) => {
            this.shifts = data;
            resolve(data);
          },
          error: (error) => {
            console.error(error);
            this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener los turnos', key: 'tr' });
            reject(error);
          }
        }
      )
    })
  }
  applyFilter(event: any, stringVal: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(filterValue, stringVal);
  }
  addShift() {
    this.selectedShift = {} as Shift;
    this.selectedShift.id = 0;
    this.selectedShift.available = true;
    this.openDialogShift = true;

  }
  editShift(shiftId: number) {
    this.selectedShift = this.shifts.find(x => x.id == shiftId) as Shift;
    this.openDialogShift = true;
  }
  validateShift() {
    if (this.selectedShift.name == null || this.selectedShift.name == "") {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'El nombre es requerido', key: 'tr' });
      return false;
    }
    return true;
  }
  onSaveShift() {
    if (!this.validateShift()) {
      return;
    }
    this._shiftService.addUpdateShift(this.selectedShift).subscribe({
      next: (response) => {
        this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Turno guardado correctamente', key: 'tr' });
        this.getShifts();
        this.openDialogShift = false;
      },
      error: (error) => {
        console.error(error);
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar el turno', key: 'tr' });
      }
    });
  }
  onCancelShift() {
    this.selectedShift = {} as Shift;
    this.openDialogShift = false;
  }



}
