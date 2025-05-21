// src/app/applications/application-list/application-list.component.ts
import { Component, OnInit }     from '@angular/core';
import { ApplicationService }    from '../../core/services/application.service';
import { Application } from '../../Dtos/dtos';


@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
  providers: [ApplicationService]
})
export class ApplicationListComponent implements OnInit {
  apps: Application[] = [];
  department = '';
  ownerId?: number;

  constructor(private svc: ApplicationService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.getAll(this.department, this.ownerId)
      .subscribe(lst => this.apps = lst);
  }

  remove(app: Application) {
    if (!confirm(`¿Eliminar ${app.name}?`)) return;
    this.svc.delete(app.id).subscribe(() => this.load());
  }
}
