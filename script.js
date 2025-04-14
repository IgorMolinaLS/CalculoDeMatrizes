let generateMatrixButton = document.querySelector("#generateMatrixButton");

function validateInput(number) {
  number.value = number.value.replace(/[^0-9]/g, "").slice(0, 1); // mantém apenas um número
}

generateMatrixButton.addEventListener("click", () => {
  let matrixSizes = getMatrixSizes();
  let operator = getOperator();
  let matrixSizesOk;
  let sizeCompatiblityOk;

  if (matrixSizes) {
    matrixSizesOk = checkMatrixSizes(matrixSizes);
    sizeCompatiblityOk = checkMatrixSizesCompatibility(matrixSizes, operator);
  }

  if (operator && matrixSizesOk && sizeCompatiblityOk) {
    mountMatrix(matrixSizes, operator);
  }
});

function getMatrixSizes() {
  let matrix1Rows = Number(document.querySelector("#matrix1Rows").value);
  let matrix1Columns = Number(document.querySelector("#matrix1Columns").value);
  let matrix2Rows = Number(document.querySelector("#matrix2Rows").value);
  let matrix2Columns = Number(document.querySelector("#matrix2Columns").value);

  let matrixSizes = [matrix1Rows, matrix1Columns, matrix2Rows, matrix2Columns];

  for (let i = 0; i < matrixSizes.length; i++) {
    if (isNaN(matrixSizes[i])) {
      alert("O valor das linhas e colunas deve ser numérico!");
      console.warn("O valor das linhas e colunas deve ser numérico!");
    }
  }

  return matrixSizes;
}

function getOperator() {
  let operator = document.querySelector("#operator");
  let operatorValue = operator.value;

  if (
    operatorValue === "+" ||
    operatorValue === "-" ||
    operatorValue === "*" ||
    operatorValue === "/"
  ) {
    return operatorValue;
  } else {
    alert("Insira um operador válido ( + | - | * | / )");
    operator.value = "";
  }
}

function checkMatrixSizes(matrixSizes) {
  let isSizeOk = true;
  for (let i = 0; i < matrixSizes.length; i++) {
    if (matrixSizes[i] < 2 || matrixSizes[i] > 6) {
      isSizeOk = false;
    }
  }
  if (!isSizeOk) {
    alert(
      "Insira uma matriz com no mínimo 2 linhas e 2 colunas, e no máximo 5 linhas e 5 colunas"
    );
  }
  return isSizeOk;
}

function checkMatrixSizesCompatibility(matrixSizes, operator) {
  let areSizesCompatible = true;

  switch (operator) {
    case "+":
    case "-":
      if (
        matrixSizes[0] != matrixSizes[2] ||
        matrixSizes[1] != matrixSizes[3]
      ) {
        areSizesCompatible = false;
        alert(
          "Para realizar as operações de soma ou subtração, é necessário que as matrizes tenham o mesmo tamanho"
        );
      }
      break;
    case "*":
      if (matrixSizes[1] != matrixSizes[2]) {
        areSizesCompatible = false;
        alert(
          "O número de colunas da primeira matriz deve ser igual número de linhas da segunda matriz."
        );
      }
      break;
    case "/":
      if (
        matrixSizes[0] != matrixSizes[1] ||
        matrixSizes[2] != matrixSizes[3] ||
        matrixSizes[0] != matrixSizes[2]
      ) {
        areSizesCompatible = false;
        alert("A matrizes precisam ser quadradas e iguais");
      }
      break;
  }
  return areSizesCompatible;
}

// prettier-ignore
function createMatrix(matrixRows, matrixColumns, id, classList = "matrixRowDiv") {
  let matrixContainer = document.querySelector(id);

  for (let i = 0; i < matrixRows; i++) {
    let newRow = document.createElement("div");
    newRow.classList.add(classList);
    for (let j = 0; j < matrixColumns; j++) {
      let newColumn = document.createElement("input");
      if (classList == "resultMatrixRowDiv") {
        newColumn.readOnly = true
      }
      newRow.append(newColumn);
      newColumn.value = j;
    }
    matrixContainer.append(newRow);
  }
}

