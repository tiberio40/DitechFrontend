import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/core/models/city';
import { Seller } from 'src/core/models/seller';
import { CityService } from 'src/core/services/city.service';
import { SellerService } from 'src/core/services/seller.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  public listOfCities: City[] = [];
  public form: FormGroup;
  public id: string = '';

  get name() { return this.form.get('name'); }
  get lastName() { return this.form.get('lastName'); }
  get document() { return this.form.get('document'); }
  get cityId() { return this.form.get('cityId'); }

  constructor(private _fb: FormBuilder,
    private _sellerService: SellerService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _cityService: CityService) {

    this._cityService.getAll().subscribe({
      next: (response: City[]) => {
        this.listOfCities = response;
      }
    })

    this.form = this._fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      document: ['', Validators.required],
      cityId: ['', Validators.required],
    })

    this._route.params.subscribe(parameters => {
      if(parameters['id']){
        this.id = parameters['id'];
        this.form.addControl('id', new FormControl(parameters['id']));
        this._sellerService.getById(parameters['id']).subscribe({
          next: (response: any) => {

            Object.keys(response).forEach(key => {
              const formControl = this.form.get(key);        
              if (formControl) {
                this.form.controls[key].setValue(response[key]);
              }
            });


          }
        })
      }
    });

  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.invalid){ return }
    if(this.id){
      this._sellerService.edit(this.form.value, this.id).subscribe(
        {
          next: ()=> {
            this._router.navigate(['/vendedores/detalle', this.id], {relativeTo: this._route.parent})
          }
        }
      );
    }else{
      this._sellerService.create(this.form.value).subscribe(
        {
          next: (response: Seller)=> {
            this._router.navigate(['/vendedores/detalle', response.id], {relativeTo: this._route.parent})
          }
        }
      );
    }
  }
}
