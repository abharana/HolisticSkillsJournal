import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  tiles = [
    {text: 'Alice', cols: 4, rows: 2, color: 'lightblue'},
    {text: 'Bob', cols: 1, rows: 5, color: 'lightgreen'},
    {text: 'Charles', cols: 1, rows: 3, color: 'lightpink'},
    {text: 'David', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
