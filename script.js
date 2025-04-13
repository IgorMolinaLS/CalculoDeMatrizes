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

  createMatrix(matrix1Rows, matrix1Columns, ".resultMatrix", "resultMatrixRowDiv");
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
      for (let i = 0; i < matrix1Values.length; i++) {
        let row = document.querySelector(
          `.resultMatrix div:nth-child(${i + 1})`
        );
        for (let j = 0; j < matrix1Values[i].length; j++) {
          let column = row.querySelector(
            `.resultMatrixRowDiv input:nth-child(${j + 1})`
          );
          column.value =
            Number(matrix1Values[i][j]) + Number(matrix2Values[i][j]);
        }
      }
      break;
    case "-":
      for (let i = 0; i < matrix1Values.length; i++) {
        let row = document.querySelector(
          `.resultMatrix div:nth-child(${i + 1})`
        );
        for (let j = 0; j < matrix1Values[i].length; j++) {
          let column = row.querySelector(
            `.resultMatrixRowDiv input:nth-child(${j + 1})`
          );
          column.value =
            Number(matrix1Values[i][j]) - Number(matrix2Values[i][j]);
        }
      }
      break;
    case "*":
      const numRowsMatrix1 = matrix1Values.length;
      const numColsMatrix1 = matrix1Values[0].length;
      const numColsMatrix2 = matrix2Values[0].length;

      for (let firstMatrixRow = 0; firstMatrixRow < numRowsMatrix1; firstMatrixRow++) {
        for (let secondMatrixColumn = 0; secondMatrixColumn < numColsMatrix2; secondMatrixColumn++) {
          let mutiplicationSum = 0;
          for (let firstMatrixColumn = 0; firstMatrixColumn < numColsMatrix1; firstMatrixColumn++) {
            mutiplicationSum = mutiplicationSum + Number(matrix1Values[firstMatrixRow][firstMatrixColumn]) * Number(matrix2Values[firstMatrixColumn][secondMatrixColumn]);
          }
          let row = document.querySelector(
            `.resultMatrix div:nth-child(${firstMatrixRow + 1})`
          );
          let column = row.querySelector(
            `.resultMatrixRowDiv input:nth-child(${secondMatrixColumn + 1})`
          );
          column.value = mutiplicationSum;
        }
      }
      break;
    case "/":
      break;
  }
}
