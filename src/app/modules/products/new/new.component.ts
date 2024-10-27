import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { NgClass, NgIf } from '@angular/common';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, ButtonComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  form!: FormGroup;
  submitted = false;
  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, private service: ProductsService) { }


  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      sellingPrice: ['', Validators.required],
      actualPrice: ['', Validators.required],
      stock: ['', Validators.required],
      categoryId: ['', Validators.required],

    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    console.log('onSUbmit', this.form.invalid)
    if (this.form.invalid) {
      return;
    }
    console.log('entro', this.form.value)
    this.service.createProducts(this.form.value).then(((response: any) => {
      console.log('response', response)
      this._router.navigate(['/home/products']);
      toast.success('Mensaje', {
        description: response.message,
      });
    }))
      .catch(error => {
        toast.error('Mensaje', {
          description: 'No pude crear el producto',
        });
      });
  }
}
