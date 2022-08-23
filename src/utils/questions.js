const questions = [
  {
    question: 'How many faces does a Dodecahedron have?',
    options: ['10', '12', '13', '16'],
    correctAnswer: '12',
  },
  {
    question: 'How many elements are in the periodic table?',
    options: ['68', '10', '118', '1'],
    correctAnswer: '118',
  },
  {
    question: 'Aureolin is a shade of what color?',
    options: ['White', 'Blue', 'Green', 'Yellow'],
    correctAnswer: 'Yellow',
  },
  {
    question: 'What city is known as "The Eternal City"?',
    options: ['Egypt', 'Rome', 'Paris', 'France'],
    correctAnswer: 'Rome',
  },
  {
    question: 'Which planet has the most moons?',
    options: ['Jupiter', 'Earth', 'Venus', 'Saturn'],
    correctAnswer: 'Saturn',
  },
];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const suffledQuestions = questions
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

suffledQuestions.map((ques) => shuffle(ques.options));

const noOfQues = questions.length;

export { suffledQuestions, noOfQues };
