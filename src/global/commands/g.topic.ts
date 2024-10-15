/* eslint-disable max-len */

const F = f(__filename);

const topics = {
  0: 'What food do you crave most often?',
  1: 'What did you eat for breakfast?',
  2: 'How many cups of coffee, tea, or beverage-of-choice do you have each morning?',
  3: 'Are you an early bird or night owl?',
  4: 'Do you prefer showering at morning or night?',
  5: 'What\'s your favorite flower or plant?',
  6: 'What\'s your caffeinated beverage of choice? Coffee? Cola? Tea?',
  7: 'What\'s your favorite scent?',
  8: 'What\'s the last great TV show or movie you watched?',
  9: 'Best book you\'ve ever read?',
  10: 'If you could learn one new professional skill, what would it be?',
  11: 'If you could learn one new personal skill, what would it be?',
  12: 'What\'s your favorite way to get in some exercise?',
  13: 'If you could write a book, what genre would you write it in? Mystery? Thriller? Romance? Historical fiction? Non-fiction?',
  14: 'What is one article of clothing that someone could wear that would make you walk out on a date with them?',
  15: 'The zombie apocalypse is coming, who are 3 people you want on your team?',
  16: 'What is your most used emoji?',
  17: 'Who was your childhood actor/actress crush?',
  18: 'If you were a wrestler what would be your entrance theme song?',
  19: 'If you could bring back any fashion trend what would it be?',
  20: 'You have your own late night talk show, who do you invite as your first guest?',
  21: 'You have to sing karaoke, what song do you pick?',
  22: 'What was your least favorite food as a child? Do you still hate it or do you love it now?',
  23: 'If you had to eat one meal everyday for the rest of your life what would it be?',
  24: 'If aliens landed on earth tomorrow and offered to take you home with them, would you go?',
  25: '60s, 70s, 80s, 90s: Which decade do you love the most and why?',
  26: 'What\'s your favorite sandwich and why?',
  27: 'What is your favorite item you\'ve bought this year?',
  28: 'What would be the most surprising scientific discovery imaginable?',
  29: 'What is your absolute dream job?',
  30: 'What would your talent be if you were Miss or Mister World?',
  31: 'What would the title of your autobiography be?',
  32: 'Say you\'re independently wealthy and don\'t have to work, what would you do with your time?',
  33: 'If you had to delete all but 3 apps from your smartphone, which ones would you keep?',
  34: 'What is your favorite magical or mythological animal?',
  35: 'What does your favorite shirt look like?',
  36: 'Who is your favorite Disney hero or heroine? Would you trade places with them?',
  37: 'What would your dream house be like?',
  38: 'If you could add anyone to Mount Rushmore who would it be; why?',
  39: 'You\'re going sail around the world, what\'s the name of your boat?',
  40: 'What fictional family would you be a member of?',
  41: 'What sport would you compete in if you were in the Olympics (even if it\'s not in the olympics)?',
  42: 'What would your superpower be and why?',
  43: 'What\'s your favorite tradition or holiday?',
  44: 'What fictional world or place would you like to visit?',
  45: 'What is your favorite breakfast food?',
  46: 'What is your favorite time of the day and why?',
  47: 'Coffee or tea?',
  48: 'Teleportation or flying?',
  49: 'What is your favorite TV show?',
  50: 'What book, movie read/seen recently you would recommend and why?',
  51: 'What breed of dog would you be?',
  52: 'If you had a time machine, would go back in time or into the future?',
  53: 'Do you think you could live without your smartphone (or other technology item) for 24 hours?',
  54: 'What is your favorite dessert?',
  55: 'What was your favorite game to play as a child?',
  56: 'Are you a traveler or a homebody?',
  57: 'What\'s one career you wish you could have?',
  58: 'What fictional world or place would you like to visit?',
  59: 'Have you ever completed anything on your “bucket list”?',
  60: 'Do you have a favorite plant?',
  61: 'What did you have for breakfast this morning?',
  62: 'What is your favorite meal to cook and why?',
  63: 'What is your favorite musical instrument and why?',
  64: 'Are you a cat person or a dog person?',
  65: 'What languages do you know how to speak?',
  66: 'Popcorn or M&Ms?',
  67: 'What\'s the weirdest food you\'ve ever eaten?',
  68: 'What is your cellphone wallpaper?',
  69: 'You can have an unlimited supply of one thing for the rest of your life, what is it? Sushi? Scotch Tape?',
  70: 'Would you go with aliens if they beamed down to Earth?',
  71: 'Are you sunrise, daylight, twilight, or nighttime? Why?',
  72: 'What season would you be?',
  73: 'Are you a good dancer?',
  74: 'What fruit or vegetable would you most want to be?',
  75: 'If you could hang out with any cartoon character, who would you choose and why?',
  76: 'If you could live anywhere in the world for a year, where would it be?',
  77: 'If you could choose any person from history to be your imaginary friend, who would it be and why?',
  78: 'If you could see one movie again for the first time, what would it be and why?',
  79: 'If you could bring back any fashion trend what would it be?',
  80: 'If you could live in any country, where would you live?',
  81: 'If you could choose any two famous people to have dinner with who would they be?',
  82: 'If you could be any animal in the world, what animal would you choose to be?',
  83: 'If you could do anything in the world as your career, what would you do?',
  84: 'If you could be any supernatural creature, what would you be and why?',
  85: 'If you could change places with anyone in the world, who would it be and why?',
  86: 'If you could rename yourself, what name would you pick?',
  87: 'If you could have someone follow you around all the time, like a personal assistant, what would you have them do?',
  88: 'If you could instantly become an expert in something, what would it be?',
  89: 'If you could be guaranteed one thing in life (besides money), what would it be?',
  90: 'If you had to teach a class on one thing, what would you teach?',
  91: 'If you could magically become fluent in any language, what would it be?',
  92: 'If you could be immortal, what age would you choose to stop aging at and why?',
  93: 'If you could be on a reality TV show, which one would you choose and why?',
  94: 'If you could choose any person from history to be your imaginary friend, who would it be and why?',
  95: 'If you could eliminate one thing from your daily routine, what would it be and why?',
  96: 'If you could go to Mars, would you? Why or why not?',
  97: 'If you could have the power of teleportation right now, where would you go and why?',
  98: 'If you could write a book that was guaranteed to be a best seller, what would you write?',
  99: 'Would you rather live in the ocean or on the moon?',
  100: 'Would you rather travel back in time to meet your ancestors or to the future to meet your descendants?',
  101: 'Would you rather lose all of your money or all of your pictures?',
  102: 'Would you rather have invisibility or flight?',
  103: 'Would you rather live where it only snows or the temperature never falls below 100 degrees?',
  104: 'Would you rather always be slightly late or super early?',
  105: 'Would you rather give up your smartphone or your computer?',
  106: 'Would you rather live without heat and AC or live without social media?',
  107: 'Would you rather be the funniest or smartest person in the room?',
  108: 'Would you rather be able to run at 100 miles per hour or fly at 10 miles per hour?',
  109: 'Would you rather be a superhero or the world\'s best chef?',
  110: 'Would you rather be an Olympic gold medalist or an astronaut?',
};

export default topic;

/**
 *
 * @return {string}
 */
export async function topic():Promise<string> {
  const response = topics[Math.floor(Math.random() * Object.keys(topics).length) as keyof typeof topics];
  log.info(F, `response: ${JSON.stringify(response, null, 2)}`);
  return response;
}
