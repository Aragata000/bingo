/*
1-Carton 5 numeros
    -Mostrar carton
2-Generar numero random
3-Checkear si esta en el carton
    -Si: Marcar numero("X")
    -No: futuro(puntuacion)
4-Mostrar carton con los cambios
5-Comprobar si previamente ha hecho linea   
    Si: Continua
    No: Comprobar si ahora esta haciendo linea
        -Volver al paso 2
6-Check si Bingo!
    -Si: Bingo
    -No: Volver al paso 2        
*/

/*
const card = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
]
*/

const askNameAndGreet = () => {
  let name = null;
  while (!name) {
    name = prompt("Hi, what's your name?");
    name ?? alert("Please, insert name");
  }
  alert(`Hi ${name}, welcome to our Bingo game !`);
  return name;
};

const playAgain = (playerName) => {
  const playAgain = confirm("Do you want to play again?");
  if (playAgain) return true;
  alert(`${playerName} , thanks a lot for playing, see you soon`);
  return false;
};

const generateRandomNumbers = (
  totalNumbers,
  minRandomValue = 1,
  maxRandomValue = 90
) => {
  const result = [];
  const availableNumbers = Array.from(
    { length: maxRandomValue },
    (_, i) => i + minRandomValue
  );
  for (let i = 0; i < totalNumbers; i++) {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    result.push(availableNumbers[randomIndex]);
    availableNumbers.splice(randomIndex, 1);
  }
  return result;
};

const createBingoCard = (totalRow, totalCol) => {
  const card = [];
  let valuesIndex = 0;
  const values = generateRandomNumbers(totalRow * totalCol, 1, 90).sort(
    (a, b) => a - b
  );

  for (let rowIndex = 0; rowIndex < totalRow; rowIndex++) {
    const row = [];

    for (let colIndex = 0; colIndex < totalCol; colIndex++) {
      row.push({
        number: values[valuesIndex],
        isMatch: false,
      });
      valuesIndex++;
    }
    card.push(row);
  }
  return card;
};

// const displayBingoCard = (bingoCard) => {
//   let result = "";
//   bingoCard.forEach((row, indexRow) => {
//     //palitos0
//     row.forEach((_) => {
//       result += " ---- ";
//     });
//     result += "\n";
//     //numeros
//     row.forEach((cell) => {
//       result += `  ${cell.number}${cell.number > 9 ? " " : "  "} `;
//     });
//     result += "\n";
//     if (indexRow === bingoCard.length - 1) {
//       row.forEach((_) => {
//         result += " ---- ";
//       });
//     }
//   });
//   console.log(result);
// };

const checkBingo = (bingoCard, checkLine) => {
  const findMethod = checkLine ? "some" : "every";
  return bingoCard[findMethod]((row) => row.every((cell) => cell.isMatch));
};

const displayBingoCard = (bingoCard) => {
  let result = "";
  bingoCard.forEach((row, indexRow) => {
    const reducedRow = row.reduce(
      (accumulator, current) => {
        accumulator.separators += "\u2002----\u2002";
        accumulator.numbers += `\u2002\u2002${
          current.isMatch ? "x" : current.number
        }${
          current.number > 9 && !current.isMatch ? "\u2002" : "\u2002\u2002"
        } `;
        return accumulator;
      },
      {
        separators: "",
        numbers: "",
      }
    );
    result += `${reducedRow.separators}\n${reducedRow.numbers}\n${
      indexRow === bingoCard.length - 1 ? reducedRow.separators : ""
    }`;
  });
  return result;
};

const getScoreRules = () => {
  return (
    "Ours scoring system: \n" +
    "There are 90 balls in the drum. If you complete the card in less than 90 turns, you will score 100 points for each less turn it took you to complete it."
  );
};

const getFinalScore = (bomboLength) => {
  return bomboLength * 100;
};

const saveScores = (playerName, finalScore, scores) => {
  if (!scores[playerName] || finalScore > scores[playerName])
    scores[playerName] = finalScore;
};

const displayRanking = (scores) => {
  const sortedEntries = Object.entries(scores).sort(
    ([akey, aValue], [bKey, bValue]) => {
      return bValue - aValue;
    }
  );
  return sortedEntries.reduce(
    (accumulator, [currentKey, currentValue], index) => {
      accumulator += `${index + 1}. ${currentKey}: ${currentValue} \n`;
      return accumulator;
    },
    ""
  );
};

const scores = {};
// const getFinalScore = (attemptCounter, bingoCardLength) => {
//   return ((bingoCardLength / attemptCounter) * 100).toFixed(2);
// };

const bingo = () => {
  let play = true;
  while (play) {
    play = false;
    const playerName = askNameAndGreet();
    alert(getScoreRules());
    let isLine = false;
    let isBingo = false;
    const bombo = Array.from({ length: 90 }, (_, i) => i + 1);
    const getBingoNumber = () => {
      const bomboIndex = Math.floor(Math.random() * bombo.length);
      const item = bombo.splice(bomboIndex, 1)[0];
      return item;
    };

    let bingoCard = null; //createBingoCard(3, 5);

    const bingoCardRows = 3;
    const bingoCardCols = 5;

    while (!bingoCard) {
      bingoCard = createBingoCard(bingoCardRows, bingoCardCols);
      !confirm(
        "Do you want this bingo card? \n" + displayBingoCard(bingoCard)
      ) && (bingoCard = null);
    }

    const checkForMatching = (bingoNumber) => {
      bingoCard.forEach((row) => {
        row.forEach((cell) => {
          if (cell.number === bingoNumber) {
            cell.isMatch = true;
          }
        });
      });
    };

    let attemptCounter = 0;
    let continuePlaying = true;
    while (continuePlaying && !isBingo) {
      attemptCounter++;
      const bingoNumber = getBingoNumber();
      // console.log(bingoNumber, bombo);
      continuePlaying = confirm(`Number: ${bingoNumber}\n Continue?`);
      if (continuePlaying) {
        checkForMatching(bingoNumber);
        alert(displayBingoCard(bingoCard));

        if (isLine) {
          isBingo = checkBingo(bingoCard);
        } else {
          isLine = checkBingo(bingoCard, true);
          isLine && alert("You have made a Line");
        }
      }
    }
    if (continuePlaying) {
      const finalScore = getFinalScore(bombo.length);

      saveScores(playerName, finalScore, scores);

      alert(
        `${playerName}, you have made bingo in ${attemptCounter} attempts.\n
     Your final score is: ${finalScore} points\n
     Ranking: \n ${displayRanking(scores)}`
      );

      play = playAgain(playerName);
    } else {
      alert(`Thanks for playing, see you soon\n
    Ranking: \n ${displayRanking(scores)}`);
    }
  }
};

bingo();
