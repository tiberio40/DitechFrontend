import { Component } from '@angular/core';
import { CityService } from 'src/core/services/city.service';
import { City } from 'src/core/models/city';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  public listOfCities: City[] = [];

  constructor(private _cityService: CityService){
    this.GetAll();

  }

  GetAll(){
    this._cityService.getAll().subscribe({
      next: (response: City[])=> {
        this.listOfCities = response;
      }
    })
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
        this._cityService.delete(id.toString()).subscribe(
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
        )
       
      }
    })
  }
}
