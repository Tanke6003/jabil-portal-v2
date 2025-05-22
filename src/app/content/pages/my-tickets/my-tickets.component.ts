import { Component, OnInit } from '@angular/core';
import { GetToken } from 'src/app/core/functions/localstorage';
import { LoadConfigService } from 'src/app/core/services/load-config.service';
import { TikectService } from 'src/app/core/services/ticket.service';
import { UserService } from '../../../core/services/user.service';
import { AppliactionService } from 'src/app/core/services/application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent implements OnInit {
  userId:number = 0;
  tickets: any[] = [];  // Array para almacenar los tickets
  isLoading: boolean = false;  // Para mostrar el cargando
  applications:any[]=[];
  users:any[]=[]

  constructor(private ticketService: TikectService,
      private usersservice:UserService,
      private applicationService:AppliactionService,
        private _loadConfigService:LoadConfigService,
        private router:Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getUsers();
    await this.getApplications()
    this.loadTickets();  // Llamar a la función para cargar los tickets
  }
  getUsers():Promise<void>{
    return new Promise((resolve,reject)=>{
      this.usersservice.getUsers().subscribe({
        next:(res)=>{
          this.users = res
          console.log(res)
          resolve()
        },
        error:(err)=>{
          console.error(err)
          reject()
        }
      })
    })
  }
   getApplications():Promise<void>{
    return new Promise((resolve,reject)=>{
      this.applicationService.GetApplications().subscribe({
        next:(res)=>{
          this.applications = res
          resolve()
        },
        error:(err)=>{
          console.error(err)
          reject()
        }
      })
    })
  }
  getUserNameByUserId( fid:number){
    return this.users.find((u)=> u.id === fid).name??"Not Found"
  }
  async loadTickets(): Promise<void> {
    this.isLoading = true;  // Mostrar "Cargando..." mientras se obtiene la información
    this.userId = Number((await GetToken(this._loadConfigService.getConfig().tokenName)).sub);
    this.ticketService.getMyTikects(this.userId).subscribe({
      next:(res)=>{
        this.tickets = res
        console.log(this.tickets)
      },
      error:(err)=>{
        console.error(err)
      }
    })
    this.isLoading = false;  
  }
   goToTicketDetails(ticket: any): void {
    this.router.navigate([`/ticket/${ticket.id}`]);  // Redirigir a la ruta del ticket
  }

}