function mountMatrix(matrixSizes, operator) {
  let matrix1Rows = matrixSizes[0];
  let matrix1Columns = matrixSizes[1];
  let matrix2Rows = matrixSizes[2];
  let matrix2Columns = matrixSizes[3];

  let matrix1Container = document.querySelector(".matrix1Container");
  while (matrix1Container.lastElementChild) {
    matrix1Container.removeChild(matrix1Container.lastElementChild);
  }

  createMatrix(matrix1Rows, matrix1Columns, ".matrix1Container");

  let operatorContainer = document.querySelector(".operatorContainer");
  let equalsContainer = document.querySelector(".equalsContainer");
  if (operatorContainer.lastElementChild || equalsContainer.lastElementChild) {
    operatorContainer.removeChild(operatorContainer.lastElementChild);
    equalsContainer.removeChild(equalsContainer.lastElementChild);
  }

  const operatorValue = document.createElement("input");
  operatorValue.value = operator;
  operatorValue.readOnly = true;
  operatorContainer.append(operatorValue);

  const equalsButton = document.createElement("button");
  equalsButton.classList.add("equalsButton");
  equalsButton.innerHTML = "=";
  equalsButton.id = "equalsButton";
  equalsContainer.append(equalsButton);

  let generateResultButton = document.querySelector("#equalsButton");

  generateResultButton.addEventListener("click", () => {
    calculateMatrix();
  });

  let matrix2Container = document.querySelector(".matrix2Container");
  while (matrix2Container.lastElementChild) {
    matrix2Container.removeChild(matrix2Container.lastElementChild);
  }
  createMatrix(matrix2Rows, matrix2Columns, ".matrix2Container");

  let resultMatrix = document.querySelector(".resultMatrix");
  while (resultMatrix.lastElementChild) {
    resultMatrix.removeChild(resultMatrix.lastElementChild);
  }

  switch (operator) {
    case "+":
    case "-":
      // prettier-ignore
      createMatrix(matrix1Rows, matrix1Columns, ".resultMatrix", "resultMatrixRowDiv");
      break;
    case "*":
      // prettier-ignore
      createMatrix(matrix1Rows, matrix2Columns, ".resultMatrix", "resultMatrixRowDiv");
      break;
    case "/":
      // prettier-ignore
      createMatrix(matrix1Rows, matrix1Columns, ".resultMatrix", "resultMatrixRowDiv");
      break;
  }
}

generateResultButton.addEventListener("click", () => {
  calculateMatrix();
});

function calculateMatrix() {
  let matrix1Container = document.querySelector(".matrix1Container");
  let matrix2Container = document.querySelector(".matrix2Container");
  let matrix1Values = [];
  let matrix2Values = [];

  matrix1Container.childNodes.forEach((row) => {
    let rowValues = [];
    row.childNodes.forEach((column) => {
      rowValues.push(column.value);
    });
    matrix1Values.push(rowValues);
  });

  matrix2Container.childNodes.forEach((row) => {
    let rowValues = [];
    row.childNodes.forEach((column) => {
      rowValues.push(column.value);
    });
    matrix2Values.push(rowValues);
  });

  let operator = document.querySelector("#operator").value;

  //TODO: Criar arquivo helper para chamar as funções addMatrix, subtractMatrix,
  //multiplyMatrix e divideMatrix neste switch case
  switch (operator) {
    case "+":
      let sum = addMatrices(matrix1Values, matrix2Values);

      for (let i = 0; i < matrix1Values.length; i++) {
        let row = document.querySelector(
          `.resultMatrix div:nth-child(${i + 1})`
        );
        for (let j = 0; j < matrix1Values[i].length; j++) {
          let column = row.querySelector(
            `.resultMatrixRowDiv input:nth-child(${j + 1})`
          );
          column.value = sum[i][j];
        }
      }
      break;
      
    case "-":
      let sub = subtractMatrices(matrix1Values, matrix2Values);

      for (let i = 0; i < matrix1Values.length; i++) {
        let row = document.querySelector(
          `.resultMatrix div:nth-child(${i + 1})`
        );
        for (let j = 0; j < matrix1Values[i].length; j++) {
          let column = row.querySelector(
            `.resultMatrixRowDiv input:nth-child(${j + 1})`
          );
          column.value = sub[i][j];
        }
      }
      break;

    case "*":
      const rowsMatrix1 = matrix1Values.length;
      const columnsMatrix2 = matrix2Values[0].length;

      let multiplication = multiplyMatrices(matrix1Values, matrix2Values);

      // prettier-ignore
      for (let i = 0; i < rowsMatrix1; i++) {
        for (let j = 0; j < columnsMatrix2; j++) {
          let row = document.querySelector(
            `.resultMatrix div:nth-child(${i + 1})`
          );
          let column = row.querySelector(
            `.resultMatrixRowDiv input:nth-child(${j + 1})`
          );
          column.value = multiplication[i][j];
        }
      }
      break;

    case "/":
      matrix1 = [];
      matrix2 = [];
      for (let i = 0; i < matrix2Values.length; i++) {
        matrix1[i] = [];
        matrix2[i] = [];
        
        for (let j = 0; j < matrix2Values[i].length; j++) {
          matrix1[i][j] = Number(matrix1Values[i][j]);
          matrix2[i][j] = Number(matrix2Values[i][j]);
        }
      }

      division = divideMatrices(matrix1, matrix2);
      for (let i = 0; i < matrix1.length; i++) {
        let row = document.querySelector(
          `.resultMatrix div:nth-child(${i + 1})`
        );
        for (let j = 0; j < matrix1[i].length; j++) {
          let column = row.querySelector(
            `.resultMatrixRowDiv input:nth-child(${j + 1})`
          );
          column.value = division[i][j];
        }
      }
      break;
  }
}

