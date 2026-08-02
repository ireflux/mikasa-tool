import { encode, decode } from 'imorse'

const morseCodeMap: Record<string, string> = {  
  'A': '.-',  
  'B': '-...',  
  'C': '-.-.',  
  'D': '-..',  
  'E': '.',  
  'F': '..-.',  
  'G': '--.',  
  'H': '....',  
  'I': '..',  
  'J': '.---',  
  'K': '-.-',  
  'L': '.-..',  
  'M': '--',  
  'N': '-.',  
  'O': '---',  
  'P': '.--.',  
  'Q': '--.-',  
  'R': '.-.',  
  'S': '...',  
  'T': '-',  
  'U': '..-',  
  'V': '...-',  
  'W': '.--',  
  'X': '-..-',  
  'Y': '-.--',  
  'Z': '--..',  
  '0': '-----',  
  '1': '.----',  
  '2': '..---',  
  '3': '...--',  
  '4': '....-',  
  '5': '.....',  
  '6': '-....',  
  '7': '--...',  
  '8': '---..',  
  '9': '----.',  
  '.': '.-.-.-',  
  ':': '---...',  
  ',': '--..--',  
  ';': '-.-.-.',  
  '?': '..--..',  
  "=": '-...-',  
  "'": '.----.',  
  '"': '.-..-.',  
  '!': '-.-.--',  
  '/': '-..-.',  
  '\\': '-.---..',  
  '(': '-.--.',  
  ')': '-.--.-',  
  '+': '.-.-.',  
  '-': '-....-',  
  '_': '..--.-',  
  '@': '.--.-.',
  '$': '...-..-',
  '&': '.-...',
}; 

/**
 * 文本转摩斯密码(包含中文转)
 * @returns 
 */
export function toMorse(text: string) { 
  let morseCode = '';  
  for (const char of text.toUpperCase()) {  
    if (/[\u4e00-\u9fa5]/g.test(char)) {
      //中文转摩斯电码
      morseCode += encode(char) || '?'
    } else {
      morseCode += morseCodeMap[char] || '?'; // 对于不在映射表中的字符，我们将其替换为问号  
    }
    morseCode += ' '
  }
  return morseCode;  
}

/**
 * 摩斯电码转文本
 */
export function toText(morse: string) {
  let text = '';
  const morseArr = morse.split(' ').filter(item => item.trim() !== "")
  for (let i = 0; i < morseArr.length; i++) {
    const code = morseArr[i]
    const matched = Object.keys(morseCodeMap).find(key => morseCodeMap[key] === code)
    if (matched) {
      text += matched
    } else {
      //英文表内不存在时，尝试按中文摩斯解码
      try {
        text += decode(code) || '?'
      } catch {
        text += '?'
      }
    }
  }
  return text
}

const MorseUtils = {
  toMorse,
  toText
}
export default MorseUtils