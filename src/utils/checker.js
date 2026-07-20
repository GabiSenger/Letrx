export const checkMatch = (word, userInput) => {
  return userInput === word;
};

export const checkCorrectLetters = (word, newWord, defaultList) => {
  letterList = [...defaultList];
  for (let i = 0; i < word.split("").length; i++) {
    const item = word[i];
    if (item === newWord[i]) {
      letterList[i] = { letter: newWord[i], status: "correct" };
    } else if (word.includes(newWord[i])) {
      letterList[i] = { letter: newWord[i], status: "alert" };
    } else {
      letterList[i] = { letter: newWord[i], status: "error" };
    }
  }

  return letterList;
};