function addMatrices(matrixA, matrixB){
  const rows = matrixA.length;
  const columns = matrixA[0].length;

  const sub = Array.from({ length: rows }, () => Array(columns).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      sub[i][j] = Number(matrixA[i][j]) + Number(matrixB[i][j]);    
    }
  }
  return sub;
}

function subtractMatrices(matrixA, matrixB){
  const rows = matrixA.length;
  const columns = matrixA[0].length;

  const sum = Array.from({ length: rows }, () => Array(columns).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      sum[i][j] = Number(matrixA[i][j]) - Number(matrixB[i][j]);    
    }
  }
  return sum;
}

function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const columnsA = matrixA[0].length;
  const columnsB = matrixB[0].length;

  const result = Array.from({ length: rowsA }, () => Array(columnsB).fill(0));

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < columnsB; j++) {
      for (let k = 0; k < columnsA; k++) {
        result[i][j] += Number(matrixA[i][k]) * Number(matrixB[k][j]);
      }
    }
  }

  return result;
}

function divideMatrices(matrixA, matrixB){

  determinant = calculateDeterminant(matrixB);
  minorMatrix = calculateMinorMatrix(matrixB);
  cofactors = calculateCofactors(minorMatrix);
  adjugate = calculateAdjugate(cofactors);
  inverse = calculateInverse(adjugate, determinant);
  division = multiplyMatrices(matrixA, inverse);

  return division;
}

function calculateDeterminant(matrix) {
  const n = matrix.length;

  if (n === 1) {
    return matrix[0][0];
  }

  if (n === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  let determinant = 0;
  for (let col = 0; col < n; col++) {
    const subMatrix = matrix.slice(1).map(row => row.filter((_, i) => i !== col));
    const cofactor = ((col % 2 === 0) ? 1 : -1) * matrix[0][col];
    determinant += cofactor * calculateDeterminant(subMatrix);
  }

  return determinant;
}

function calculateMinorMatrix(matrix) {
  const n = matrix.length;

  const minorMatrix = [];

  for (let i = 0; i < n; i++) {
    minorMatrix[i] = [];
    for (let j = 0; j < n; j++) {
      const subMatrix = matrix
        .filter((_, row) => row !== i)
        .map(row => row.filter((_, column) => column !== j));

      minorMatrix[i][j] = calculateDeterminant(subMatrix);
    }
  }

  return minorMatrix;
}

function calculateCofactors(matrix) {
  const n = matrix.length;

  const cofactors = [];

  for (let i = 0; i < n; i++) {
    cofactors[i] = [];
    for (let j = 0; j < n; j++) {
      const sign = ((i + j) % 2 === 0) ? 1 : -1;
      cofactors[i][j] = sign * matrix[i][j];
    }
  }
  return cofactors;
}

function calculateAdjugate(matrix){
  const n = matrix.length;
  const adjugate = [];

  for (let i = 0; i < n; i++) {
    adjugate[i] = [];
    for (let j = 0; j < n; j++) {
      adjugate[i][j] = matrix[j][i];
    }
  }

  return adjugate;
}

function calculateInverse(matrix, determinant){
  const n = matrix.length;
  const inverse = [];

  if(determinant == 0){
    alert("Erro! Matriz não possui inverse (determinante = 0)");
  }

  for (let i = 0; i < n; i++) {
    inverse[i] = [];
    for (let j = 0; j < n; j++) {
      inverse[i][j] = matrix[i][j]/determinant;
    }
  }

  return inverse;
}