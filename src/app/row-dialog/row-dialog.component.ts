import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-row-dialog',
  templateUrl: './row-dialog.component.html',
  styleUrls: ['./row-dialog.component.scss']
})
export class RowDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private api: ApiService
  ) { }
  
  displayedColumns: string[] = ['date', 'header', 'text'];
  dataSource = this.data

  ngOnInit(): void {
    
  }

}
