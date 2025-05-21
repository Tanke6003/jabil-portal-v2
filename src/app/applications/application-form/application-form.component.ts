// application-form.component.ts
import { Component, OnInit }    from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService }    from '../../core/services/application.service';
import { ApplicationCreate } from '../../Dtos/dtos';


@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],

  providers: [ApplicationService,Router]
})
export class ApplicationFormComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private svc: ApplicationService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.id;
    this.form = this.fb.group({
      name:        ['', Validators.required],
      url:         ['', Validators.required],
      description: ['', Validators.required],
      dbServer:    ['', Validators.required],
      dbName:      ['', Validators.required],
      repoUrl:     ['', Validators.required],
      version:     ['', Validators.required],
      ownerUserId: [null, Validators.required],
      smeUserId:   [null, Validators.required],
      supportEmail:['', [Validators.required, Validators.email]],
      department:  ['', Validators.required]
    });

    if (this.isEdit) {
      this.svc.getById(this.id!).subscribe(a => this.form.patchValue(a));
    }
  }

 save() {
  if (this.form.invalid) return;

  const dto: ApplicationCreate = this.form.value;

  if (this.isEdit) {
    // Editar: la llamada update devuelve Observable<void>
    this.svc.update(this.id!, dto)
      .subscribe(() => this.router.navigate(['/applications']));
  } else {
    // Crear: la llamada create devuelve Observable<number>
    this.svc.create(dto)
      .subscribe(() => this.router.navigate(['/applications']));
  }
}

}
