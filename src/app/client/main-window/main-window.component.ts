import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getFilms().subscribe((result) => {
      console.log(result);
    });
  }
}
