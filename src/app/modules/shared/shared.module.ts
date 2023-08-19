import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDefaultValueDirective } from 'src/app/directives/select-default-value.directive';
import { FocusOnShowDirective } from 'src/app/directives/focus-on-show.directive';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		SelectDefaultValueDirective,
		FocusOnShowDirective,
	],
	exports: [
		SelectDefaultValueDirective,
		FocusOnShowDirective,
		HttpClientModule,
		FormsModule
	],
	imports: [
		CommonModule
	]
})
export class SharedModule { }
