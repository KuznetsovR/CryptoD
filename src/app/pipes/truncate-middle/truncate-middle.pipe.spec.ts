import { TruncateMiddlePipe } from './truncate-middle.pipe';

describe('TruncateMiddlePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateMiddlePipe();
    expect(pipe).toBeTruthy();
  });
  it('should return same string if its length < resultLengthWithoutEllipsis', () => {
    const pipe = new TruncateMiddlePipe();
    const string = pipe.transform('asdqwe')
    expect(string).toBe('asdqwe')
  })
  it('should truncate a string in the middle', () => {
    const pipe = new TruncateMiddlePipe();
    const string = pipe.transform('qwertyuiop[];lkjhgfdsazxcvbnm,./')
    expect(string).toBe('qwertyuiop...zxcvbnm,./')
  })
  it('should truncate a string in the middle with 30 total length', () => {
    const pipe = new TruncateMiddlePipe();
    const string = pipe.transform('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 30)
    expect(string).toBe('aaaaaaaaaaaaaaa...aaaaaaaaaaaaaaa')
  })
});
