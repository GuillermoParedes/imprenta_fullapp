import { NgClass, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { toast } from 'ngx-sonner';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { ClientsService } from '../../clients/clients.service';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-edit',
  standalone: true,
   imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, ButtonComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
form!: FormGroup;
  submitted = false;
  pedidoId: any = null;
  clients = signal<any>([]);
  products = signal<any>([]);
  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private service: OrdersService,
    private clienteService: ClientsService, 
    private productoService: ProductsService) { }


  ngOnInit(): void {
    this.pedidoId = this._route.snapshot.paramMap.get('id');

    this.form = this._formBuilder.group({
      customerId: ['', [Validators.required]],
      dateShipping: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      totalAmount: [{ value: 0, disabled: true }]

    });
    this.clienteService.getClients().then((response: any) => {
      console.log('clientsService', response)
      this.clients.set(response)
    })
    this.productoService.getProducts().then((response: any) => {
      console.log('productsservice', response)
      this.products.set(response)
    })
    this.form.get('productId')?.valueChanges.subscribe((value) => {
      console.log('El campo product ha cambiado:', value);
      // Aquí puedes realizar las acciones necesarias según el valor del campo
      this.calcularTotalAPagar()
    });

    this.form.get('quantity')?.valueChanges.subscribe((value) => {
      console.log('El campo quantity ha cambiado:', value);
      // Aquí puedes realizar las acciones necesarias según el valor del campo
      this.calcularTotalAPagar()
    });

    if (this.pedidoId) {
      this.cargarPedido(this.pedidoId)
    }
  }

  cargarPedido(id: string) {
    console.log('cargarPedido', id)
    this.service.findPedido(id).then((response: any) => {
      this.form.patchValue({
        customerId: response.customerId,
        dateShipping: response.dateShipping,
        productId: response.productId,
        quantity: response.quantity,
        totalAmount: response.totalAmount
      })
    })
  }

  get f() {
    return this.form.controls;
  }


  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.service.updatePedido(this.pedidoId, this.form.value).then(((response: any) => {
      this._router.navigate(['/home/orders']);
      toast.success('Mensaje', {
        description: response.message,
      });
    }))
      .catch(error => {
        toast.error('Mensaje', {
          description: 'No pude editar el producto',
        });
      });
  }
  eliminarPedido() {
    this.service.deletePedido(this.pedidoId).then((response: any) => {
      toast.success('Mensaje', {
        description: response.message,
      });
      this._router.navigate(['/home/orders']);
    }).catch(error => {
      toast.error('Mensaje', {
        description: 'No pude editar el producto',
      });
    });
  }

  calcularTotalAPagar() {
    const _quantity = this.form.get('quantity')?.value;
    const _product = this.form.get('productId')?.value;
    const _productValue = this.products().find((response: any) => response.id == _product)
    const _totalAmount = (_productValue.sellingPrice ?? 0) * (_quantity ?? 0)
    this.form.get('totalAmount')?.setValue(_totalAmount)
  }
}
