import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ProductsService } from '../../products/products.service';
import { ClientsService } from '../../clients/clients.service';
import { OrdersService } from '../orders.service';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, JsonPipe, NgIf, NgClass, ButtonComponent],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  form!: FormGroup;
  submitted = false;

  clients = signal<any>([]);
  products = signal<any>([]);
  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, private service: OrdersService, private clienteService: ClientsService, private productoService: ProductsService) { }


  ngOnInit(): void {
    this.form = this._formBuilder.group({
      customerId: ['', [Validators.required]],
      dateShipping: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      totalAmount: [{ value: 0, disabled: true }]
    });

    this.clienteService.getClients().then((response: any) => {
      this.clients.set(response)
    })
    this.productoService.getProducts().then((response: any) => {
      this.products.set(response)
    })

    this.form.get('productId')?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value) => {
      console.log('El campo product ha cambiado:', value);
      this.actualizarMaxStock();
      this.calcularTotalAPagar()
    });
    this.form.get('quantity')?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value) => {
      this.calcularTotalAPagar()
    });
  }

  get f() {
    return this.form.controls;
  }

  actualizarMaxStock() {
    const _product = this.form.get('productId')?.value;
    console.log('product', _product)
    const stockDisponible = this.obtenerStockDelProductoSeleccionado();
    console.log('stock', stockDisponible)
    if (stockDisponible < 1) return; // No actualizar si no hay stock válido
    this.form.get('quantity')?.setValidators([
      Validators.required,
      Validators.min(0),
      Validators.max(stockDisponible) // Se asegura que no exceda el stock disponible
    ]);
    this.form.get('quantity')?.updateValueAndValidity();
  }
  obtenerStockDelProductoSeleccionado(): number {
    const selectedProduct = this.products().find((p: any) => p.id === this.form.get('productId')?.value);
    return selectedProduct && selectedProduct.stock > 0 ? selectedProduct.stock : 1; // Evita valores 0 o negativos
  }
  calcularTotalAPagar() {
    const _quantity = this.form.get('quantity')?.value;
    const _product = this.form.get('productId')?.value;
    const _productValue = this.products().find((response: any) => response.id == _product)
    const _totalAmount = (_productValue.sellingPrice ?? 0) * (_quantity ?? 0)
    this.form.get('totalAmount')?.setValue(_totalAmount)
    this.form.get('quantity')?.updateValueAndValidity();
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.form.get('totalAmount')?.enable();
    this.service.createPedidos({
      ...this.form.value,
    }).then(((response: any) => {
      this._router.navigate(['/home/orders']);
      toast.success('Mensaje', {
        description: response.message,
      });
    }))
      .catch(error => {
        toast.error('Mensaje', {
          description: 'No pude crear el producto',
        });
      })
      .finally(() => {
        // Vuelve a deshabilitar `totalAmount` después de enviar el formulario
        this.form.get('totalAmount')?.disable();
      });;
  }
}
