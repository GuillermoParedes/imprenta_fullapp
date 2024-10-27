import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ClientsService } from '../clients.service';
import { toast } from 'ngx-sonner';

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
  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, private service: ClientsService) { }


  ngOnInit(): void {
    this.form = this._formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      cellphone: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    console.log('onSUbmit', this.form.value)
    // this.submitted = true;
    // const { username, password } = this.form.value;
    // // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.service.createClients(this.form.value).then(((response: any) => {
      console.log('response', response)
      this._router.navigate(['/home/clients']);
      toast.success('Mensaje', {
        description: response.message,
      });
    }))
      .catch(error => {
        toast.error('Mensaje', {
          description: 'No pude crear el cliente',
        });
      });
  }
}
