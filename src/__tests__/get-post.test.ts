import {
  // getPost,
  getNumber,
  getSlug,
  getMp3Url,
  getCustomMp3Url,
  // getIncludes,
} from '../get-post'

// describe('getPost', () => {
//   const episodesDirectory = join()
//   it('should get posts data', async () => {
//     //
//   })
// })

describe('getMp3Url', () => {
  const baseUrl = 'https://example.com'
  it('should return the expected URL', () => {
    expect(getMp3Url(baseUrl, 1, 'John Doe')).toBe(
      'https://example.com/STA Ep 1 - John Doe.mp3',
    )
    expect(getMp3Url(baseUrl, 1, ['John Doe'])).toBe(
      'https://example.com/STA Ep 1 - John Doe.mp3',
    )
    expect(getMp3Url(baseUrl, 1, ['John Doe', 'Bob Smith'])).toBe(
      'https://example.com/STA Ep 1 - John Doe and Bob Smith.mp3',
    )
    expect(getMp3Url(baseUrl, 1, ['John Doe', 'Bob Smith', 'Sara Wong'])).toBe(
      'https://example.com/STA Ep 1 - John Doe, Bob Smith, and Sara Wong.mp3',
    )
    expect(
      getMp3Url(baseUrl, 1, [
        'John Doe',
        'Bob Smith',
        'Sara Wong',
        'Margaret Brown',
      ]),
    ).toBe(
      'https://example.com/STA Ep 1 - John Doe, Bob Smith, Sara Wong, and Margaret Brown.mp3',
    )
  })
  it('should error when given an empty string', () => {
    expect(() => getMp3Url(baseUrl, 1, '')).toThrowError()
  })
  it('should error when given an empty list', () => {
    expect(() => getMp3Url(baseUrl, 1, [])).toThrowError(
      'Must have at least one guest',
    )
  })
})

describe('getCustomHostedMp3Url', () => {
  const baseUrl = 'https://example.com'
  it('should return the expected URL', () => {
    expect(getCustomMp3Url(baseUrl, 'Welcome')).toBe(
      'https://example.com/Welcome.mp3',
    )
  })
  it('should error when given an empty string', () => {
    expect(() => getCustomMp3Url(baseUrl, '')).toThrowError()
  })
})

describe('getSlug', () => {
  it('should return a slug', () => {
    expect(getSlug(1, ['foo'])).toEqual('1-foo')
    expect(getSlug(1, ['foo bar'])).toEqual('1-foo-bar')
    expect(getSlug(1, ['foo bar', 'baz bop'])).toEqual('1-foo-bar-and-baz-bop')
    expect(getSlug(1, ['foo bar', 'baz bop', 'bang pow'])).toEqual(
      '1-foo-bar-baz-bop-and-bang-pow',
    )
  })
  it('should throw an error on an empty list', () => {
    expect(() => getSlug(1, [])).toThrowError()
  })
  it('should throw errors on white space', () => {
    expect(() => getSlug(1, [''])).toThrowError()
    expect(() => getSlug(1, [' '])).toThrowError()
    expect(() => getSlug(1, ['   \n\t  '])).toThrowError()
    expect(() => getSlug(1, ['', ''])).toThrowError()
    expect(() => getSlug(1, ['', ' '])).toThrowError()
    expect(() => getSlug(1, ['foo', ''])).toThrowError()
    expect(() => getSlug(1, ['foo', ' '])).toThrowError()
    expect(() => getSlug(1, ['foo', '    \n\t   '])).toThrowError()
  })
})

describe('getPostNumberFromPath', () => {
  it('should return an episode number', () => {
    expect(getNumber('1')).toEqual(1)
    expect(getNumber('101')).toEqual(101)

    expect(getNumber('foo/1')).toEqual(1)

    expect(getNumber('foo/bar/1')).toEqual(1)
    expect(getNumber('foo/bar/2')).toEqual(2)
    expect(getNumber('foo/bar/101')).toEqual(101)
  })
  it('should return NaN if no number is given', () => {
    for (const path of ['', 'foo', 'foo/', 'foo/bar', 'foo/bar/']) {
      expect(getNumber(path)).toBeUndefined()
    }
  })
})
