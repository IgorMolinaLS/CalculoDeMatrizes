let generateMatrixButton = document.querySelector("#generateMatrixButton");
let generateResultButton = document.querySelector("#equalsButton");

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
    if (matrixSizes[i] < 2 || matrixSizes[i] > 5) {
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
      newColumn.classList.add("matrixInput");
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
  if (operatorContainer.lastElementChild) {
    operatorContainer.removeChild(operatorContainer.lastElementChild);
  }
  const operatorValue = document.createElement("p");
  operatorValue.innerHTML = operator;
  operatorContainer.style.display = "flex";
  equalsContainer.style.display = "flex";
  operatorContainer.append(operatorValue);

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
  }
}
