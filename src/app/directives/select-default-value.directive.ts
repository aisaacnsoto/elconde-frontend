import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
	selector: '[selectDefaultValue]',
	providers: [{
		provide: NG_VALIDATORS,
		useExisting: SelectDefaultValueDirective,
		multi: true
	}]
})
export class SelectDefaultValueDirective implements Validator {
	@Input('selectDefaultValue') defaultValue: string;

	validate(control: AbstractControl): ValidationErrors {
		return control.value == this.defaultValue ? { 'defaultSelected': true } : null;
	}
}