import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api.service';
import { RowDialogComponent } from '../row-dialog/row-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  constructor(private api: ApiService, private dialog: MatDialog) {}

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  isLoading = false;
  displayedColumns: string[] = ['name', 'lang', 'date', 'bool', 'href'];
  dataSource = new MatTableDataSource<any>();
  pageSizeOptions: number[] = [10, 50, 100];
  len = 10;
  pageSize = 10;
  page = 0;

  getRepo() {
    this.isLoading = true;
    this.api.repositories(this.page, this.pageSize+this.len).subscribe((e: any) => {
      this.dataSource.data = e;
      this.isLoading = false;
    });
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.len = event.length
    this.getRepo();
  }

  onClickRow(name: string) {
    this.dialog.open(RowDialogComponent, { data: name });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageIndex = this.page;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (
      data: any,
      sortHeaderId: string
    ): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
      return data[sortHeaderId];
    };
  }

  ngOnInit(): void {
    this.getRepo();
  }
}
