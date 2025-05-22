// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AppliactionService } from 'src/app/core/services/application.service';
// import { UserService } from 'src/app/core/services/user.service';
// import { ApplicationCreateDto } from 'src/app/core/types/general';


// @Component({
//   selector: 'app-application-form',
//   templateUrl: './application-form.component.html',
//   styleUrls: ['./application-form.component.scss'], 
  
// })
// export class ApplicationFormComponent implements OnInit {
//   appForm: FormGroup;
//   isEditMode = false;
//   id: number = 0;
//   users: any[] = [];
//   private appId?: number;

//   constructor(
//     private appService: AppliactionService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private usersSvc: UserService,
//   ) {
//     this.appForm = new FormGroup({
//       name: new FormControl('', Validators.required),
//       description: new FormControl(''),
//       url: new FormControl(''),
//       server: new FormControl(''),
//       repository: new FormControl(''),
//       ownerId: new FormControl(null),
//       supportEmail: new FormControl('', [Validators.required, Validators.email]),
//       smeEmail: new FormControl(''),
//       dbServer: new FormControl(''),
//       available: new FormControl(true)  
//     });
//   }
//   private getUsers(){
//     return new Promise<void>((resolve,reject)=>{
//       this.usersSvc.getUsers().subscribe({
//         next:(res)=>{
//           this.users = res;
//           console.log(res)
//           resolve();
//         }
//         ,error:(err)=>{
//           console.error(err)
//           reject();
//         }

//       })
//     })

//   }
//   async ngOnInit() {

//     this.route.paramMap.subscribe(params => {
//       this.id = Number(params.get('id'));
//       if (this.id && this.id !== 0) {
//         this.isEditMode = true;
//         this.appId = this.id;
//         this.loadApplication(this.appId);
//       }
//     });
//     await this.getUsers();
//   } 

//   private loadApplication(id: number) {
//     this.appService.GetApplication(id).subscribe(app => {
//       this.appForm.patchValue(app);
//     });
//   }

//   onSubmit() {
//     if (this.appForm.invalid) return;

//     const dto: ApplicationCreateDto = this.appForm.value;

//     // if (this.isEditMode && this.appId) {
//     //   this.appService.update(this.appId, dto).subscribe(() => {
//     //     this.router.navigate(['/applications', this.appId]);
//     //   });
//     // } else {
//     //   this.appService.create(dto).subscribe(created => {
//     //     this.router.navigate(['/applications', created.id]);
//     //   });
//     // }
//   }

//   cancel() {
//     if (this.isEditMode && this.appId) {
//       this.router.navigate(['/applications', this.appId]);
//     } else {
//       this.router.navigate(['/applications']);
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppliactionService } from 'src/app/core/services/application.service';
import { UserService } from 'src/app/core/services/user.service';
import { ApplicationCreateDto } from 'src/app/core/types/general';


@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit {
  appForm: FormGroup;
  id: number = 0;
  isEditMode = false;
  private appId?: number;
  users: any[] = [];

  constructor(
    private appService: AppliactionService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private usersSvc: UserService,
  ) {
    this.appForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      url: new FormControl('', Validators.pattern(/https?:\/\/.+/)),
      server: new FormControl('', Validators.required),
      repository: new FormControl(''),
      ownerId: new FormControl(null, Validators.required),
      supportEmail: new FormControl('', [Validators.required, Validators.email]),
      smeEmail: new FormControl('', Validators.email),
      dbServer: new FormControl(''),
      available: new FormControl(true)
    });
  }
  private getUsers(){
    return new Promise<void>((resolve,reject)=>{
      this.usersSvc.getUsers().subscribe({
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
    })

  }
  async ngOnInit() {


     this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id && this.id !== 0) {
        this.isEditMode = true;
        this.appId = this.id;
        this.loadApplication(this.appId);
      }
    });
    await this.getUsers();
  }

  private loadApplication(id: number) {
    this.appService.GetApplication(id).subscribe(app => {
      this.appForm.patchValue(app);
    });
  }

  isInvalid(control: string): boolean {
    const c = this.appForm.get(control);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  onSubmit() {
    if (this.appForm.invalid) {
      this.appForm.markAllAsTouched();
      return;
    }

    const dto: ApplicationCreateDto = this.appForm.value;
    console.log(dto);
    if (this.isEditMode && this.appId) {
      this.appService.UpdateApplication( dto,this.appId).subscribe({
        next: () => {
               this.router.navigate(['/applications', this.appId]);
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.appService.CreateApplication(dto).subscribe({
        next: (created) => {
          this.router.navigate(['/applications', created.id]);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  cancel() {
    if (this.isEditMode && this.appId) {
      this.router.navigate(['/applications', this.appId]);
    } else {
      this.router.navigate(['/applications']);
    }
  }
}