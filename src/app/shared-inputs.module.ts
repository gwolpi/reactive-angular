import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CurrencyConversionModule} from "./currency-conversion.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";

const modules= [CommonModule, CurrencyConversionModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatRadioModule];

@NgModule({
	imports: modules,
	exports: modules
})
export class SharedInputsModule {}
