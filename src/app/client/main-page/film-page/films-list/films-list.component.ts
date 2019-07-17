import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { AppStateService } from '../../../../core/services/app-state.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private appStateService: AppStateService
  ) {}

  ngOnInit(): void {
    this.dataService.getFilms().subscribe(
      (result) => {
        console.log(result);
        this.appStateService.unsetLoading();
      },
      (error) => {
        this.appStateService.unsetLoading();
      }
    );
  }
}
