import { adder } from "../adder";

describe("Adder", () => {
    it("check if add is a function", () => {
      const add = adder();
      expect(typeof add).toBe("function");
    });
    it("check add parameters", () => {
      const addTen = adder(10);
      expect(addTen).toHaveLength(1);
    });
    it("add 5", () => {
      const addFive = adder(5);
      expect(addFive(5)).toBe(10);
      expect(addFive(7)).toBe(12);
    });
    it("add 12", () => {
      const addTwelve = adder(12);
      expect(addTwelve(5)).toBe(17);
      expect(addTwelve(2)).toBe(14);
    });
    it("add without init number", () => {
      const addNeutral= adder();
      expect(addNeutral(5)).toBe(5);
      expect(addNeutral(2)).toBe(2);
    });
  });