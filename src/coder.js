export class CaesarCoder {
  alphabetSize = 26;

  encode = (text, shift) => {
    return this.code(text, shift);
  }
  decode = (text, shift) => {
    const decodeShift = -shift;
    return this.code(text, decodeShift);
  }

  code = (text, shift) => {
    const getCharCodesArray = (text) => {
      const charArray = String(text).split('');
      return charArray.map((char) => char.charCodeAt(0));
    }
    
    const isGreater = (charCode) => charCode > 122;
    const isInGap = (charCode) => (charCode > 90) && (charCode < 97);
    const isUpperCase = (charCode) => (charCode >= 65) && (charCode <= 90);
    const isLowerCase = (charCode) => (charCode >= 97) && (charCode <= 122);
    const isOutOfUpperCaseRange = (charCode) => isInGap(charCode) || isLowerCase(charCode);
    const isValidCharCode = (charCode) => isUpperCase(charCode) || isLowerCase(charCode);
  
    const normalizeCharCode = (charCode, shiftedCharCode) => {
      if (isUpperCase(charCode) && isOutOfUpperCaseRange(shiftedCharCode)) {
        return shiftedCharCode - 90 + 65 - 1;
      }
      if (isLowerCase(charCode) && isGreater(shiftedCharCode)) {
        return shiftedCharCode - 122 + 97 - 1;
      }
      return shiftedCharCode;
    }
  
    const getShiftModule = (shift) => {
      const moduleShift = shift % this.alphabetSize;
      const positiveShift = moduleShift < 0 ? this.alphabetSize + moduleShift : moduleShift;
      return positiveShift;
    }
    
    const getShiftedText = (charCodesArray, modifiedShift) => {
      const shiftedCharArray = charCodesArray.map((charCode) => {
        if (isValidCharCode(charCode)) {
          const shiftedCharCode = charCode + modifiedShift;
          return normalizeCharCode(charCode, shiftedCharCode);
        }
        return charCode;
      });
      return String.fromCharCode(...shiftedCharArray);
    }
    return getShiftedText(getCharCodesArray(text), getShiftModule(shift));
  }
}