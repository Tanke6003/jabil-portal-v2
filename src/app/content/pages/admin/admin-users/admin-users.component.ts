import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoleService } from 'src/app/core/services/role.service';
import { UserService } from 'src/app/core/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { User } from 'src/app/core/types/general';
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  headerModal: string = '';
  displayModal: boolean = false;
  selectedUser: User = {} as User;
  users: User[] = [];
  showUsers: any[] = [];
  roles: any[] = [];
  isEdit:boolean=false;
  isNew:boolean=true;
  @ViewChild('dt1') table!: Table;
  userForm: FormGroup = new FormGroup({
    ntUser: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[/\\\sa-zA-Z0-9_-]{2,100}$')])),
    fullName: new FormControl('', Validators.compose([Validators.required])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[\\sa-zA-Z0-9_@.-]{2,150}$')])),
    roleId: new FormControl(-1, Validators.compose([Validators.required, Validators.pattern('^[-0-9]{1,22}')])),
    available: new FormControl(true)
  });
  constructor(private _authService: AuthService, private _messageService: MessageService, private _roleService: RoleService, private _userService: UserService, private _translateService: TranslateService) {}
  ngOnInit(): void {
    this.getUsers();
  }
  applyFilter(event: any, stringVal:any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(filterValue, stringVal);
  }
  async getUsers() {
      try{
        this.users = await this._userService.getUsers().toPromise()??[];
        this.roles = await this._roleService.GetRoles().toPromise()??[];
        this.showUsers = this.users.map((x) => {
          return {
            id: x.id,
            fullName: x.fullName,
            ntUser: x.ntUser,
            email: x.email,
            roleName: this.roles.find((y) => y.id === x.roleId)?.name,
            available: x.available
          }
        });
      }
      catch(error){
        console.error(error);
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in get users', key: 'tr' });
      
      }
  }
  async getRoles() {
    try {
      this.roles = await this._roleService.GetRoles().toPromise()??[];
    }
    catch (error) {
      console.error(error);
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in get roles', key: 'tr' });
    }
  }
  async getRolesLowers(){
    try{
      this.roles = await this._roleService.GetRolesLowers().toPromise()??[];
    }catch(err)
    {
      console.error(err)
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in get roles lowers', key: 'tr' });
    }
  }
  cleanForm(){
    this.userForm.reset();
    this.userForm.get("available")?.setValue(true);
    this.userForm.get("id")?.setValue(0);
    this.isNew = true;
    this.isEdit = false;
  }
  getUserInfo(){
    if(this.userForm.value.ntUser==null || this.userForm.value.ntUser.length<=3)
      return this._messageService.add({severity:"warn",detail:"La cuenta NT no cuenta con los caracteres minimos",life:3000})
    this._authService.GetUserInfoByNTUser(this.userForm.value.ntUser).subscribe({
      next:(res:any)=>{
        this.isNew = false;
        this.isEdit = true;
        this.selectedUser.id = res.id;
        this.userForm.patchValue({
          id:res.id,
          ntUser:res.ntUser,
          email:res.email,
          fullName:res.fullName,
          available:res.available,
          roleId:res.roleId
        })

      },
      error:(err:any)=>{
        console.error(err)
        if(err.status == 404)
          return this._messageService.add({severity:"warn",detail:err.error,life:3000})
        return this._messageService.add({severity:"error",detail:err.error,life:3000})


      }
    })
  }
  async addUser() {
    await this.getRolesLowers();
    this.isEdit=false;
    this.isNew=true;
    this.userForm.reset();
    this.selectedUser = {} as User;
    this.selectedUser.id=0;
    this.userForm.get('roleId')?.setValue(-1);
    this.displayModal = true;
    this.headerModal = this._translateService.instant('AddUser');
  }

  async edit(user: User) {
    await this.getRolesLowers();
    this.userForm.reset();
    this.isEdit = false;
    this.isNew = false;
    this.selectedUser = this.users.find((x) => x.id === user.id) ?? {} as User;
    this.userForm.get('ntUser')?.setValue(this.selectedUser.ntUser);
    this.userForm.get('fullName')?.setValue(this.selectedUser.fullName);
    this.userForm.get('email')?.setValue(this.selectedUser.email);
    this.userForm.get('roleId')?.setValue(this.selectedUser.roleId);
    this.userForm.get('available')?.setValue(this.selectedUser.available);
    this.headerModal = this._translateService.instant('EditUser');
    this.displayModal = true;
  }
  save(){
    if(this.userForm.invalid)
      return this._messageService.add({severity:'error', summary:'Error', detail:'Please fill all fields',key:'tr'});
    this.selectedUser.ntUser = this.userForm.get('ntUser')?.value;
    this.selectedUser.fullName = this.userForm.get('fullName')?.value;
    this.selectedUser.email = this.userForm.get('email')?.value;
    this.selectedUser.roleId = this.userForm.get('roleId')?.value;
    this.selectedUser.available = this.userForm.get('available')?.value;
    this._userService.AddOrUpdateUser(this.selectedUser).subscribe({
      next:(res)=>{
        if(this.selectedUser.id == 0)
          this._messageService.add({severity:'success', summary:'Success', detail:'User added successfully',key:'tr'});
        else
          this._messageService.add({severity:'info', summary:'Success', detail:'User updated successfully',key:'tr'});
      },
      error:(err)=>{
        console.error(err)
        this._messageService.add({severity:'error', summary:'Error', detail:'Error in save user',key:'tr'});
      },
      complete:()=>{
        this.cancel();
      }
    });

  }
  cancel(){
    this.userForm.reset();
    this.selectedUser = {} as User;
    this.getUsers();
    this.displayModal = false;
  }

}
