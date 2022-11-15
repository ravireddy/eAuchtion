import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://apigateway20221107103510.azurewebsites.net/apigateway/1/';
// const apiSellerUrl = 'https://sellerapi20221106232209.azurewebsites.net/e-auction/api/v1/';
// const apiBuyerUrl = 'https://buyerapi20221106233653.azurewebsites.net/e-auction/api/v1/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  getAllBidsList(): Observable<any[]> {
    //return this.http.get<any[]>(apiBuyerUrl + 'buyer');
    return this.http.get<any[]>(API_URL + 'buyerservice');
  }

  getShowBidsByProduct(productId: number): Observable<any[number]> {
    //console.log('fetch token from local storage:'+this.tokenStorage.getToken())
    //return this.http.get<any[number]>(apiSellerUrl + 'seller/show-bids/'+productId);
    return this.http.get<any[number]>(API_URL + 'sellerservice/show-bids/'+productId);
  }

  getAllProducts(): Observable<any[]> {
    //return this.http.get<any[]>(apiSellerUrl + 'seller/GetProducts');
    return this.http.get<any[]>(API_URL + 'sellerservice/GetProducts');
  } 
}