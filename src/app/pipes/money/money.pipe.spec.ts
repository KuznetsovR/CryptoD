import { MoneyPipe } from './money.pipe';

describe('MoneyPipe', () => {
  it('create an instance', () => {
    const pipe = new MoneyPipe();
    expect(pipe).toBeTruthy();
  });
  it('should format to money view', () => {
    const pipe = new MoneyPipe();
    const result = pipe.transform(123.33)
    expect(result).toBe('$123.33')
  })
  it('should format to money view with 3 decimals', () => {
    const pipe = new MoneyPipe();
    const resultWithThreeDecimals = pipe.transform(13.33, 3)
    expect(resultWithThreeDecimals).toBe('$13.330');
  })
  it('should format to money view with 1 decimal and euro symbol', () => {
    const pipe = new MoneyPipe();
    const resultInEuro = pipe.transform(1999.99, 1, '€')
    expect(resultInEuro).toBe('€2000.0');
  })
});
