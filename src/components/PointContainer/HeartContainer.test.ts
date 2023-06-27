import { parseHearts, parseTemporaryHearts } from "./HeartContainer";
import { Point } from "./type";

describe("HeartConainer", () => {
  describe("parsing points to expected heart data", () => {
    it("parses 4 full hearts", () => {
      const fixture: Point = {
        current: 16,
        maximum: 16,
        temporary: 0,
      };

      expect(parseHearts(fixture)).toStrictEqual([4, 4, 4, 4]);
    });

    it("parses 4 hearts with 1 full", () => {
      const fixture: Point = {
        current: 4,
        maximum: 16,
        temporary: 0,
      };

      expect(parseHearts(fixture)).toStrictEqual([4, 0, 0, 0]);
    });

    it("parses 4 hearts with 2.5 full", () => {
      const fixture: Point = {
        current: 10,
        maximum: 16,
        temporary: 0,
      };

      expect(parseHearts(fixture)).toStrictEqual([4, 4, 2, 0]);
    });

    it("parses 4 empty hearts", () => {
      const fixture: Point = {
        current: 0,
        maximum: 16,
        temporary: 0,
      };

      expect(parseHearts(fixture)).toStrictEqual([0, 0, 0, 0]);
    });
  });

  describe("parsing temporary hearts", () => {
    it("returns empty when there are no temporary hearts", () => {
      const fixture: Point = {
        current: 12,
        maximum: 12,
        temporary: 0,
      };

      expect(parseTemporaryHearts(fixture)).toStrictEqual([]);
    });

    it("returns two full temporary hearts", () => {
      const fixture: Point = {
        current: 12,
        maximum: 12,
        temporary: 8,
      };

      expect(parseTemporaryHearts(fixture)).toStrictEqual([4, 4]);
    });

    it("returns 1.5 temporary hearts ", () => {
      const fixture: Point = {
        current: 12,
        maximum: 12,
        temporary: 6,
      };

      expect(parseTemporaryHearts(fixture)).toStrictEqual([4, 2]);
    });
  });
});
