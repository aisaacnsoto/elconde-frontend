import { Component, ViewChild } from '@angular/core';
import { NgProgressComponent } from 'ngx-progressbar';
import { Router, Event, NavigationStart, NavigationEnd, ChildActivationEnd, NavigationError } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

declare var toastr: any;
declare var $: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	@ViewChild(NgProgressComponent) progressBar: NgProgressComponent;

	constructor(
		private _router: Router,
		private titleService: Title
	) {
		this._router.events.subscribe((event: Event) => {
			if (event instanceof NavigationStart) {
				this.progressBar.start();
				this.collapseSidebar();
			}
			if (event instanceof NavigationEnd) {
				this.progressBar.complete();
				window.scrollTo(0, 0);
			}
			if (event instanceof NavigationError) {
				this.progressBar.complete();
				toastr.error('Por favor recargue la página.', '¡Algo salió mal!');
			}
		});
	}
	
	collapseSidebar() {
		if ($( window ).width() <= 576) {
			$('[data-widget="pushmenu"]').PushMenu('collapse');
		}
	}
}
