let generateMatrixButton = document.querySelector("#generateMatrixButton");

function getMatrixSize() {
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
    if (matrixSizes[i] < 2) {
      isSizeOk = false;
    }
  }
  if (!isSizeOk) {
    alert("Uma matriz precisa ter no mínimo duas linhas e duas colunas.");
  }
  return isSizeOk;
}

generateMatrixButton.addEventListener("click", () => {
  let matrixSizes = getMatrixSize();
  if (matrixSizes) {
    checkMatrixSizes(matrixSizes);
  }
});
