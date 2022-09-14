import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateMiddle',
})
export class TruncateMiddlePipe implements PipeTransform {
  transform(value: string, resultLengthWithoutEllipsis: number = 20): string {
    if (value.length > resultLengthWithoutEllipsis) {
      const resultMiddleIdx = Math.floor(resultLengthWithoutEllipsis / 2);
      return value.substring(0, resultMiddleIdx) + '...' + value.substring(value.length - resultMiddleIdx, value.length);
    }
    return value;
  }
}
@NgModule({
  declarations: [TruncateMiddlePipe],
  exports: [TruncateMiddlePipe],
})
export class TruncateMiddlePipeModule {}
