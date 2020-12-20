import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  NgxColumnDefinition,
  NgxTableConfigProvider,
} from '@ngx-mat-table-extensions/ngx-mat-table-extensions';
import { User } from './user';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from './data.service';

@Component({
  selector: 'ngx-mat-table-extensions-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('id', { static: true }) idTemplate: TemplateRef<any>;
  title = 'demo';
  tableConfigProvider: NgxTableConfigProvider<User>;

  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.tableConfigProvider = new NgxTableConfigProvider<User>(
      new MatTableDataSource<User>([]),
      this.getColumns()
    );
    this.dataService.getUser().subscribe((user) => {
      this.tableConfigProvider.connectDataSource(user);
    });
  }

  ngAfterViewInit() {

  }

  getColumns(): NgxColumnDefinition[] {
    return [
      {
        headerId: 'id',
        title: 'ID',
        displayProperty: 'id',
        cellTemplate: this.idTemplate,
      },
      {
        headerId: 'firstName',
        title: 'Firstname',
        displayProperty: 'firstName',
      },
      {
        headerId: 'lastName',
        title: 'Lastname',
        displayProperty: 'lastName',
      },
      {
        headerId: 'mail',
        title: 'Email',
        displayProperty: 'email',
      },
      {
        headerId: 'state',
        title: 'State',
        // example for displaying nested properties
        displayProperty: 'address.state',
      },
    ];
  }

  private emailDisplayFn(email: string): string {
    return email.toUpperCase();
  }


  onCellSelect(user: User) {
    console.log(user);
  }

  onRowSelect(user: User) {
    // console.log(user);
  }
}
