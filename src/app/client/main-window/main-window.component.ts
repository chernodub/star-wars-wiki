import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { first } from 'rxjs/operators';
import { AppStateService } from 'src/app/core/services/app-state.service';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {
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
