import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money',
})
export class MoneyPipe implements PipeTransform {
  transform(value: number, numberOfDecimals = 2, currencySymbol: string = '$'): string {
    return `${currencySymbol}${value.toFixed(numberOfDecimals)}`;
  }
}

@NgModule({
  declarations: [MoneyPipe],
  exports: [MoneyPipe],
})
export class MoneyPipeModule {}
