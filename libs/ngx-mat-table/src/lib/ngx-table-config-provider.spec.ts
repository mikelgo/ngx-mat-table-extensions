import { NgxTableConfigProvider } from './ngx-table-config-provider';
import { MatTableDataSource } from '@angular/material/table';
import { NgxColumnDefinition } from './models/ngx-column-definition';


interface TestModel {
  id: number;
  name: string;
}
const MOCK_DATA: TestModel[] = [
  {id: 102, name: 'name'},
  {id: 2342, name: 'fasbnja3e'},
  {id: 123, name: '23gfnae'}
];

describe('[NgxTableConfigProvider]', () => {
  let defaultTableConfigProvider: NgxTableConfigProvider<TestModel>;
  let columnDefinitions: NgxColumnDefinition[] = [];
  let datasource: MatTableDataSource<TestModel>;

  beforeEach(() => {
    columnDefinitions = [
      {
        headerId: 'header1',
        title: 'id',
      },
      {
        headerId: 'header2',
        title: 'title2',
        displayProperty: 'name',
        hide: true
      }
    ];
    datasource = new MatTableDataSource<TestModel>(MOCK_DATA);
    defaultTableConfigProvider = new NgxTableConfigProvider<TestModel>(
      datasource,
      columnDefinitions,
          )

  });
  afterEach(() => {
    defaultTableConfigProvider = null;
    datasource = null;
  });

  it('connectDataSource() should connect the datasource to an incoming data stream ', () => {
    defaultTableConfigProvider.connectDataSource(MOCK_DATA);
    expect(defaultTableConfigProvider.getDataSource().data).toEqual(MOCK_DATA);
  });

  it('getDataSource() should return the datasource', () => {
    expect(defaultTableConfigProvider.getDataSource()).toEqual(datasource)
  });

  it('getDisplayColumnDefinitions() should return the visible column definitions', () => {
    const visibleColumnDefinitions: NgxColumnDefinition[] = [...columnDefinitions.filter(v => !v.hide)];
    expect(defaultTableConfigProvider.getDisplayColumnDefinitions()).toEqual(visibleColumnDefinitions);
    expect(defaultTableConfigProvider.getDisplayColumnDefinitions().length).toBe(1);
  });

  it('getDisplayColumnHeaderIds() should return the visible column header IDs', () => {
    const visibleColumnheader: string[] = ['header1'];
    expect(defaultTableConfigProvider.getDisplayColumnHeaderIds()).toEqual(visibleColumnheader);
    expect(defaultTableConfigProvider.getDisplayColumnHeaderIds().length).toBe(1);
  })


});
