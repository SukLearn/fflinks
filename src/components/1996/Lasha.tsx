import { useState, useEffect } from "react";

const GuessComponent = () => {
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);
  const correctAnswers = ["lasha", "ia", "sam", "tisam", "luka"]; // List of correct answers

  useEffect(() => {
    const checkAnswer = () => {
      let userInput: string | null = "";

      while (!correctAnswers.includes(userInput ?? "")) {
        userInput = window.prompt("Guess the correct value:");
        if (correctAnswers.includes(userInput ?? "")) {
          setGuessedCorrectly(true);
          break; // Exit the loop once a correct answer is provided
        }
      }
    };

    checkAnswer();
  }, []);

  return (
    <div>
      {guessedCorrectly ? (
        <h1>Congratulations! You guessed a correct answer.</h1>
      ) : (
        <h1>Try again!</h1>
      )}
    </div>
  );
};

export default GuessComponent;
