let tablero = document.getElementById("tablero");
function crearCeldas(total)
    {
        let numFilas = total/5;
        let numColum = total/2;
        while(tablero.childNodes.length >= 1)
        {
            tablero.removeChild(tablero.firstChild);
        }
        for(let i = 0; i < numFilas; i++)
        {
            let fila = document.createElement('tr');
            for(let j = 0; j < numColum; j++)
            {
                let columna = document.createElement('td');
                columna.id = `${i}${j}`;
                columna.textContent = i * numColum + j + 1;
                columna.className = "btn";
                //columna.className = "btn-default";
                columna.addEventListener("click", () => 
                {
                    //this.mostrar(columna.id);
                }, false);
                fila.appendChild(columna);
                //this.celdas[i][j] = columna;
            }
            tablero.appendChild(fila);
        }
    }
crearCeldas(10);