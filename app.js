/*
1-Carton 5 numeros
    -Mostrar carton
2-Generar numero random
    -checkear si el numero ha salido antes
        -Si: Volvemos al paso 2
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

const createBingoCard = (totalRow, totalCol) => {
  const card = [];
  let count = 1;
  for (let rowIndex = 0; rowIndex < totalRow; rowIndex++) {
    const row = [];
    for (let colIndex = 0; colIndex < totalCol; colIndex++) {
      row.push({
        number: count,
        isMatch: false,
      });
      count++;
    }
    card.push(row);
  }
  return card;
};

const bingo = () => {
  const bombo = Array.from({ length: 99 }, (_, i) => i + 1);
  const getBingoNumber = () => {
    const bomboIndex = Math.floor(Math.random() * bombo.length + 1);
    const item = bombo.splice(bomboIndex, 1)[0];
    return item;
  };
  const bingoNumber = getBingoNumber();
  console.log(bingoNumber, bombo);

  const bingoCard = createBingoCard(3, 5);
  console.log(bingoCard);
};

bingo();
