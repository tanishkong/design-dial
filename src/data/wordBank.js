export const wordBank = {
  playful: [
    { max: 20,  word: 'Serious'  },
    { max: 40,  word: 'Focused'  },
    { max: 60,  word: 'Balanced' },
    { max: 80,  word: 'Friendly' },
    { max: 100, word: 'Playful'  },
  ],
  expressive: [
    { max: 20,  word: 'Restrained' },
    { max: 40,  word: 'Considered' },
    { max: 60,  word: 'Composed'   },
    { max: 80,  word: 'Expressive' },
    { max: 100, word: 'Bold'       },
  ],
  warm: [
    { max: 20,  word: 'Technical' },
    { max: 40,  word: 'Precise'   },
    { max: 60,  word: 'Neutral'   },
    { max: 80,  word: 'Warm'      },
    { max: 100, word: 'Human'     },
  ],
  energetic: [
    { max: 20,  word: 'Calm'     },
    { max: 40,  word: 'Steady'   },
    { max: 60,  word: 'Balanced' },
    { max: 80,  word: 'Dynamic'  },
    { max: 100, word: 'Energetic'},
  ],
}

export function resolveWord(axis, value) {
  return wordBank[axis].find(entry => value <= entry.max).word
}
