import { Component } from '@angular/core';
import { NgxColumnDefinition, NgxTableConfigProvider } from '@ngx-mat-table-extensions/ngx-mat-table-extensions';
import { User } from './user';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from './data.service';

@Component({
  selector: 'ngx-mat-table-extensions-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo';
  tableConfigProvider: NgxTableConfigProvider<User>;

  constructor(private dataService: DataService) {
    this.tableConfigProvider  = new NgxTableConfigProvider<User>(
      new MatTableDataSource<User>([]),
      this.getColumns()
    );
    dataService.getUser().subscribe(user => {
      this.tableConfigProvider.connectDataSource(user);
    })
  }

  getColumns(): NgxColumnDefinition[] {
    return [
      {
        headerId: 'id',
        title: 'ID',
        displayProperty: 'id'
      },
      {
        headerId: 'firstName',
        title: 'Firstname',
        displayProperty: 'firstName'
      },
      {
        headerId: 'lastName',
        title: 'Lastname',
        displayProperty: 'lastName'
      },
      {
        headerId: 'mail',
        title: 'Email',
        displayProperty: 'email'
      },
      {
        headerId: 'state',
        title: 'State',
        displayProperty: 'address.state'
      }
    ]
  }
}

