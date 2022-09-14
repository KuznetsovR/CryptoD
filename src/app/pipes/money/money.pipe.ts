import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money',
})
export class MoneyPipe implements PipeTransform {
  transform(value: number, currencySymbol: string = '$'): string {
    return `${currencySymbol}${value.toFixed(2)}`;
  }
}

@NgModule({
  declarations: [MoneyPipe],
  exports: [MoneyPipe],
})
export class MoneyPipeModule {}
