import {
  getEpisodeSlugs,
  getEpisodeNumber,
  getEpisodeSlug,
} from "../api";


describe("getEpisodeSlugs", () => {
  it("should return an array of episode slugs", () => {
    const episodesDirectory = './src/test/data/episodes';
    expect(getEpisodeSlugs(episodesDirectory)).toEqual(["10-brett-aldrich", "11-cbq"]);
  });

  it("should throw an error if the episodes directory does not exist", () => {
    const episodesDirectory = './src/test/data/empty-dir';
    expect(() => getEpisodeSlugs(episodesDirectory)).toThrowError();
  });

  it("should throw an error when there's no episode info file", () => {
    const episodesDirectory = './src/test/data/no-info';
    expect(() => getEpisodeSlugs(episodesDirectory)).toThrowError();
  })
})

describe("getEpisodeSlug", () => {
  it("should return an episode slug", () => {
    expect(getEpisodeSlug(1, ["foo"])).toEqual("1-foo");
    expect(getEpisodeSlug(1, ["foo bar"])).toEqual("1-foo-bar");
    expect(getEpisodeSlug(1, ["foo bar", "baz bop"])).toEqual("1-foo-bar-and-baz-bop");
    expect(getEpisodeSlug(1, ["foo bar", "baz bop", "bang pow"])).toEqual("1-foo-bar-baz-bop-and-bang-pow");
  });
  it("should throw an error on an empty list", () => {
    expect(() => getEpisodeSlug(1, [])).toThrowError()
  })
  it("should throw errors on white space", () => {
    expect(() => getEpisodeSlug(1, [""])).toThrowError()
    expect(() => getEpisodeSlug(1, [" "])).toThrowError()
    expect(() => getEpisodeSlug(1, ["   \n\t  "])).toThrowError()
    expect(() => getEpisodeSlug(1, ["", ""])).toThrowError()
    expect(() => getEpisodeSlug(1, ["", " "])).toThrowError()
    expect(() => getEpisodeSlug(1, ["foo", ""])).toThrowError()
    expect(() => getEpisodeSlug(1, ["foo", " "])).toThrowError()
    expect(() => getEpisodeSlug(1, ["foo", "    \n\t   "])).toThrowError()
  })
})

describe("getEpisodeNumber", () => {
  it("should return an episode number", () => {
    expect(getEpisodeNumber("1")).toEqual(1);
    expect(getEpisodeNumber("101")).toEqual(101);

    expect(getEpisodeNumber("foo/1")).toEqual(1);

    expect(getEpisodeNumber("foo/bar/1")).toEqual(1);
    expect(getEpisodeNumber("foo/bar/2")).toEqual(2);
    expect(getEpisodeNumber("foo/bar/101")).toEqual(101);
  });
  it("should return NaN if no number is given", () => {
    expect(getEpisodeNumber("")).toEqual(NaN);
    expect(getEpisodeNumber("foo")).toEqual(NaN);
    expect(getEpisodeNumber("foo/")).toEqual(NaN);
    expect(getEpisodeNumber("foo/bar/")).toEqual(NaN);
    expect(getEpisodeNumber("foo/bar/abc")).toEqual(NaN);
  })
})
