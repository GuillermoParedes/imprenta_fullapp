import { NgClass, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ProductsService } from '../../products/products.service';
import { ClientsService } from '../../clients/clients.service';

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

  clients = signal<any>([]);
  products = signal<any>([]);
  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, private service: ProductsService, private clienteService: ClientsService, private productoService: ProductsService) { }


  ngOnInit(): void {
    this.form = this._formBuilder.group({
      customerId: ['', [Validators.required]],
      dateShipping: ['', [Validators.required]],
      product: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      totalAmount: [{ value: 0, disabled: true }]
      // description: ['', Validators.required],
      // sellingPrice: ['', Validators.required],
      // actualPrice: ['', Validators.required],
      // stock: ['', Validators.required],
      // categoryId: ['', Validators.required],

    });

    this.clienteService.getClients().then((response: any) => {
      console.log('clientsService', response)
      this.clients.set(response)
    })
    this.productoService.getProducts().then((response: any) => {
      console.log('productsservice', response)
      this.products.set(response)
    })

    this.form.get('product')?.valueChanges.subscribe((value) => {
      console.log('El campo product ha cambiado:', value);
      // Aquí puedes realizar las acciones necesarias según el valor del campo
      this.calcularTotalAPagar()
    });

    this.form.get('quantity')?.valueChanges.subscribe((value) => {
      console.log('El campo quantity ha cambiado:', value);
      // Aquí puedes realizar las acciones necesarias según el valor del campo
      this.calcularTotalAPagar()
    });
  }

  get f() {
    return this.form.controls;
  }
  calcularTotalAPagar() {
    const _quantity = this.form.get('quantity')?.value;
    const _product = this.form.get('product')?.value;
    const _productValue = this.products().find((response: any) => response.id == _product)
    const _totalAmount = (_productValue.sellingPrice ?? 0) * (_quantity ?? 0)
    this.form.get('totalAmount')?.setValue(_totalAmount)
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.service.createProducts(this.form.value).then(((response: any) => {
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
