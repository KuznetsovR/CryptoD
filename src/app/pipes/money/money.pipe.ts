import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money',
})
export class MoneyPipe implements PipeTransform {
  formatMoney(value: number, numberOfDecimals: number) {
    const toFixedValueArr = value.toFixed(numberOfDecimals).split('')
    // 4 is 3 digits + comma symbol
    for (let i = toFixedValueArr.length - numberOfDecimals - 4; i > 0; i-=3){
      toFixedValueArr.splice(i, 0 , ' ')
    }
    return toFixedValueArr.join('')
  }
  transform(value: number, numberOfDecimals = 2, currencySymbol: string = '$'): string {
    const formattedValue = this.formatMoney(value, numberOfDecimals)
    return currencySymbol + formattedValue;
  }
}

@NgModule({
  declarations: [MoneyPipe],
  exports: [MoneyPipe],
})
export class MoneyPipeModule {}
