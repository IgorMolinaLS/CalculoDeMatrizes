import * as MatrixHelper from "./matrixHelper.js";

export const generateMatrixButton = document.querySelector(
  "#generateMatrixButton"
);

const domOperator = document.querySelector("#operator");

export function getAndValidateHeaderInputs() {
  let matrixSizes = getMatrixSizes();
  let operator = getOperator();
  let matrixSizesOk;
  let sizeCompatiblityOk;

  if (matrixSizes) {
    matrixSizesOk = checkMatrixSizes(matrixSizes);
    sizeCompatiblityOk = checkMatrixSizesCompatibility(matrixSizes, operator);
  }

  if (operator && matrixSizesOk && sizeCompatiblityOk) {
    return { matrixSizes, operator };
  }
}

function getMatrixSizes() {
  let matrix1Rows = Number(document.querySelector("#matrix1Rows").value);
  let matrix1Columns = Number(document.querySelector("#matrix1Columns").value);
  let matrix2Rows = Number(document.querySelector("#matrix2Rows").value);
  let matrix2Columns = Number(document.querySelector("#matrix2Columns").value);

  let matrixSizes = [matrix1Rows, matrix1Columns, matrix2Rows, matrix2Columns];

  return matrixSizes;
}

function getOperator() {
  let operatorValue = domOperator.value;

  //prettier-ignore
  if (operatorValue === "+" || operatorValue === "-" || 
      operatorValue === "*" || operatorValue === "/") {
    return operatorValue;
  } else {
    alert("Insira um operador válido ( + | - | * | / )");
    domOperator.value = "";
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
      "Insira uma matriz com no mínimo 2 linhas e 2 colunas, e no máximo 6 linhas e 6 colunas"
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
        alert("As matrizes precisam ser quadradas e ter as mesmas dimensões.");
      }
      break;
  }
  return areSizesCompatible;
}

export function mountMatrix() {
  let headerInputValues = getAndValidateHeaderInputs();

  let matrix1Rows = headerInputValues.matrixSizes[0];
  let matrix1Columns = headerInputValues.matrixSizes[1];
  let matrix2Rows = headerInputValues.matrixSizes[2];
  let matrix2Columns = headerInputValues.matrixSizes[3];

  let matrix1Container = document.querySelector(".matrix1Container");
  while (matrix1Container.lastElementChild) {
    matrix1Container.removeChild(matrix1Container.lastElementChild);
  }

  MatrixHelper.createMatrix(matrix1Rows, matrix1Columns, ".matrix1Container");

  let operatorContainer = document.querySelector(".operatorContainer");
  let equalsContainer = document.querySelector(".equalsContainer");
  if (operatorContainer.lastElementChild || equalsContainer.lastElementChild) {
    operatorContainer.removeChild(operatorContainer.lastElementChild);
    equalsContainer.removeChild(equalsContainer.lastElementChild);
  }

  const operatorValue = document.createElement("input");
  operatorValue.value = headerInputValues.operator;
  operatorValue.readOnly = true;
  operatorContainer.append(operatorValue);

  const equalsButton = document.createElement("button");
  equalsButton.classList.add("equalsButton");
  equalsButton.textContent = "=";
  equalsButton.id = "equalsButton";
  equalsContainer.append(equalsButton);

  let generateResultButton = document.querySelector("#equalsButton");

  generateResultButton.addEventListener("click", () => {
    MatrixHelper.calculateMatrix();
  });

  let matrix2Container = document.querySelector(".matrix2Container");
  while (matrix2Container.lastElementChild) {
    matrix2Container.removeChild(matrix2Container.lastElementChild);
  }
  MatrixHelper.createMatrix(matrix2Rows, matrix2Columns, ".matrix2Container");

  let resultMatrix = document.querySelector(".resultMatrix");
  while (resultMatrix.lastElementChild) {
    resultMatrix.removeChild(resultMatrix.lastElementChild);
  }

  switch (headerInputValues.operator) {
    case "+":
    case "-":
    case "/":
      // prettier-ignore
      MatrixHelper.createMatrix(matrix1Rows, matrix1Columns, ".resultMatrix", "resultMatrixRowDiv");
      break;
    case "*":
      // prettier-ignore
      MatrixHelper.createMatrix(matrix1Rows, matrix2Columns, ".resultMatrix", "resultMatrixRowDiv");
      break;
  }
}
