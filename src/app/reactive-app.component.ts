import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import { Currency } from "./currency";
import {combineLatest, debounceTime, distinctUntilChanged, filter, map, shareReplay, switchMap} from "rxjs";
import {CurrencyConversionService} from "./currency-conversion.service";
import {SharedInputsModule} from "./shared-inputs.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedInputsModule],
  templateUrl: './reactive-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveAppComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly currencyConversionService = inject(CurrencyConversionService);
  readonly currencies = Currency.currencies;
  readonly formGroup = this.formBuilder.nonNullable.group({
    currency: [''],
    amount: [0],
  });

  readonly currencyChange$ =
    this.formGroup.controls.currency.valueChanges.pipe(shareReplay());

  readonly currencySymbol$ = this.currencyChange$.pipe(
    map((currencyCode) => Currency.getSymbol(currencyCode))
  );

  readonly currencyRate$ = this.currencyChange$.pipe(
    distinctUntilChanged(),
    filter((currencyCode) => !!currencyCode),
    debounceTime(500),
    switchMap((currencyCode) =>
      this.currencyConversionService.getCurrencyRateFor(currencyCode)
    ),
    shareReplay()
  );

  readonly costInEur$ = combineLatest([this.formGroup.controls.amount.valueChanges, this.currencyRate$]).pipe(
    map(([amount, rate]) => amount * rate),
  );
}
