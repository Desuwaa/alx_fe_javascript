'use strict';

const newQuoteBtn = document.getElementById('newQuote');
const quoteDisplay = document.getElementById('quoteDisplay');
const userText = document.getElementById('newQuoteCategory');
const userCategory = document.getElementById('newQuoteText');

const quotes = [
  {
    text: 'The only way to do great work is to love what you do.',
    category: 'Motivation',
  },
  { text: 'Talk is cheap. Show me the code.', category: 'Technology' },
  { text: 'Simplicity is the ultimate sophistication.', category: 'Design' },
  {
    text: 'Life is what happens when you’re busy making other plans.',
    category: 'Life',
  },
  {
    text: 'If you can’t explain it simply, you don’t understand it well enough.',
    category: 'Wisdom',
  },
  { text: 'Creativity is intelligence having fun.', category: 'Creativity' },
  {
    text: 'The secret of getting ahead is getting started.',
    category: 'Productivity',
  },
  { text: 'A day without laughter is a day wasted.', category: 'Humor' },
  {
    text: 'Technology, like art, is a soaring exercise of the human imagination.',
    category: 'Technology',
  },
  {
    text: 'Success usually comes to those who are too busy to be looking for it.',
    category: 'Success',
  },
  {
    text: 'Do not wait to strike till the iron is hot; make it hot by striking.',
    category: 'Motivation',
  },
  { text: 'Well‑done is better than well‑said.', category: 'Wisdom' },
  {
    text: 'Good design is obvious. Great design is transparent.',
    category: 'Design',
  },
  { text: 'Stay hungry, stay foolish.', category: 'Motivation' },
  {
    text: 'Code is like humor. When you have to explain it, it’s bad.',
    category: 'Technology',
  },
  {
    text: 'In the middle of difficulty lies opportunity.',
    category: 'Courage',
  },
  { text: 'Practice makes permanent.', category: 'Learning' },
  { text: 'Knowledge speaks, but wisdom listens.', category: 'Wisdom' },
  { text: 'The greatest wealth is health.', category: 'Life' },
  {
    text: 'The true sign of intelligence is not knowledge but imagination.',
    category: 'Creativity',
  },
  { text: 'Fall seven times and stand up eight.', category: 'Persistence' },
  {
    text: 'Leadership is the art of giving people a platform to spread ideas.',
    category: 'Leadership',
  },
  {
    text: 'Don’t count the days; make the days count.',
    category: 'Motivation',
  },
  {
    text: 'Experience is the name everyone gives to their mistakes.',
    category: 'Humor',
  },
  { text: 'Science is organized knowledge.', category: 'Science' },
  { text: 'Whatever you are, be a good one.', category: 'Wisdom' },
  { text: 'Learning never exhausts the mind.', category: 'Learning' },
  { text: 'Fear is a reaction. Courage is a decision.', category: 'Courage' },
  { text: 'Design adds value faster than it adds costs.', category: 'Design' },
  {
    text: 'First, solve the problem. Then, write the code.',
    category: 'Technology',
  },
  { text: 'The best revenge is massive success.', category: 'Success' },
  {
    text: 'To write well, express yourself like the common people but think like a wise man.',
    category: 'Writing',
  },
  { text: 'Dream big and dare to fail.', category: 'Motivation' },
  { text: 'You miss 100% of the shots you don’t take.', category: 'Courage' },
  {
    text: 'Persistence guarantees that results are inevitable.',
    category: 'Persistence',
  },
  {
    text: 'Nature does not hurry, yet everything is accomplished.',
    category: 'Nature',
  },
  { text: 'Less is more.', category: 'Design' },
  { text: 'Measure twice; cut once.', category: 'Wisdom' },
  {
    text: 'Art washes away from the soul the dust of everyday life.',
    category: 'Art',
  },
  {
    text: 'Innovation distinguishes between a leader and a follower.',
    category: 'Leadership',
  },
  {
    text: 'Happiness is not something ready‑made. It comes from your own actions.',
    category: 'Life',
  },
  {
    text: 'An investment in knowledge pays the best interest.',
    category: 'Learning',
  },
  { text: 'Move fast and break things.', category: 'Technology' },
  {
    text: 'The journey of a thousand miles begins with one step.',
    category: 'Motivation',
  },
  { text: 'Fortune favors the bold.', category: 'Courage' },
  {
    text: 'Great minds discuss ideas; average minds discuss events; small minds discuss people.',
    category: 'Philosophy',
  },
  {
    text: 'The purpose of art is washing the dust of daily life off our souls.',
    category: 'Art',
  },
  {
    text: 'Stay committed to your decisions, but stay flexible in your approach.',
    category: 'Productivity',
  },
  {
    text: 'A user interface is like a joke. If you have to explain it, it’s not that good.',
    category: 'Design',
  },
  { text: 'Every artist was first an amateur.', category: 'Creativity' },
  { text: 'Quality is not an act; it is a habit.', category: 'Wisdom' },
  {
    text: 'The future belongs to those who prepare for it today.',
    category: 'Motivation',
  },
  { text: 'The pen is mightier than the sword.', category: 'Writing' },
  {
    text: 'The beautiful thing about learning is that nobody can take it away from you.',
    category: 'Learning',
  },
  { text: 'Courage is grace under pressure.', category: 'Courage' },
  {
    text: 'Small deeds done are better than great deeds planned.',
    category: 'Productivity',
  },
  { text: 'Make it simple, but significant.', category: 'Design' },
  { text: 'Code never lies; comments sometimes do.', category: 'Technology' },
  {
    text: 'If opportunity doesn’t knock, build a door.',
    category: 'Creativity',
  },
  { text: 'Discipline equals freedom.', category: 'Motivation' },
  { text: 'Science is the poetry of reality.', category: 'Science' },
  {
    text: 'Reading is to the mind what exercise is to the body.',
    category: 'Learning',
  },
  {
    text: 'Good judgment comes from experience, and experience comes from bad judgment.',
    category: 'Wisdom',
  },
  { text: 'Innovation is saying no to a thousand things.', category: 'Design' },
  {
    text: 'Hard choices, easy life. Easy choices, hard life.',
    category: 'Philosophy',
  },
  {
    text: 'Failure is another stepping stone to greatness.',
    category: 'Success',
  },
  { text: 'The best way out is always through.', category: 'Persistence' },
  { text: 'Love all, trust a few, do wrong to none.', category: 'Love' },
  { text: 'Nothing will work unless you do.', category: 'Motivation' },
  { text: 'Nature always wears the colors of the spirit.', category: 'Nature' },
  { text: 'Great design is achieved, not declared.', category: 'Design' },
  {
    text: 'Live as if you were to die tomorrow. Learn as if you were to live forever.',
    category: 'Life',
  },
  {
    text: 'A ship in harbor is safe, but that’s not what ships are built for.',
    category: 'Courage',
  },
  {
    text: 'Don’t watch the clock; do what it does—keep going.',
    category: 'Productivity',
  },
  { text: 'Your code is a story. Tell it well.', category: 'Technology' },
  {
    text: 'Words are, of course, the most powerful drug used by mankind.',
    category: 'Writing',
  },
  {
    text: 'Logic will get you from A to B. Imagination will take you everywhere.',
    category: 'Creativity',
  },
  {
    text: 'Science knows no country, because knowledge belongs to humanity.',
    category: 'Science',
  },
  {
    text: 'Vision without execution is hallucination.',
    category: 'Leadership',
  },
  {
    text: "Courage doesn’t always roar; sometimes it’s the quiet voice saying, 'I will try again tomorrow.'",
    category: 'Persistence',
  },
  {
    text: 'The details are not the details; they make the design.',
    category: 'Design',
  },
  {
    text: 'Motivation is what gets you started. Habit is what keeps you going.',
    category: 'Motivation',
  },
  {
    text: 'To succeed, jump as quickly at opportunities as you do at conclusions.',
    category: 'Success',
  },
  { text: 'Humor is mankind’s greatest blessing.', category: 'Humor' },
  { text: 'He who opens a school door closes a prison.', category: 'Learning' },
  {
    text: 'The power of imagination makes us infinite.',
    category: 'Creativity',
  },
  {
    text: 'Simplicity is about subtracting the obvious and adding the meaningful.',
    category: 'Design',
  },
  { text: 'Write drunk; edit sober.', category: 'Writing' },
  { text: 'Science is magic that works.', category: 'Science' },
  {
    text: 'Adapt what is useful, reject what is useless, add what is specifically your own.',
    category: 'Philosophy',
  },
  {
    text: 'Champions keep playing until they get it right.',
    category: 'Persistence',
  },
  {
    text: 'Never let the fear of striking out keep you from playing the game.',
    category: 'Courage',
  },
  {
    text: 'The function of leadership is to produce more leaders, not more followers.',
    category: 'Leadership',
  },
  {
    text: 'First, we shape our tools; thereafter, our tools shape us.',
    category: 'Technology',
  },
  {
    text: 'Observation more than books, experience rather than persons, are the prime educators.',
    category: 'Wisdom',
  },
  {
    text: 'Love is composed of a single soul inhabiting two bodies.',
    category: 'Love',
  },
  { text: 'Nature is pleased with simplicity.', category: 'Nature' },
  {
    text: 'The road to success is always under construction.',
    category: 'Humor',
  },
  {
    text: 'Doubt kills more dreams than failure ever will.',
    category: 'Motivation',
  },
  { text: 'Good artists copy; great artists steal.', category: 'Art' },
  { text: "Don't let yesterday take up too much of today.", category: 'Life' },
  {
    text: 'Success is not final; failure is not fatal: it is the courage to continue that counts.',
    category: 'Success',
  },
  {
    text: 'Mindfulness isn’t difficult; we just need to remember to do it.',
    category: 'Mindfulness',
  },
  { text: 'Design is intelligence made visible.', category: 'Design' },
  {
    text: 'Perseverance is not a long race; it is many short races one after the other.',
    category: 'Persistence',
  },
  {
    text: 'Programming isn’t about what you know; it’s about what you can figure out.',
    category: 'Technology',
  },
  {
    text: 'Learning is a treasure that will follow its owner everywhere.',
    category: 'Learning',
  },
  {
    text: 'Nature never hurries—yet everything gets done.',
    category: 'Nature',
  },
  {
    text: 'To handle yourself, use your head; to handle others, use your heart.',
    category: 'Wisdom',
  },
  {
    text: 'Success is the sum of small efforts, repeated day in and day out.',
    category: 'Productivity',
  },
  {
    text: 'Art enables us to find ourselves and lose ourselves at the same time.',
    category: 'Art',
  },
  {
    text: 'A leader is one who knows the way, goes the way, and shows the way.',
    category: 'Leadership',
  },
  { text: 'If you can dream it, you can do it.', category: 'Motivation' },
  { text: 'Humor is truth.', category: 'Humor' },
  { text: 'Creativity takes courage.', category: 'Creativity' },
  { text: 'Wisdom begins in wonder.', category: 'Philosophy' },
];

const makeSpan = function (cls, text) {
  const spanEl = document.createElement('span');
  spanEl.classList.add(cls);
  spanEl.innerHTML = text;
  return spanEl;
};

const showRandomQuote = function () {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const displayRandomQuote = function () {
  const randomQuote = showRandomQuote();

  quoteDisplay.replaceChildren(
    makeSpan('category', `[${randomQuote.category}]`),
    makeSpan('quote-text', ` : ${randomQuote.text}`)
  );

  quoteDisplay.classList.add('show');
};

const createAddQuoteForm = function () {};

document.addEventListener('DOMContentLoaded', () => {
  newQuoteBtn.addEventListener('click', displayRandomQuote);
});

const addQuote = function () {
  quoteDisplay.replaceChildren();

  quoteDisplay.appendChild(makeSpan('category', `[${userCategory.value}]`));
  quoteDisplay.appendChild(makeSpan('quote-text', ` : ${userText.value}`));

  const newQuote = {
    text: userText.value,
    category: userCategory.value,
  };
  quoteDisplay.classList.add('show');

  userCategory.value = '';
  userText.value = '';
  quotes.push(newQuote);
};
