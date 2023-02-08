import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-err',
  templateUrl: './err.component.html',
})
export class ErrComponent implements OnInit {
  msg!:any
  constructor() { }

  ngOnInit() {
    this.msg=sessionStorage.getItem('msg')
  }

}
