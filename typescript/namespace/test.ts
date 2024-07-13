/// <reference path="validation.ts" />
/// <reference path="lettersOnlyValidator.ts" />
/// <reference path="zipCodeValidator.ts" />

// Some samples to try
const strings = ["Hello", "98052", "101"];

// Validators to use
const validators: { [s: string]: Validation.StringValidator } = {};

validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (const s of strings) {
  for (let name in validators) {
    console.log(
      `"${s}" - ${
        validators[name].isAcceptable(s) ? "matches" : "does not match"
      } ${name}`
    );
  }
}
