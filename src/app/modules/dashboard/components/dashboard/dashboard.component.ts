import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';
import { Chart } from 'chart.js';
// import 'chartjs-plugin-labels';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

declare var $: any;
declare var toastr: any;

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	public fecha;
	public reloading: boolean = false;
	public dateString
	public ventasDia;
	public aperturaCaja;
	public cierreCaja;
	public gastosDia;
	public servicios;
	public clientesFrecuentes;
	public productosMasVendidos;
	public productividad;
	public rentabilidad;
	public fechaActualizacion;

	public colores = [ '#f44336', '#ff9800', '#fdd835', '#9ccc65', '#1de9b6', '#00bcd4', '#1976d2', '#9c27b0', '#795548', '#424242' ];
	public coloresBarberos = [ '#f44336', '#fdd835', '#1de9b6', '#1976d2', '#795548' ];

	public clientesFrecuentesChart;
	public productividadChart;
	public productividadBarberosChart;
	public productosMasVendidosChart;

	constructor(
		private _route: ActivatedRoute,
		private _dashboardService: DashboardService
	) { }

	ngOnInit(): void {
		this._route.data.subscribe(data => {
			this.setData(data['dashboard']);
		});
		this.fecha = moment().format('YYYY-MM-DD');
		this.dateString = moment().locale('es').format('LLLL');
	}

	setData(data = null) {
		this.ventasDia 	  = (data != null) ? data.ventas_del_dia : 0;
		this.aperturaCaja = (data != null) ? data.apertura_caja : 0;
		this.cierreCaja = (data != null) ? data.cierre_caja : 0;
		this.gastosDia = (data != null) ? data.gastos_del_dia : 0;
		this.servicios = (data != null) ? data.servicios : [];
		this.clientesFrecuentes = (data != null) ? data.clientes_frecuentes : [];
		this.productosMasVendidos = (data != null) ? data.productos_mas_vendidos : [];
		this.productividad = (data != null) ? data.servicios_semana : [];
		this.rentabilidad = (data != null) ? data.estadisticas_mes : [];
		this.fechaActualizacion = new Date();

		this.loadGraphics();
	}

	onChange() { this.reloadData(); }

	reloadData() {
		this.reloading = true;
		
		this._dashboardService.admin(this.fecha).subscribe(
			res => {
				this.reloading = false;
				this.dateString = moment(this.fecha).locale('es').format('LLLL');
				this.setData(res);
			},
			err => {
				console.log(err);
				this.reloading = false;
				toastr.error('No se pudo cargar la información. Intenta nuevamente.');
			}
		)
	}

	loadGraphics() {
		this.loadClientesFrecuentes();
		this.loadProductividad();
		this.loadProductividadBarberos();
		this.loadProductosVendidos();
	}

	loadClientesFrecuentes() {

		let nombresClientes = [];
		let citasAtendidas = [];

		this.clientesFrecuentes.forEach(item => {
			nombresClientes.push(item.nombres);
			citasAtendidas.push(item.citas);
		});

		let mode      = 'index';
		let intersect = true;

		if (this.clientesFrecuentesChart != null) {
			this.clientesFrecuentesChart.destroy();
		}
	
		let ctx = $('#sales-chart');
		this.clientesFrecuentesChart  = new Chart(ctx, {
			type   : 'bar',
			data   : {
				labels  : nombresClientes,
				datasets: [
					{
						backgroundColor: '#007bff',
						borderColor    : '#007bff',
						data           : citasAtendidas
					}
				]
			},
			options: {
				maintainAspectRatio: false,
				tooltips           : {
					mode     : mode,
					intersect: intersect
				},
				hover              : {
					mode     : mode,
					intersect: intersect
				},
				legend             : {
					display: false
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							precision: 0
						}
					}]
				}
			}
		});
	}

	loadProductividad() {
		
		let dataRent = [];
		let rentLabels = [];

		this.rentabilidad.forEach(item => {
			rentLabels.push(item.item);
			dataRent.push(item.cantidad);
		});

		if (this.productividadChart != null) {
			this.productividadChart.destroy();
		}

		let ctx = $('#visitors-chart');
		this.productividadChart = new Chart(ctx, {
			type: 'pie',
			data   : {
				labels: rentLabels,
				datasets: [
					{
						data: dataRent,
						backgroundColor : this.colores,
					},
				]
			},
			options: {
				maintainAspectRatio : false,
				responsive : true,
				legend : {
					display: true,
					position: 'right',
					align: 'start'
				}
			}
		});
	}

	loadProductividadBarberos() {
		
		let ticksStyle = {
			fontColor: '#495057',
			fontStyle: 'bold'
		};
	
		let dataSets = [];

		this.productividad.forEach((item, index) => {
			dataSets.push({
				label				: item.barbero,
				type                : 'line',
				data                : item.servicios,
				backgroundColor     : 'transparent',
				borderColor         : this.coloresBarberos[index],
				pointBorderColor    : this.coloresBarberos[index],
				pointBackgroundColor: this.coloresBarberos[index],
				fill                : false
			});
		});

		if (this.productividadBarberosChart != null) {
			this.productividadBarberosChart.destroy();
		}

		let ctx = $('#productividad');
		this.productividadBarberosChart  = new Chart(ctx, {
			data   : {
				labels  : ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'],
				datasets: dataSets
			},
			options: {
				maintainAspectRatio: false,
				hoverMode: 'index',
				stacked: false,
				scales             : {
					yAxes: [{
						display: true,
						gridLines: {
							display      : true
						},
						ticks    : $.extend({
							beginAtZero : true,
							precision: 0
							// suggestedMax: 200
						}, ticksStyle)
					}],
					xAxes: [{
						display  : true,
						gridLines: {
							display: true
						},
						ticks    : ticksStyle
					}]
				}
			}
		});
	}

	loadProductosVendidos() {
		let productosNombres = [];
		let productosVentas = [];

		this.productosMasVendidos.forEach(item => {
			productosNombres.push(item.nombre);
			productosVentas.push(item.ventas);
		});

		let donutChartCanvas = $('#donutChart').get(0).getContext('2d');
		let donutData        = {
			labels: productosNombres,
			datasets: [
				{
					data: productosVentas,
					backgroundColor : this.colores,
				}
			]
		};
		let donutOptions     = {
			maintainAspectRatio : false,
			responsive : true,
			legend : {
				display: true,
				position: 'right',
				align: 'start'
			}
		};

		if (this.productosMasVendidosChart != null) {
			this.productosMasVendidosChart.destroy();
		}

		this.productosMasVendidosChart = new Chart(donutChartCanvas, {
			type: 'doughnut',
			data: donutData,
			options: donutOptions
		});
	}

}
