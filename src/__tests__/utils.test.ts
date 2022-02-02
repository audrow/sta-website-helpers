import {
  listToString,
  sortDuration,
  toDuration,
  toDurationString,
} from '../utils'

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

describe('sortDuration', () => {
  it('should compare durations correctly', () => {
    const d1 = {hours: 0, minutes: 0, seconds: 0}
    const d2 = {hours: 0, minutes: 0, seconds: 1}
    const d3 = {hours: 0, minutes: 1, seconds: 0}
    const d4 = {hours: 0, minutes: 1, seconds: 1}
    const d5 = {hours: 1, minutes: 0, seconds: 0}
    const d6 = {hours: 1, minutes: 0, seconds: 1}
    const d7 = {hours: 1, minutes: 1, seconds: 0}

    expect(sortDuration(d1, d1)).toBe(0)
    expect(sortDuration(d1, d2)).toBe(-1)
    expect(sortDuration(d1, d3)).toBe(-1)
    expect(sortDuration(d1, d4)).toBe(-1)
    expect(sortDuration(d1, d5)).toBe(-1)
    expect(sortDuration(d1, d6)).toBe(-1)
    expect(sortDuration(d1, d7)).toBe(-1)

    expect(sortDuration(d2, d1)).toBe(1)
    expect(sortDuration(d2, d2)).toBe(0)
    expect(sortDuration(d2, d3)).toBe(-1)
    expect(sortDuration(d2, d4)).toBe(-1)
    expect(sortDuration(d2, d5)).toBe(-1)
    expect(sortDuration(d2, d6)).toBe(-1)
    expect(sortDuration(d2, d7)).toBe(-1)

    expect(sortDuration(d3, d1)).toBe(1)
    expect(sortDuration(d3, d2)).toBe(1)
    expect(sortDuration(d3, d3)).toBe(0)
    expect(sortDuration(d3, d4)).toBe(-1)
    expect(sortDuration(d3, d5)).toBe(-1)
    expect(sortDuration(d3, d6)).toBe(-1)
    expect(sortDuration(d3, d7)).toBe(-1)

    expect(sortDuration(d4, d1)).toBe(1)
    expect(sortDuration(d4, d2)).toBe(1)
    expect(sortDuration(d4, d3)).toBe(1)
    expect(sortDuration(d4, d4)).toBe(0)
    expect(sortDuration(d4, d5)).toBe(-1)
    expect(sortDuration(d4, d6)).toBe(-1)
    expect(sortDuration(d4, d7)).toBe(-1)

    expect(sortDuration(d5, d1)).toBe(1)
    expect(sortDuration(d5, d2)).toBe(1)
    expect(sortDuration(d5, d3)).toBe(1)
    expect(sortDuration(d5, d4)).toBe(1)
    expect(sortDuration(d5, d5)).toBe(0)
    expect(sortDuration(d5, d6)).toBe(-1)
    expect(sortDuration(d5, d7)).toBe(-1)

    expect(sortDuration(d6, d1)).toBe(1)
    expect(sortDuration(d6, d2)).toBe(1)
    expect(sortDuration(d6, d3)).toBe(1)
    expect(sortDuration(d6, d4)).toBe(1)
    expect(sortDuration(d6, d5)).toBe(1)
    expect(sortDuration(d6, d6)).toBe(0)
    expect(sortDuration(d6, d7)).toBe(-1)

    expect(sortDuration(d7, d1)).toBe(1)
    expect(sortDuration(d7, d2)).toBe(1)
    expect(sortDuration(d7, d3)).toBe(1)
    expect(sortDuration(d7, d4)).toBe(1)
    expect(sortDuration(d7, d5)).toBe(1)
    expect(sortDuration(d7, d6)).toBe(1)
    expect(sortDuration(d7, d7)).toBe(0)
  })
})

describe('toDuration', () => {
  it('should convert a string to a duration', () => {
    expect(toDuration('0:00:00')).toEqual({hours: 0, minutes: 0, seconds: 0})
    expect(toDuration('0:00:01')).toEqual({hours: 0, minutes: 0, seconds: 1})
    expect(toDuration('0:01:00')).toEqual({hours: 0, minutes: 1, seconds: 0})
    expect(toDuration('1:00:00')).toEqual({hours: 1, minutes: 0, seconds: 0})
    expect(toDuration('1:01:01')).toEqual({hours: 1, minutes: 1, seconds: 1})
  })
  it('should ignore milliseconds', () => {
    expect(toDuration('0:00:00.000')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
    expect(toDuration('0:00:00,000')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
    expect(toDuration('0:00:00.001')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
    expect(toDuration('0:00:00,001')).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
  })
  it('should throw an error on invalid strings', () => {
    const badStrings = [
      '0:00:00.a',
      '0:00:00,a',
      '0:00:0a',
      '0:00',
      '0:00:0',
      '0:00:000',
      '0:000:00',
      '0:0:00',
      '01',
      'foo',
      '',
      '   ',
    ]
    for (const badString of badStrings) {
      expect(() => toDuration(badString)).toThrowError()
    }
  })
})

describe('toDurationString', () => {
  it('should convert durations to strings', () => {
    expect(toDurationString({hours: 0, minutes: 0, seconds: 0})).toBe('0:00:00')
    expect(toDurationString({hours: 0, minutes: 0, seconds: 1})).toBe('0:00:01')
    expect(toDurationString({hours: 0, minutes: 1, seconds: 0})).toBe('0:01:00')
    expect(toDurationString({hours: 1, minutes: 0, seconds: 0})).toBe('1:00:00')
    expect(toDurationString({hours: 1, minutes: 1, seconds: 1})).toBe('1:01:01')
  })
})
