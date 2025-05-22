import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApplicationReadDto, CommentReadDto, TicketReadDto } from 'src/app/core/types/general';
import { AppliactionService } from 'src/app/core/services/application.service';
import { TikectService } from 'src/app/core/services/ticket.service';
import { GetToken } from 'src/app/core/functions/localstorage';
import { LoadConfigService } from 'src/app/core/services/load-config.service';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';
// import { ApplicationService } from 'src/app/core/services/application.service';
// import { TicketService } from 'src/app/core/services/ticket.service';
// import { CommentService } from 'src/app/core/services/comment.service';

// import { TicketDto } from 'src/app/core/types/ticket-dto';
// import { CommentDto } from 'src/app/core/types/comment-dto';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss']
})
export class ApplicationDetailComponent implements OnInit {
  users: any[] = [];
  id: number = 0;
  myUserId: string = '';
  application?: ApplicationReadDto;
  tickets: TicketReadDto[] = [];
  commentsMap: Record<number, CommentReadDto[]> = {};
  ticketForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appSvc: AppliactionService,
    private ticketSvc: TikectService,
    private _loadConfigService:LoadConfigService,
    private messageService: MessageService,
    private usersSvc: UserService,
    // private commentSvc: CommentService
  ) {}
 canEditApplication(): boolean {
  return this.users.some(u =>
    u.id == this.myUserId &&    // ojo, aquí usamos == en lugar de ===
    u.roleId === 1
  );
}
goToEdit(){
  console.log("woorking");
   console.log(this.id);
    this.router.navigate([`application/${this.id}`]);

}
   goToTicketDetails(ticket: any): void {
    this.router.navigate([`/ticket/${ticket.id}`]);  // Redirigir a la ruta del ticket
  }



  async ngOnInit() {

    this.myUserId = (await GetToken(this._loadConfigService.getConfig().tokenName)).sub;
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    await this.loadApplication(this.id);
    await   this.loadTickets(this.id);
    await this.getUsers();
  }

  private loadApplication(id: number) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.appSvc.GetApplication(id).subscribe({
        next: (app) => {
          this.application = app;
          console.log(this.application)
          resolve();
        },
        error: (err) => {
          console.error(err);
          reject();
        }
      });
    });
    
  }
  private getUsers(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.usersSvc.getUsers().subscribe({
        next: (res) => {
          this.users = res;
          console.log(res);
          resolve();
        },
        error: (err) => {
          console.error(err);
          reject();
        }
      });
    }
    );
  }
  private loadTickets(appId: number) {
    return new Promise<void>((resolve, reject) => {
      this.ticketSvc.getTickets(appId).subscribe({
        next: (tks) => {
          this.tickets = tks;
          // tks.forEach(t => this.loadComments(t.id));
          resolve();
        },
        error: (err) => {
          console.error(err);
          reject();
        }
      });
    }
    );}

  // private loadTickets(appId: number) {
  //   this.ticketSvc.getByApplication(appId).subscribe(tks => {
  //     this.tickets = tks;
  //     tks.forEach(t => this.loadComments(t.id));
  //   });
  // }

  // private loadComments(ticketId: number) {
  //   this.commentSvc.getByTicket(ticketId)
  //     .subscribe(coms => this.commentsMap[ticketId] = coms);
  // }

  async submitTicket() {
    if (this.ticketForm.invalid || !this.application) return;
    const payload = {
      applicationId: this.application.id,
      ...this.ticketForm.value,
      createdById: (await GetToken(this._loadConfigService.getConfig().tokenName)).sub

    };
    console.log(payload);
    this.ticketSvc.saveTicket(payload).subscribe({
      next: async (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Ticket created successfully',
          life: 2000
        });
        await this.loadTickets(this.id);
      },
      error: (err) => {
        console.error(err);
      }

    });
    this.ticketForm.reset();
    this.ticketForm.markAsPristine();
   
  }
}
