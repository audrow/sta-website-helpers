import {
  getEpisodeSlugs,
  getEpisodeNumberFromPath,
  getEpisodeNumberFromSlug,
  getEpisodeSlug,
  getEpisodeDataBySlug,
} from "../api";

import { join } from "path";

describe("getEpisodeDataBySlug", () => {
  it("should return the correct episode data", async () => {
    const slug = "10-brett-alrich"
    const episodesDirectory = join(__dirname, 'data', 'episodes');
    const episodeData = await getEpisodeDataBySlug(slug, episodesDirectory);
    expect(episodeData.slug).toBe(slug);
    expect(episodeData.path).toBe(join(episodesDirectory, '10'));
    expect(episodeData.number).toBe(10);
  })
});

describe("getEpisodeSlugs", () => {
  it("should return an array of episode slugs", () => {
    const episodesDirectory = join(__dirname, 'data', 'episodes');
    expect(getEpisodeSlugs(episodesDirectory)).resolves.toEqual(["10-brett-aldrich", "11-cbq"]);
  });

  it("should throw an error if the episodes directory does not exist", () => {
    const episodesDirectory = join(__dirname, 'data', 'not-a-directory');
    expect(async () => {
      try {
        await getEpisodeSlugs(episodesDirectory)
        fail('should have thrown an error');
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    })
  });

  it("should throw an error if the episodes directory is empty", () => {
    const episodesDirectory = join(__dirname, 'data', 'empty-dir');
    expect(async () => {
      try {
        await getEpisodeSlugs(episodesDirectory)
        fail('should have thrown an error');
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    })
  });

  it("should throw an error when there's no episode info file", () => {
    const episodesDirectory = join(__dirname, 'data', 'not-info');
    expect(async () => {
      try {
        await getEpisodeSlugs(episodesDirectory)
        fail('should have thrown an error');
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    })
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

describe("getEpisodeNumberFromPath", () => {
  it("should return an episode number", () => {
    expect(getEpisodeNumberFromPath("1")).toEqual(1);
    expect(getEpisodeNumberFromPath("101")).toEqual(101);

    expect(getEpisodeNumberFromPath("foo/1")).toEqual(1);

    expect(getEpisodeNumberFromPath("foo/bar/1")).toEqual(1);
    expect(getEpisodeNumberFromPath("foo/bar/2")).toEqual(2);
    expect(getEpisodeNumberFromPath("foo/bar/101")).toEqual(101);
  });
  it("should return NaN if no number is given", () => {
    expect(() => getEpisodeNumberFromPath("")).toThrowError();
    expect(() => getEpisodeNumberFromPath("foo")).toThrowError();
    expect(() => getEpisodeNumberFromPath("foo/")).toThrowError();
    expect(() => getEpisodeNumberFromPath("foo/bar/")).toThrowError();
    expect(() => getEpisodeNumberFromPath("foo/bar/abc")).toThrowError();
  })
})

describe("getEpisodeNumberFromSlug", () => {
  it("should return an episode number", () => {
    expect(getEpisodeNumberFromSlug("1")).toEqual(1);
    expect(getEpisodeNumberFromSlug("1-foo")).toEqual(1);
    expect(getEpisodeNumberFromSlug("1-foo-bar")).toEqual(1);
    expect(getEpisodeNumberFromSlug("1-foo-bar-2")).toEqual(1);
    expect(getEpisodeNumberFromSlug("10-foo-bar")).toEqual(10);
    expect(getEpisodeNumberFromSlug("10-foo-bar")).toEqual(10);
    expect(getEpisodeNumberFromSlug("103-foo-bar")).toEqual(103);
  })

  it("should throw an error on no number", () => {
    expect(() => getEpisodeNumberFromSlug("")).toThrowError();
    expect(() => getEpisodeNumberFromSlug(" ")).toThrowError();
    expect(() => getEpisodeNumberFromSlug("foo")).toThrowError();
    expect(() => getEpisodeNumberFromSlug("foo-1")).toThrowError();
    expect(() => getEpisodeNumberFromSlug("foo-bar")).toThrowError();
    expect(() => getEpisodeNumberFromSlug("foo-bar-1")).toThrowError();
  })
})