import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {SharedInputsModule} from "./shared-inputs.module";
import {CurrencyConversionService} from "./currency-conversion.service";
import {Currency} from './currency';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedInputsModule],
  templateUrl: './imperative-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImperativeAppComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly currencyConversionService = inject(CurrencyConversionService);
  readonly currencies = Currency.currencies;
  readonly form = {
    currency: '',
    amount: 0,
  }
  currencySymbol = '?';
  currencyRate = 1;
  costInEur = 0;

  updateCurrency(currencyCode: string) {
    this.form.currency = currencyCode;
    this.currencySymbol = Currency.getSymbol(currencyCode);
    this.changeDetectorRef.markForCheck();
    this.currencyConversionService.getCurrencyRateForPromise(currencyCode).then((rate) => {
      this.currencyRate = rate;
      this.updateCostinEur();
    });
  }

  updateAmount(amount: number) {
    this.form.amount = amount;
    this.updateCostinEur();
  }

  private updateCostinEur() {
    this.costInEur = this.form.amount * this.currencyRate;
    this.changeDetectorRef.markForCheck();
  }
}
