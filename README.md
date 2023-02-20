# bingo

## Casos de usos

* 1-Carton 5 numeros
    -Mostrar carton
* -Generar numero random
* -Checkear si esta en el carton
    -Si: Marcar numero("X")
    -No: futuro(puntuacion)
* -Mostrar carton con los cambios
* -Comprobar si previamente ha hecho linea   
    Si: Continua
    No: Comprobar si ahora esta haciendo linea
        -Volver al paso 2
* -Check si Bingo!
    -Si: Bingo
    -No: Volver al paso 2

### Otra manera de hacer la funcion displayBingoCard

 const displayBingoCard = (bingoCard) => {
   let result = "";
   bingoCard.forEach((row, indexRow) => {
     //palitos0
     row.forEach((_) => {
       result += " ---- ";
     });
     result += "\n";
     //numeros
     row.forEach((cell) => {
       result += `  ${cell.number}${cell.number > 9 ? " " : "  "} `;
     });
     result += "\n";
     if (indexRow === bingoCard.length - 1) {
       row.forEach((_) => {
         result += " ---- ";
       });
     }
   });
   console.log(result);
 };
