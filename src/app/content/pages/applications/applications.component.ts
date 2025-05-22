import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppliactionService } from 'src/app/core/services/application.service';
import { UserService } from 'src/app/core/services/user.service';
import { ApplicationReadDto } from 'src/app/core/types/general';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications:ApplicationReadDto[] = [];
  filteredApps: ApplicationReadDto[] = [];
  users:any[] = [];
  searchTerm: string = '';

  constructor(private _applicationsService: AppliactionService,
    private _userService: UserService,
    private router: Router
  ) {
    

  }
  getApplications(){
  return new Promise<void>((resolve,reject)=>{
    this._applicationsService.GetApplications().toPromise().then((res)=>{
      this.applications = res.map((app:any) => ({
        ...app,
        createdAt: new Date(app.createdAt)
      }));
      this.filteredApps = [...this.applications];
      resolve();
    }).catch((err)=>{
      console.error(err)
      reject();
    })
  });
  }
  getUsers(){
    return new Promise<void>((resolve,reject)=>{
      this._userService.getUsers().subscribe({
        next:(res)=>{
          this.users = res;
          console.log(res)
          resolve();
        }
        ,error:(err)=>{
          console.error(err)
          reject();
        }

      })
    })}

  getUserNameById(id:number |undefined){
    const user = this.users.find((user:any) => user.id === id);
    return user ? user.name : 'Unknown User';
  }

  async ngOnInit() {
    await this.getApplications();
    await this.getUsers();
  }
    onSearch() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredApps = [...this.applications];
    } else {
      this.filteredApps = this.applications.filter(app =>
        [
          app.id.toString(),
          app.name,
          app.description || '',
          app.url || '',
          app.server || '',
          app.repository || '',
          app.ownerId?.toString() || '',
          app.supportEmail,
          app.smeEmail || '',
          app.dbServer || '',
          app.createdAt.toISOString(),
          app.available.toString()
        ].some(field => field.toLowerCase().includes(term))
      );
    }
  }
  onRowClick(app: ApplicationReadDto) {
    this.router.navigate(['/applications', app.id]);
  }
}
