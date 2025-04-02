let generateMatrixButton = document.querySelector("#generateMatrixButton");

generateMatrixButton.addEventListener("click", () => {
  let matrixSizes = getMatrixSizes();
  let operator = getOperator();
  let matrixSizesOk;

  if (matrixSizes) {
    matrixSizesOk = checkMatrixSizes(matrixSizes);
  }

  if (operator && matrixSizesOk) {
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

//TODO:

function mountMatrix(matrixSizes, operator) {
  let matrix1Rows = matrixSizes[0];
  let matrix1Columns = matrixSizes[1];
  let matrix2Rows = matrixSizes[2];
  let matrix2Columns = matrixSizes[3];

  let matrix1Container = document.querySelector(".matrix1Container");
  while (matrix1Container.lastElementChild) {
    matrix1Container.removeChild(matrix1Container.lastElementChild);
  }
  for (let i = 0; i < matrix1Rows; i++) {
    let newRow = document.createElement("div");
    newRow.classList.add("matrixRowDiv");
    for (let j = 0; j < matrix1Columns; j++) {
      let newColumn = document.createElement("input");
      newColumn.classList.add("matrixInput");
      newRow.append(newColumn);
    }
    matrix1Container.append(newRow);
  }

  let operatorContainer = document.querySelector(".operatorContainer");
  let operatorValue = document.createElement("p");
  operatorValue.innerHTML = operator;
  operatorContainer.append(operatorValue);

  let matrix2Container = document.querySelector(".matrix2Container");
  while (matrix2Container.lastElementChild) {
    matrix2Container.removeChild(matrix2Container.lastElementChild);
  }
  for (let i = 0; i < matrix2Rows; i++) {
    let newRow = document.createElement("div");
    newRow.classList.add("matrixRowDiv");
    for (let j = 0; j < matrix2Columns; j++) {
      let newColumn = document.createElement("input");
      newColumn.classList.add("matrixInput");
      newRow.append(newColumn);
    }
    matrix2Container.append(newRow);
  }

  let resultMatrix = document.querySelector(".resultMatrix");
  while (resultMatrix.lastElementChild) {
    resultMatrix.removeChild(resultMatrix.lastElementChild);
  }
  for (let i = 0; i < matrix2Rows; i++) {
    let newRow = document.createElement("div");
    newRow.classList.add("matrixRowDiv");
    for (let j = 0; j < matrix2Columns; j++) {
      let newColumn = document.createElement("input");
      newColumn.classList.add("matrixInput");
      newRow.append(newColumn);
    }
    resultMatrix.append(newRow);
  }
}
