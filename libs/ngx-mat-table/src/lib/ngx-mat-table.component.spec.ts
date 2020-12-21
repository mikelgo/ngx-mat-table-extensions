import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatTableComponent } from './ngx-mat-table.component';
import { MatTableModule } from '@angular/material/table';

interface TestModel {
  id: number;
  name: string;
}

describe('NgxMatTableComponent', () => {
  let component: NgxMatTableComponent<TestModel>;
  let fixture: ComponentFixture<NgxMatTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [ NgxMatTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
