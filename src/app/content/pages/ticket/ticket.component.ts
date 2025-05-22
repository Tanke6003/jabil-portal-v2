import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Para leer el ID del ticket desde la URL
import { GetToken } from 'src/app/core/functions/localstorage';
import { LoadConfigService } from 'src/app/core/services/load-config.service';
import { TikectService } from 'src/app/core/services/ticket.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  canCloseTicket:boolean=false;
  ticketId:number=0
  ticket: any = {};  // Para almacenar el ticket
  comments: any[] = [];  // Para almacenar los comentarios del ticket
  newComment: string = '';  // Para almacenar el nuevo comentario que el usuario escriba
  userId: number = 0;  // ID del usuario actual (puedes obtenerlo desde un servicio de usuario)
  canAddComment: boolean = false;  // Determina si el usuario puede agregar comentarios
  sendingComment:boolean = false;
  users:any[]=[]
  constructor(
    private route: ActivatedRoute,  // Para acceder a los parámetros de la URL
    private ticketService: TikectService,  // El servicio que obtiene los tickets
    private userService: UserService,  // El servicio que obtiene la información del usuario

            private _loadConfigService:LoadConfigService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.userId = Number((await GetToken(this._loadConfigService.getConfig().tokenName)).sub);
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'))??0;  // Obtén el ID del ticket desde la URL
    
    if ( this.ticketId ) {
      await this.getUsers()
      this.loadTicket( );  // Cargar el ticket y los comentarios
    }
  }
  async checkCanCloseTicket() {

    if (this.ticket.status === 'Abierto' && 
        (this.ticket.createdById === this.userId || this.ticket.assignedToId === this.userId)) {
          console.log("yes")
      this.canCloseTicket = true;
    } else {console.log("no")
      this.canCloseTicket = false;
    }
  }
  loadTicket(): void {
    // Llamar al servicio para obtener el ticket
    this.ticketService.getTicket( this.ticketId ).subscribe(
      (ticket) => {
        this.ticket = ticket;
        this.loadComments();  // Cargar los comentarios del ticket
        this.checkCanAddComment();  // Verificar si el usuario puede agregar un comentario
        this.checkCanCloseTicket()
      },
      (error) => {
        console.error('Error al cargar el ticket', error);
      }
    );
  }
  closeTikcet(): void {
    // Llamar al servicio para obtener el ticket
    this.ticketService.closeTicket( this.ticketId ).subscribe(
      {
        next:(res)=>{
          console.log(res)
          this.loadTicket( );
        },
        error:(err)=>{
          console.error(err)
        }
      }
    );
  }
   getUsers():Promise<void>{
    return new Promise((resolve,reject)=>{
      this.userService.getUsers().subscribe({
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

  loadComments(): void {
    // // Llamar al servicio para obtener los comentarios del ticket
    this.ticketService.getComments( this.ticketId ).subscribe(
      {next:(comments) => {
        this.comments = comments;
      },
      error:(error) => {
        console.error('Error al cargar los comentarios', error);
      }}
    );
  }

  checkCanAddComment(): void {
    // Verificar si el ticket está en estado 'Abierto' y si el usuario es el creador o está asignado
    if (this.ticket.status === 'Abierto' && 
        (this.ticket.createdById === this.userId || this.ticket.assignedToId === this.userId)) {
      this.canAddComment = true;
    } else {
      this.canAddComment = false;
    }
  }

  addComment(): void {
    this.sendingComment = true;
    if (this.newComment.trim()) {
      // Llamar al servicio para agregar el comentario
      const commentData = {
        authorId: this.userId,
        comment: this.newComment.trim()
      };
      
      this.ticketService.addComment(commentData,this.ticketId).subscribe({
        next:(res) => {
          console.log(res)
          this.newComment = "";
          this.loadComments();
        },
        error:(error) => {
          console.error('Error al agregar el comentario', error);
        }}
      );
       this.sendingComment = false;
    }
  }
  getUserNameByUserId(fid: number) {
  // Buscamos al usuario por ID
  const user = this.users.find((u) => u.id === fid);
  
  // Si el usuario no se encuentra, devolvemos "not found"
  if (!user) {
    //onsole.error(`User with id ${fid} not found`);
    return "not found";
  }
  
  // Devolvemos el nombre del usuario si existe, sino "not found"
  return user.name ?? "not found";
}

}
