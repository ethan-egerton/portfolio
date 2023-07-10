export function qwertyString() {
  return 'qwertyuiop/asdfghjkl/zxcvbnm';
}

// Character Generator
export function charGen(loops) {
  let chars = '';
  for (let i = 0; i < loops; i++) {
    chars = chars.concat(Math.random.toString(26));
  }
  return chars;
}

// Element adder
export function elementCreator(elementType, id, classes = '', textContent = '') {
  const element = document.createElement(elementType);
  element.appendChild(document.createTextNode(textContent));
  element.classList = classes;
  element.id = id;
  return element;
}

// Element remover, takes array of both ids and classes
export function removeElements(elements) {
  elements.forEach(
    element => {
      if (document.querySelector(element) !== null) {
        if (element[0] === '#') {
          document.querySelector(element).remove();
        } else {
          document.querySelectorAll(element).forEach(element => {
            element.remove();
          });
        }
      }
    },
  );
}

export function fetchWordData() {
  return {
    food: [
      'bread',
      'cucumber',
      'sandwich',
      'soup',
      'noodles',
      'bagel',
      'steak',
      'chili',
      'cake',
      'pho',
      'fish',
      'chips',
      'lamb',
      'enchilada',
      'taco',
      'ice cream',
      'rice',
      'potato',
      'cheese',
      'kale',
      'banana',
      'strawberry',
      'mango',
      'tomato',
      'plum',
      'pasta',
      'sausage',
      'onion',
      'chocolate',
    ],
    music: [
      'rock',
      'hip hop',
      'pop',
      'jazz',
      'country',
      'funk',
      'punk',
      'blues',
      'edm',
      'reggae',
      'house',
      'techno',
      'metal',
      'trance',
      'ambient',
      'swing',
      'dance',
      'dubstep',
      'hardcore',
      'experimental',
      'grunge',
      'ska',
    ],
    animals: [
      'aardvark',
      'alligator',
      'anteater',
      'badger',
      'bat',
      'bird',
      'bear',
      'capybara',
      'camel',
      'cat',
      'crab',
      'crocodile',
      'cougar',
      'dog',
      'deer',
      'donkey',
      'dolphin',
      'duck',
      'eagle',
      'eel',
      'elephant',
      'fox',
      'fish',
      'frog',
      'gazelle',
      'goat',
      'goose',
      'gorilla',
      'hamster',
      'hedgehog',
      'impala',
      'jackel',
      'kangaroo',
      'lion',
      'llama',
      'leech',
      'moose',
      'muskrat',
      'newt',
      'ocelot',
      'octopus',
      'owl',
      'parrot',
      'pig',
      'pelican',
      'panther',
      'rabbit',
      'rat',
      'raccoon',
      'reindeer',
      'snake',
      'scorpion',
      'spider',
      'squid',
      'squirrel',
      'turtle',
      'toad',
      'tiger',
      'weasel',
      'warthog',
      'wolf',
      'zebra',
    ],
  };
}
