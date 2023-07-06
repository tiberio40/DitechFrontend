import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seller } from 'src/core/models/seller';
import { SellerService } from 'src/core/services/seller.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  public seller: Seller | undefined;
  public id: string | undefined;

  constructor(private _sellerService: SellerService,private _route: ActivatedRoute){
    this._route.params.subscribe(parameters => {
      if(parameters['id']){
        this.id = parameters['id'];
        this._sellerService.getById(parameters['id']).subscribe({
          next: (response: Seller)=>{
            this.seller = response;
            console.log(this.seller)
          }
        })
      }
    });

    
  }
}
