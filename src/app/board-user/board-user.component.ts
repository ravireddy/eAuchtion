import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  BiddingList: any = [];  
  BiddingListWithoutFilter: any = [];
  BuyerIdFilter = "";
  FirstNameFilter = "";
  LastNameFilter = "";
  PhoneFilter = "";
  EmailFilter = "";
  BidAmountFilter = "";
  ModalTitle = "";
  depart: any;
  
 displayedColumns: string[] = ['FirstName', 'LastName', 'Phone', 'Email','BidAmount'];
 dataSource:any = [];
 @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllBidsList()
    .subscribe({
      next: data => {
        this.dataSource=data;
        this.BiddingList=data;
        this.BiddingListWithoutFilter = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }
  
  sortResult(prop: any, asc: any) {
    this.BiddingList = this.BiddingListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      }
      else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    });
  }

  FilterFn() {
    var BuyerIdFilter = this.BuyerIdFilter;
    var FirstNameFilter = this.FirstNameFilter;
    var LastNameFilter = this.LastNameFilter;
    var PhoneFilter = this.PhoneFilter;
    var EmailFilter = this.EmailFilter;
    var BidAmountFilter = this.BidAmountFilter;

    this.BiddingList = this.BiddingListWithoutFilter.filter(
      function (el: any) {
        return el.BuyerId.toString().toLowerCase().includes(
          BuyerIdFilter.toString().trim().toLowerCase()
        ) &&
          el.FirstName.toString().toLowerCase().includes(
            FirstNameFilter.toString().trim().toLowerCase())
            &&
          el.LastName.toString().toLowerCase().includes(
            LastNameFilter.toString().trim().toLowerCase())
            &&
          el.Phone.toString().toLowerCase().includes(
            PhoneFilter.toString().trim().toLowerCase())
            &&
          el.Email.toString().toLowerCase().includes(
            EmailFilter.toString().trim().toLowerCase())
            &&
          el.BidAmount.toString().toLowerCase().includes(
            BidAmountFilter.toString().trim().toLowerCase())
      }
    );
  } 
}
