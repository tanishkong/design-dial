export const wordBank = {
  playful: [
    { max: 20,  word: 'Playful'  },
    { max: 40,  word: 'Friendly' },
    { max: 60,  word: 'Balanced' },
    { max: 80,  word: 'Focused'  },
    { max: 100, word: 'Serious'  },
  ],
  expressive: [
    { max: 20,  word: 'Restrained' },
    { max: 40,  word: 'Considered' },
    { max: 60,  word: 'Composed'   },
    { max: 80,  word: 'Expressive' },
    { max: 100, word: 'Bold'       },
  ],
  warm: [
    { max: 20,  word: 'Human'     },
    { max: 40,  word: 'Warm'      },
    { max: 60,  word: 'Neutral'   },
    { max: 80,  word: 'Precise'   },
    { max: 100, word: 'Technical' },
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
