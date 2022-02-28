import { Component, OnInit, ViewChild } from '@angular/core';
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
export class TableComponent implements OnInit {
  constructor(private api: ApiService, private dialog: MatDialog) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading: boolean = false;
  displayedColumns: string[] = ['name', 'lang', 'date', 'bool', 'href'];
  dataSource = new MatTableDataSource<any>();
  pageSizeOptions: number[] = [10, 50, 100];
  pageSize = 10;

  getRepo() {
    this.isLoading = true;
    this.api.repositories(this.pageSize).subscribe((e: any) => {
      this.dataSource.data = e;
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
    });
    this.isLoading = false;
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.getRepo();
  }

  onClickRow(name: string) {
    this.dialog.open(RowDialogComponent, { data: name });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.length = this.pageSize;
  }

  ngOnInit(): void {
    this.getRepo();
  }
}
