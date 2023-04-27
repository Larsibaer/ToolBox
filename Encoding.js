const morseAlphabet =
  "a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-.;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;" +
  "m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;" +
  "y=-.-;z=--..; =;.=.-.-.-;,=--..--;?=..--..";

const myArray = morseAlphabet.split(";");

const map1 = new Map();
for (let i = 0; i < myArray.length; i++) {
  const char = myArray[i].split("=")[0];
  const morse = myArray[i].split("=")[1];
  map1.set(char, morse);
}

let mapKeys = Array.from(map1.keys());

function charToMorseCode(char) {
  char = char.toLowerCase();
  for (let i = 0; i < myArray.length; i++) {
    const check = myArray[i].split("=")[0];
    if (check === char) {
      return myArray[i].split("=")[1];
      //console.log(myArray[i].split("=")[1]);
    }
  }
  return "[" + char + "]";
}

function convertToMorse(phrase) {
  let morsePhrase = "";
  for (let i = 0; i < phrase.length; i++) {
    //console.log(phrase[i]);
    morsePhrase = morsePhrase.concat(" ", charToMorseCode(phrase[i]));
  }
  return morsePhrase.trim();
}

function Character(char, code) {
  this.char = char;
  this.code = code;
  this.toString = function () {
    return char + ": " + code;
  };
}

function Encoding(name, characters, delimiter) {
  this.name = name;
  this.characters = characters;
  this.delimiter = delimiter;
  this.encode = function (text) {
    let morsePhrase = "";
    for (let i = 0; i < text.length; i++) {
      morsePhrase = morsePhrase.concat(charToMorseCode(text[i]), delimiter);
    }
    return morsePhrase.trim();
  };
  this.toString = function () {
    console.log(name + ": " + characters);
  };
}

const bob = new Character("a", ".-");
const test = new Encoding("Morse", mapKeys, "/");
bob.toString();
console.log(test.encode("Hallo Welt"));
console.log(test.toString());

// map = {};
// map[chrachter.char] = char;
