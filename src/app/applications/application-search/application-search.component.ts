import { Component } from '@angular/core';
import { Application } from '../../Dtos/dtos';
import { ApplicationService } from '../../core/services/application.service';

@Component({
  selector: 'app-application-search',
  templateUrl: './application-search.component.html',
  styleUrl: './application-search.component.scss'
})


export class ApplicationSearchComponent {
  query = '';
  results: Application[] = [];

  constructor(private svc: ApplicationService) {}

  search() {
    this.svc.search(this.query).subscribe(r => this.results = r);
  }
}
