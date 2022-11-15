import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit,AfterViewInit {
  content?: string;
  prdct: any; 
  BiddingList: any = [];
  BiddingListWithoutFilter: any = [];
  BuyerIdFilter = "";
  FirstNameFilter = "";
  LastNameFilter = "";
  PhoneFilter = "";
  EmailFilter = "";
  BidAmountFilter = "";
  ProductList: any = [];
  ModalTitle = "";
  depart: any;
 ProductId = "";
 ProductName = "";
 ShortDescription = "";
 DetailedDescription = "";
 StartingPrice = "";
 BidEndDate = "";
 Category = "";
 selectedGroup: any;
 displayedColumns: string[] = ['FirstName', 'LastName', 'Phone', 'Email','BidAmount'];
 dataSource:any = [];
 @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private userService: UserService) { }
  getVal() {
    console.log(this.selectedGroup); // returns selected object
}
  ngOnInit(): void {this.getAllProducts();
    this.selectedGroup = '';
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getAllProducts()  {
    this.userService.getAllProducts().subscribe(data => {
      this.ProductList=data;});

  }
  resetValues()
  {    
    this.FirstNameFilter="";
    this.LastNameFilter="";
    this.BidAmountFilter="";
    this.PhoneFilter="";
    this.EmailFilter="";
  }
  refreshFetchingBiddingList() {
    //this.getVal();
    this.userService.getShowBidsByProduct(this.selectedGroup).subscribe(data => {
      this.dataSource=data.bidDetails;
      this.BiddingList = data.bidDetails;      
      this.BiddingListWithoutFilter = data.bidDetails;
      this.resetValues();
      this.ProductId=data.productDetails.ProductId;
      this.ProductName=data.productDetails.ProductName;
      this.ShortDescription=data.productDetails.ShortDescription;
      this.DetailedDescription=data.productDetails.DetailedDescription;
      this.BidEndDate=data.productDetails.BidEndDate;
      this.Category=data.productDetails.Category;
      this.StartingPrice=data.productDetails.StartingPrice;
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
