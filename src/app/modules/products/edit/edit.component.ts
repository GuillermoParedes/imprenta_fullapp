import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { toast } from 'ngx-sonner';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, ButtonComponent, BreadcrumbComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  form!: FormGroup;
  submitted = false;
  productId: any = null;
  breadcrumbItems = [
    { label: 'Inicio', url: '/home/dashboard' },
    { label: 'Lista de productos', url: '/home/products' },
    { label: 'Detalle' }
  ];
  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private service: ProductsService) { }


  ngOnInit(): void {
    this.productId = this._route.snapshot.paramMap.get('id');

    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      sellingPrice: ['', Validators.required],
      actualPrice: ['', Validators.required],
      stock: ['', Validators.required],
      categoryId: ['', Validators.required],

    });
    if (this.productId) {
      this.cargarProducto(this.productId)
    }
  }

  cargarProducto(id: string) {
    console.log('cargarProducto', id)
    this.service.findProduct(id).then((response: any) => {
      this.form.patchValue({
        name: response.name,
        description: response.description,
        sellingPrice: response.sellingPrice,
        actualPrice: response.actualPrice,
        stock: response.stock,
        categoryId: response.categoryId,
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
    this.service.updateProduct(this.productId, this.form.value).then(((response: any) => {
      this._router.navigate(['/home/products']);
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
  eliminarProducto() {
    this.service.deleteProduct(this.productId).then((response: any) => {
      toast.success('Mensaje', {
        description: response.message,
      });
      this._router.navigate(['/home/products']);
    }).catch(error => {
      toast.error('Mensaje', {
        description: 'No pude editar el producto',
      });
    });
  }
}
