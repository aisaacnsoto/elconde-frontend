import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromocionService } from 'src/app/services/promocion.service';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-promociones',
	templateUrl: './promociones.component.html',
	styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {

	public promoRecom;
	public promoVip;
	public promoCumple;
	public promoTraba;
	RECOM_CARD: string = 'recomendaciones';
	VIP_CARD: string = 'clientes-vip';
	CUMPLE_CARD: string = 'cumpleanios';
	TRABA_CARD: string = 'trabajadores';
	TRABA_CLI_CARD: string = 'traba-cli';
	activatedCard: string;

	constructor(
		private _route: ActivatedRoute,
		private _promocionService: PromocionService
	) { }

	ngOnInit(): void {
		this._route.data.subscribe(data => {
			if (data['promociones'] != null) {
				let promociones = data['promociones'];
				this.promoRecom = promociones.recomendaciones;
				this.promoVip = promociones.clientes_vip;
				this.promoCumple = promociones.cumpleanios;
				this.promoTraba = promociones.trabajadores;
			}
		});
	}

	onSubmitRecom() {
		// console.log(this.promoRecom);
		// return;
		let id = 'buttonRecom';
		this.showProcessingIndicator(id);
		this._promocionService.updatePromoRecom(this.promoRecom).subscribe(
			res => {
				console.log(res);
				toastr.success('¡Actualizado correctamente!')
				this.showProcessingIndicator(id, false);
			},
			err => {
				console.log(err);
				this.showProcessingIndicator(id, false);
			}
		);
	}
	
	onSubmitVIP() {
		let id = 'buttonVip';
		this.showProcessingIndicator(id);
		this._promocionService.updatePromoVip(this.promoVip).subscribe(
			res => {
				console.log(res);
				toastr.success('¡Actualizado correctamente!')
				this.showProcessingIndicator(id, false);
			},
			err => {
				console.log(err);
				this.showProcessingIndicator(id, false);
			}
		);
	}
	
	onSubmitCumple() {
		let id = 'buttonCumple';
		this.showProcessingIndicator(id);
		this._promocionService.updateCumpleanios(this.promoCumple).subscribe(
			res => {
				console.log(res);
				toastr.success('¡Actualizado correctamente!')
				this.showProcessingIndicator(id, false);
			},
			err => {
				console.log(err);
				this.showProcessingIndicator(id, false);
			}
		);
	}
	
	onSubmitTraba() {
		let id = 'buttonTraba';
		this.showProcessingIndicator(id);
		this._promocionService.updateTrabajadores(this.promoTraba).subscribe(
			res => {
				console.log(res);
				toastr.success('¡Actualizado correctamente!')
				this.showProcessingIndicator(id, false);
			},
			err => {
				console.log(err);
				this.showProcessingIndicator(id, false);
			}
		);
	}

	showProcessingIndicator(id: string, processing: boolean = true) {
		let defaultTemplate = `
			<i class="fas fa-check mr-1"></i>
			Guardar
		`;
		
		let loadingTemplate = `
			<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
			Guardando
		`;

		if (processing) {
			this.setButtonTemplate(id, loadingTemplate, true);
		} else {
			this.setButtonTemplate(id, defaultTemplate, false);
		}
	}

	setButtonTemplate(id: string, template: string, disabled: boolean) {
		let buttonRegister = <HTMLButtonElement>document.getElementById(id);
		buttonRegister.innerHTML = template;
		buttonRegister.disabled = disabled;
	}

	addServiceRecom() {
		$('#modal-buscar-servicio').modal('show');
		this.activatedCard = this.RECOM_CARD;
	}
	
	addServiceVip() {
		$('#modal-buscar-servicio').modal('show');
		this.activatedCard = this.VIP_CARD;
	}
	
	addServiceCumple() {
		$('#modal-buscar-servicio').modal('show');
		this.activatedCard = this.CUMPLE_CARD;
	}

	addClienteTraba() {
		$('#modal-buscar-cliente').modal('show');
		this.activatedCard = this.TRABA_CARD;
	}
	
	addServiceTraba() {
		$('#modal-buscar-servicio').modal('show');
		this.activatedCard = this.TRABA_CARD;
	}

	buscarServicio(event) {
		if (this.activatedCard == this.RECOM_CARD) {
			this.promoRecom.servicios.push({
				servicio: {
					id: event.id,
					nombre: event.nombre
				},
				descuento: 0
			});
		} else if (this.activatedCard == this.VIP_CARD) {
			this.promoVip.servicios.push({
				servicio: {
					id: event.id,
					nombre: event.nombre
				},
				descuento: 0
			});
		} else if (this.activatedCard == this.CUMPLE_CARD) {
			this.promoCumple.servicios.push({
				servicio: {
					id: event.id,
					nombre: event.nombre
				},
				descuento: 0
			});
		} else if (this.activatedCard == this.TRABA_CARD) {
			this.promoTraba.servicios.push({
				servicio: {
					id: event.id,
					nombre: event.nombre
				},
				descuento: 0
			});
		}
		
		$('#modal-buscar-servicio').modal('hide');
	}

	buscarCliente(event) {
		if (this.activatedCard == this.TRABA_CARD) {
			this.promoTraba.clientes.push({
				cliente: {
					id: event.id,
					nombres: event.nombres,
					apellidos: event.apellidos
				}
			});
		}
		
		$('#modal-buscar-cliente').modal('hide');
	}

	onRemoveDetalle(index, activated) {

		switch (activated) {
			case 'recomendados':
				this.promoRecom.servicios.splice(index, 1);
				break;
			case 'vip':
				this.promoVip.servicios.splice(index, 1);
				break;
			case 'cumpleanios':
				this.promoCumple.servicios.splice(index, 1);
				break;
			case 'trabajadores':
				this.promoTraba.servicios.splice(index, 1);
				break;
			case 'traba-cliente':
				this.promoTraba.clientes.splice(index, 1);
				break;
		}
	}


}
