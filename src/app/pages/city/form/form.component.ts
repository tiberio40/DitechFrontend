import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/core/models/city';
import { CityService } from 'src/core/services/city.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  public form: FormGroup;
  public id: string = '';

  get description() { return this.form.get('description'); }
  
  constructor(private _fb: FormBuilder, private _cityService: CityService, private _router: Router, private _route: ActivatedRoute){
    this.form = this._fb.group({
      description: ['', Validators.required]
    })

    this._route.params.subscribe(parameters => {
      if(parameters['id']){
        this.id = parameters['id'];
        this.form.addControl('id', new FormControl(parameters['id']));
        this._cityService.getById(parameters['id']).subscribe({
          next: (response: City) => {
            this.form.controls['description'].setValue(response.description);
          }
        })
      }
    });
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.invalid){ return }
    if(this.id){
      this._cityService.edit(this.form.value, this.id).subscribe(
        {
          next: ()=> {
            this._router.navigate(['/ciudades'], {relativeTo: this._route.parent})
          }
        }
      );
    }else{
      this._cityService.create(this.form.value).subscribe(
        {
          next: ()=> {
            this._router.navigate(['/ciudades'], {relativeTo: this._route.parent})
          }
        }
      );
    }
  }
}
