export function addMatrices(matrixA, matrixB) {
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

export function subtractMatrices(matrixA, matrixB) {
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

export function multiplyMatrices(matrixA, matrixB) {
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

export function divideMatrices(matrixA, matrixB) {
  let determinant = calculateDeterminant(matrixB);
  let minorMatrix = calculateMinorMatrix(matrixB);
  let cofactors = calculateCofactors(minorMatrix);
  let adjugate = calculateAdjugate(cofactors);
  let inverse = calculateInverse(adjugate, determinant);
  let division = multiplyMatrices(matrixA, inverse);

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
    const subMatrix = matrix
      .slice(1)
      .map((row) => row.filter((_, i) => i !== col));
    const cofactor = (col % 2 === 0 ? 1 : -1) * matrix[0][col];
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
        .map((row) => row.filter((_, column) => column !== j));

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
      const sign = (i + j) % 2 === 0 ? 1 : -1;
      cofactors[i][j] = sign * matrix[i][j];
    }
  }
  return cofactors;
}

function calculateAdjugate(matrix) {
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

function calculateInverse(matrix, determinant) {
  const n = matrix.length;
  const inverse = [];

  if (determinant == 0) {
    alert("Erro! Matriz não possui inverse (determinante = 0)");
  }

  for (let i = 0; i < n; i++) {
    inverse[i] = [];
    for (let j = 0; j < n; j++) {
      inverse[i][j] = matrix[i][j] / determinant;
    }
  }

  return inverse;
}
