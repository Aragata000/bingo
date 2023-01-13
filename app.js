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
    const randomIndex = Math.floor(Math.random() * availableNumbers.length + 1);
    result.push(availableNumbers[randomIndex]);
    availableNumbers.splice(randomIndex, 1);
  }
  return result;
};

const createBingoCard = (totalRow, totalCol) => {
  const card = [];
  let valuesIndex = 0;
  const values = generateRandomNumbers(totalRow * totalCol, 1, 90);

  for (let rowIndex = 0; rowIndex < totalRow; rowIndex++) {
    const row = [];

    for (let colIndex = 0; colIndex < totalCol; colIndex++) {
      //TODO number aleatorio del 1 - 90
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

const displayBingoCard = (bingoCard) => {
  const result = "";
};

const bingo = () => {
  const bombo = Array.from({ length: 90 }, (_, i) => i + 1);
  const getBingoNumber = () => {
    const bomboIndex = Math.floor(Math.random() * bombo.length + 1);
    const item = bombo.splice(bomboIndex, 1)[0];
    return item;
  };
  const bingoNumber = getBingoNumber();
  console.log(bingoNumber, bombo);

  const bingoCard = createBingoCard(3, 5);

  const checkForMatching = () => {
    bingoCard.forEach((row) => {
      row.forEach((cell) => {
        if (cell.number === bingoNumber) {
          cell.isMatch = true;
        }
      });
    });
  };
  console.log(bingoCard);

  checkForMatching();
};

bingo();
