import { Directive, ElementRef, OnInit } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

@Directive({
	selector: '[focusOnShow]'
})
export class FocusOnShowDirective implements OnInit {

	constructor(private el: ElementRef) {
		if (!el.nativeElement['focus']) {
			throw new Error('Element does not accept focus :\'v');
		}
	}

	ngOnInit(): void {
		const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
		input.focus();
		// input.select();
	}
}