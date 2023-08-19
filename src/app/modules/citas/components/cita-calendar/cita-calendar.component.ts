import { Component, OnInit, NgZone, ViewChild } from '@angular/core';

import { FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import { CalendarOptions } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import { Draggable } from '@fullcalendar/interaction';
import { CitaService } from 'src/app/services/cita.service';

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin
import listPlugin from '@fullcalendar/list'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from '@fullcalendar/bootstrap';

import * as moment from 'moment';
import { Cita } from 'src/app/models/cita';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProductoServicioResolveGuard } from 'src/app/guards/producto-servicio-resolve.guard';
declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-cita-calendar',
	templateUrl: './cita-calendar.component.html',
	styleUrls: ['./cita-calendar.component.css'],
	providers: [ CitaService, UsuarioService ]
})
export class CitaCalendarComponent implements OnInit {

	public loading: boolean = false;
	public miEvento;
	public citas: any[] = [];
	public cita: Cita;
	public updating: boolean = false;
	public atentidoRestriction: boolean = false;
	@ViewChild('calendar') calendarComponent: FullCalendarComponent;

	calendarOptions: CalendarOptions = {
		plugins: [
			dayGridPlugin,
			timeGridPlugin,
			listPlugin,
			interactionPlugin,
			bootstrapPlugin,
		],
		initialView: 'dayGridMonth',
		navLinks: true,
		customButtons: {
			mPrevYear: {
				text: 'back year',
				click: (mouseEv, htmlEl) => {
					this.loading = true;
					let misCitas = [
						{
							id: 4123,
							title: 'mi cita 1',
							start: '2020-09-01'
						},
						{
							id: 4141,
							title: 'mi cita 2',
							start: '2020-09-02'
						}
					];
					// this.calendarComponent.getApi().prev();
					
					// this.calendarOptions.eventSources.push(misCitas);
					misCitas.forEach(item => {
						// this.citas.push(item);
						this.calendarComponent.getApi().addEvent({
							title: item.title,
							start: item.start
						});
					});
					// console.log('citas', this.citas);
					// this.citas.push(misCitas);

					// this.calendarOptions.events = this.citas;
					// setTimeout(() => {
					// 	let date = this.calendarComponent.getApi().getDate();
					// 	let fecha = 'atrás '+date.toISOString();
					// 	// alert(fecha);
					// 	console.log(fecha, this.hasEvents(date) ? 'tiene eventos' : 'no tiene eventos');
					// }, 1000);
				}
			}
		},
		headerToolbar: {
			left: 'dayGridMonth,timeGridWeek,timeGridDay,listDay',
			center: 'title',
			right: 'today prevYear,prev,next,nextYear'
		},
		themeSystem: 'bootstrap',
		locale: esLocale,
		events: [],
		nowIndicator: true,
		selectable: true,
		firstDay: 0,
		editable: true,
		slotDuration: { minutes: 15 },
		scrollTime: '10:00:00',
		dayMaxEventRows: true,
		eventDisplay: 'block',
		eventMouseEnter: (info) => { info.el.style.cursor = 'pointer'; },
		dateClick: this.onDateClick.bind(this),
		eventClick: this.onEventClick.bind(this),
		eventResize: this.onEventDropResize.bind(this),
		eventDrop: this.onEventDropResize.bind(this),
		eventAllow: (dropInfo, draggedEvent) => {
			
			let currentUser = <Usuario>this._usuarioService.getStorage();
			if (currentUser != null && currentUser.rol == 1) return true;
			
			// Comprobar si la fecha está después
			let dropDate = moment(dropInfo.startStr).format('YYYY-MM-DD');
			let today = moment().format('YYYY-MM-DD');
			// let eventDate = moment(draggedEvent.startStr).format('YYYY-MM-DD');
			let isAfter = moment(dropDate).isSameOrAfter(today);

			if (isAfter) {
				
				let estado = draggedEvent.extendedProps['cita'].estado;
				if (estado == 'PENDIENTE') {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	};

	onEventClick(arg) {
		this.cita = arg.event.extendedProps.cita;

		this._router.navigate(['/citas/detalle/'+this.cita.id]);
	}

	onEventDropResize(arg) {

		let citaId = arg.event.extendedProps.cita.id;
		let start = moment(arg.event.startStr).format('YYYY-MM-DD HH:mm:ss');
		let end = moment(arg.event.endStr).format('YYYY-MM-DD HH:mm:ss');

		this.reprogramar(citaId, start, end);
	}

	onDateClick(arg) {
		let fecha = moment(arg.date).format('YYYY-MM-DD');
		let hora = moment(arg.date).format('HH:mm:ss');
		let return_to = 'citas';
		
		if (arg.view.type == 'dayGridMonth') { hora = null; }

		let currentUser = <Usuario>this._usuarioService.getStorage();
		if (currentUser != null && currentUser.rol == 1) {
			this.goToCreate(fecha, hora, return_to);
			return;
		}

		// Comprobar si la fecha está después
		let dropDate = moment(arg.dateStr).format('YYYY-MM-DD');
		let today = moment().format('YYYY-MM-DD');
		// let eventDate = moment(draggedEvent.startStr).format('YYYY-MM-DD');
		let isAfter = moment(dropDate).isSameOrAfter(today);

		if (isAfter) {
			this.goToCreate(fecha, hora, return_to);
		}

	}

	goToCreate(date: string, time: string, returnTo: string) {
		let params;
		if (time != null && time.length > 0) {
			params = {
				fecha: date,
				hora: time,
				return_to: returnTo
			};
		} else {
			params = {
				fecha: date,
				return_to: returnTo
			};
		}
		this._ngZone.run( () => {
			this._router.navigate([ '/citas/reservar' ], { queryParams: params });
		} );
	}

	constructor(
		private _usuarioService: UsuarioService,
		private _citaService: CitaService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _ngZone: NgZone
	) {
		this.miEvento = {
			nombre: '',
			ready: false
		}
	}

	ngOnInit(): void {

		this._route.data.subscribe(data => {
			if (data['citas'] != undefined) {
				let citasTmp = data['citas'];
				citasTmp.forEach(item => {
					let dateStart = moment(item.fecha + ' ' + item.hora, 'YYYY-MM-DD HH:mm:ss');
					let dateEnd = moment(item.fecha + ' ' + item.hora_termino, 'YYYY-MM-DD HH:mm:ss');

					let color = '';
					if (item.estado == 'PENDIENTE') {
						color = '#dc3545';
					} else if (item.estado == 'EN PROCESO') {
						color = '#ffc107';
					} else if (item.estado == 'ATENDIDO') {
						color = '#28a745';
					}
					// console.log('cliente', item.cliente);
					let cita = {
						id: item.id,
						title: item.cliente,
						start: dateStart.toISOString(),
						end: dateEnd.toISOString(),
						extendedProps: {
							cita: item
						},
						backgroundColor: color,
						borderColor: color
					};
					this.citas.push(cita);
				});
			}
			this.calendarOptions.events = this.citas;
		});
	}

	reprogramar(id, from, to) {
		toastr.remove();
		toastr.info('Por favor, espere...', 'Actualizando', { positionClass: 'toast-bottom-center' });

		this._citaService.reprogram(id, from, to).subscribe(
			res => {
				// console.log(res);
				toastr.remove();
				toastr.success('¡Se actualizó la cita correctamente!', 'Éxito', { positionClass: 'toast-bottom-center' });

				// Actualizar la cita en el calendario
				let eventObject = this.calendarComponent.getApi().getEventById(res.id);
				eventObject.setExtendedProp('cita', res);
				// console.log('updated cita calendar', eventObject.extendedProps.cita);
			},
			err => {
				console.log(err);
				toastr.remove();
				toastr.error('¡No se pudo actualizar la cita!', 'Error', { positionClass: 'toast-bottom-center' });
			}
		);
	}

	hasEvents(date: Date): boolean {
		let events = this.calendarComponent.getApi().getEvents()

		let filteredEvents = events.filter(ev => ev.start.getMonth() == date.getMonth());

		return filteredEvents.length > 0;
	}

}
