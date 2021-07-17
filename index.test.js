const StringCalculator = require(".");
const calculator = new StringCalculator();

describe("StringCalculator", () => {
  describe("add", () => {
    it("should return 0 for an empty string", () => {
      expect(calculator.add("")).toBe(0);
    });

    it("should add the numbers in a basic case", () => {
      expect(calculator.add("3,4,5")).toBe(12);
    });

    it("should ignore newlines", () => {
      expect(calculator.add("1\n,2,3")).toBe(6);
      expect(calculator.add("1,\n2,4")).toBe(7);
    });

    it("should allow a custom delimiter", () => {
      expect(calculator.add("//$\n1$2$3")).toBe(6);
      expect(calculator.add("//@\n2@3@8")).toBe(13);
    });

    it("should throw, negative number", () => {
      expect(() => calculator.add("-10,5")).toThrow();
    });

    it("should ignore numbers greater than 1000", () => {
      expect(calculator.add("2,1001")).toBe(2);
    });

    it("should allow delimiters of arbitrary length", () => {
      expect(calculator.add("//***\n1***2***3")).toBe(6);
    });

    it("should allow multiple delimiters", () => {
      expect(calculator.add("//$,@\n1$2@3")).toBe(6);
    });
  });
});
