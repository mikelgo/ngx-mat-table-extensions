import { NgxTableConfigProvider } from './ngx-table-config-provider';
import { MatTableDataSource } from '@angular/material/table';
import { NgxColumnDefinition } from './models/ngx-column-definition';


interface TestModel {}

describe('[NgxTableConfigProvider]', () => {
  let defaultTableConfigProvider: NgxTableConfigProvider<TestModel>;
  let columnDefinitions: NgxColumnDefinition[] = [];
  let datasource: MatTableDataSource<TestModel>;
  const MOCK_DATA: TestModel[] = [];
  beforeEach(() => {
    columnDefinitions = [
      {
        headerId: 'header1',
        title: 'title1',
      },
      {
        headerId: 'header2',
        title: 'title2',
        displayProperty: 'prop2',
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
