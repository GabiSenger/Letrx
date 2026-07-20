import { useState } from "react";
import InputListLine from "./InputListLine.jsx";
import { checkMatch, checkCorrectLetters } from "../../utils/checker.js";
import { listOfWords } from "../../service/listOfWords.js";

const LETTER_LIST = Array(5).fill({ letter: "", status: "" });
const DEFAULT_PLAY = Array(5).fill({ word: "", letters: [...LETTER_LIST] });

const RANDOM_INDEX = () => Math.floor(Math.random() * listOfWords?.length);

export default InputList = () => {
  const [word, setWord] = useState(listOfWords[RANDOM_INDEX()]);
  const [play, setPlay] = useState(DEFAULT_PLAY);
  const [pointer, setPointer] = useState(0);
  const [hasWinner, setHasWinner] = useState(null);

  const handleLetter = (letter, index) => {
    setPlay((prev) => {
      const copy = [...prev];
      const copyLetters = [...copy[pointer]?.letters];
      copyLetters[index] = { ...copy[index], letter: letter };
      copy[pointer] = {
        ...copy[pointer],
        letters: copyLetters,
      };
      return copy;
    });
  };

  const handleWord = () => {
    const newWord = play[pointer].letters.map((item) => item.letter).join("");
    if (checkMatch(word, newWord)) {
      setPlay((prev) => {
        const copy = [...prev];
        const updateLetters = [...copy[pointer]?.letters].map((item) => ({
          ...item,
          status: "correct",
        }));

        copy[pointer] = {
          ...copy[pointer],
          letters: updateLetters,
        };

        return copy;
      });
      setHasWinner(true);
      return;
    }

    if (pointer === 4) {
      setHasWinner(false);
      return;
    }

    const checkedLetter = checkCorrectLetters(word, newWord, LETTER_LIST);
    setPlay((prev) => {
      const copy = [...prev];
      copy[pointer] = { word: newWord, letters: checkedLetter };
      return copy;
    });
    setPointer((prev) => prev + 1);
  };

  const handleRestart = () => {
    setPointer(0);
    setHasWinner(null);
    setPlay(DEFAULT_PLAY);
    setWord(listOfWords[RANDOM_INDEX()]);
  };

  const shouldBeDisable = play[pointer]?.letters?.some(
    (item) => item.letter === ""
  );

  return (
    <section className="section-area">
      {hasWinner === null && (
        <>
          {play.map((item, i) => (
            <InputListLine
              isDisable={i !== pointer}
              handleLetter={handleLetter}
              list={item.letters}
              key={i}
            />
          ))}
          <button
            className="btn-verificar"
            disabled={shouldBeDisable}
            onClick={handleWord}
          >
            Verificar
          </button>
        </>
      )}
      {hasWinner !== null && (
        <>
          {hasWinner ? (
            <p>Parabéns!! A palavra é: </p>
          ) : (
            <p>Tente de novo! A palavra era: </p>
          )}
          <p className="result">{word.toUpperCase()}</p>
          <p className="footer">Foram {pointer + 1} tentativas</p>
          <button className="btn-reiniciar" onClick={handleRestart}>
            Reiniciar
          </button>
        </>
      )}
    </section>
  );
};
