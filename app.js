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
  console.log(`Hi ${name}, welcome to our Bingo game !`);
  return name;
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
        accumulator.separators += " ---- ";
        accumulator.numbers += `  ${current.isMatch ? "x" : current.number}${
          current.number > 9 && !current.isMatch ? " " : "  "
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
  console.log(result);
  return result;
};

const getScoreRules = () => {
  return "El sistema de puntuacion indicara el porcentaje de aciertos";
};

const getFinalScore = (attemptCounter, bingoCardLength) => {
  return ((bingoCardLength / attemptCounter) * 100).toFixed(2);
};

const bingo = () => {
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
    displayBingoCard(bingoCard);
    !confirm("Quieres esta tarjeta? \n" + displayBingoCard(bingoCard)) &&
      (bingoCard = null);
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

  while (!isBingo) {
    attemptCounter++;
    const bingoNumber = getBingoNumber();
    console.log(bingoNumber, bombo);

    checkForMatching(bingoNumber);

    displayBingoCard(bingoCard);

    if (isLine) {
      isBingo = checkBingo(bingoCard);
      console.log("Bingo: ", isBingo);
    } else {
      isLine = checkBingo(bingoCard, true);
      console.log("Line: ", isLine);
    }
  }

  console.log(`Intentos ${attemptCounter}`);

  alert(
    `Porcentaje de aciertos: ${getFinalScore(
      attemptCounter,
      bingoCardRows * bingoCardCols
    )}%`
  );
};

bingo();
