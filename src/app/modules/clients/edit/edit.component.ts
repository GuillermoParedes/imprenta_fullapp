import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ClientsService } from '../clients.service';
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
  clientId: any = null;
  breadcrumbItems = [
    { label: 'Inicio', url: '/home/dashboard' },
    { label: 'Lista de clientes', url: '/home/clients' },
    { label: 'Detalle' }
  ];
  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private service: ClientsService) { }


  ngOnInit(): void {
    this.clientId = this._route.snapshot.paramMap.get('id');

    this.form = this._formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      cellphone: ['', Validators.required],
      type: ['', Validators.required],
    });
    if (this.clientId) {
      this.cargarCliente(this.clientId)
    }
  }

  cargarCliente(id: string) {
    console.log('cargarCliente', id)
    this.service.findClient(id).then((response: any) => {
      this.form.patchValue({
        first_name: response.first_name,
        last_name: response.last_name,
        address: response.address,
        cellphone: response.cellphone,
        type: response.type,
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
    this.service.updateClient(this.clientId, this.form.value).then(((response: any) => {
      this._router.navigate(['/home/clients']);
      toast.success('Mensaje', {
        description: response.message,
      });
    }))
      .catch(error => {
        toast.error('Mensaje', {
          description: 'No pude editar el cliente',
        });
      });
  }
  eliminarCliente() {
    this.service.deleteClient(this.clientId).then((response: any) => {
      toast.success('Mensaje', {
        description: response.message,
      });
      this._router.navigate(['/home/clients']);
    }).catch(error => {
      toast.error('Mensaje', {
        description: 'No pude editar el cliente',
      });
    });
  }
}
