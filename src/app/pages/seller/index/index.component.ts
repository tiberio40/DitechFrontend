import { Component } from '@angular/core';
import { Seller } from 'src/core/models/seller';
import { SellerService } from 'src/core/services/seller.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  public listOfSellers: Seller[] = [];

  constructor(private _sellerService: SellerService){
    this.GetAll();
  }


  GetAll(){
    this._sellerService.getAll().subscribe(
      {
        next: (response: Seller[])=> {
          this.listOfSellers = response
        }
      }
    )
  }

  delete(id: number){
    Swal.fire({
      title: 'Eliminar',
      text: "¿Deseas eliminar la ciudad?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._sellerService.delete(id.toString()).subscribe(
          {
            next: ()=>{
              this.GetAll();
              Swal.fire(
                'Borrado',
                'La ciudad ha sido borrada',
                'success'
              )
            }
          }
        );
       
      }
    })
  }

}
