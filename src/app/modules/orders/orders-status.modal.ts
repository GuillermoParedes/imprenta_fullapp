import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-modal',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-lg font-semibold mb-4">Cambiar Estado</h2>
        
        <p class="mb-4">
          Estado actual: 
          <span class="px-3 py-1 rounded-full text-xs font-semibold border"
                [ngClass]="statusClass(currentStatus)">
            {{ currentStatus }}
          </span>
        </p>

        <div *ngIf="canChangeStatus()" class="space-y-2">
          <button *ngIf="currentStatus === 'PENDIENTE'"
                  class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  (click)="changeStatus('ENTREGADO')">
            Marcar como ENTREGADO
          </button>
            <button *ngIf="currentStatus === 'PENDIENTE'"
                  class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  (click)="changeStatus('CANCELADO')">
            Marcar como CANCELADO
          </button>
        </div>

        <div class="flex justify-between mt-4">
          <button *ngIf="currentStatus === 'PENDIENTE'" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  (click)="goToDetail()">
            Ver Detalle
          </button>

          <button class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  (click)="closeModal()">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  `
})
export class OrderStatusModal {
  @Input() currentStatus!: string;
  @Input() recordId!: string; // ID del registro para redirigir al detalle
  @Output() statusChanged = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) { }

  // Mapea estados a colores de Tailwind
  statusClass(status: string): string {
    const statusColors: { [key: string]: string } = {
      PENDIENTE: 'bg-yellow-100 text-yellow-800 border-yellow-400',
      CANCELADO: 'bg-red-100 text-red-800 border-red-400',
      ENTREGADO: 'bg-green-100 text-green-800 border-green-400',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-400';
  }

  // Determina si el estado se puede cambiar
  canChangeStatus(): boolean {
    return this.currentStatus === 'PENDIENTE';
  }

  // Cambia el estado
  changeStatus(newStatus: string) {
    this.statusChanged.emit(newStatus);
  }

  // Redirigir al detalle
  goToDetail() {

    this.router.navigate([`home/orders/${this.recordId}/edit`])
  }

  // Cerrar modal
  closeModal() {
    this.close.emit();
  }
}
