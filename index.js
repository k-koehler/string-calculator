const NUMBER_MAX_SIZE = 1000;

function multipleDelimiterSplit(string, delimiters) {
  const tokens = [];
  let cur = "";

  function swallowToken() {
    tokens.push(cur);
    cur = "";
  }

  for (let i = 0; i < string.length; ++i) {
    for (const delimiter of delimiters) {
      if (string.substring(i).startsWith(delimiter)) {
        swallowToken();
        i += delimiter.length;
        continue;
      }
    }
    cur += string[i];
  }
  swallowToken();

  return tokens;
}

module.exports = class StringCalculator {
  add(numberString) {
    // 1. find the delimiters
    const delimiters = numberString.startsWith("//")
      ? numberString.substring(2, numberString.indexOf("\n")).split(",")
      : [","];
    // 2. remove delimiter part and remove newlines
    const sanitizedNumberString = numberString
      .replace(/\/\/.*\n/, "")
      .replace(/\n/g, "");
    // 3. find all the numbers, and ensure they are not negative, and ignore numbers greater than NUMBER_MAX_SIZE
    const numbers = multipleDelimiterSplit(
      sanitizedNumberString,
      delimiters
    ).map((strNumber) => {
      const number = +strNumber;
      if (number < 0) {
        throw new Error("Negatives not allowed");
      }
      if (number > NUMBER_MAX_SIZE) {
        return 0;
      }
      return number;
    });
    // 4. sum the numbers
    return numbers.reduceRight((acc, cur) => acc + cur);
  }
};
