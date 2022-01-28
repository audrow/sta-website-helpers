import {listToString} from '../utils'

describe('listToString', () => {
  it('should properly add commas', () => {
    expect(listToString(['John Does'])).toBe('John Does')
    expect(listToString(['John Doe', 'Bob Smith'])).toBe(
      'John Doe and Bob Smith',
    )
    expect(listToString(['John Doe', 'Bob Smith', 'Sara Wong'])).toBe(
      'John Doe, Bob Smith, and Sara Wong',
    )
    expect(
      listToString(['John Doe', 'Bob Smith', 'Sara Wong', 'Margaret Brown']),
    ).toBe('John Doe, Bob Smith, Sara Wong, and Margaret Brown')
  })
  it('should raise an error on an empty list', () => {
    expect(() => listToString([])).toThrowError()
  })
  it('should make sure that all items are not empty strings', () => {
    expect(() => listToString([''])).toThrowError()
    expect(() => listToString([' '])).toThrowError()
    expect(() => listToString([' \t\n '])).toThrowError()
    expect(() => listToString(['', 'Bob Smith'])).toThrowError()
    expect(() => listToString(['Bob Smith', ''])).toThrowError()
  })
})
