export function balanceChemicalEquation(reactants: Record<string, number>[], products: Record<string, number>[]): { rCoeffs: number[], pCoeffs: number[] } | null {
  // Collect all unique elements
  const elementsSet = new Set<string>();
  reactants.forEach(m => Object.keys(m).forEach(a => elementsSet.add(a)));
  products.forEach(m => Object.keys(m).forEach(a => elementsSet.add(a)));
  const elements = Array.from(elementsSet);

  const numMolecules = reactants.length + products.length;
  if (numMolecules === 0) return null;

  // Build matrix A
  const matrix: number[][] = [];
  for (const element of elements) {
    const row: number[] = [];
    reactants.forEach(m => row.push(m[element] || 0));
    products.forEach(m => row.push(-(m[element] || 0)));
    matrix.push(row);
  }

  // Find null space using Gaussian elimination
  const numRows = matrix.length;
  const numCols = numMolecules;
  
  // Convert to row echelon form
  let lead = 0;
  for (let r = 0; r < numRows; r++) {
    if (lead >= numCols) break;
    let i = r;
    while (Math.abs(matrix[i][lead]) < 1e-10) {
      i++;
      if (i === numRows) {
        i = r;
        lead++;
        if (lead === numCols) break;
      }
    }
    if (lead === numCols) break;

    // Swap rows i and r
    const temp = matrix[i];
    matrix[i] = matrix[r];
    matrix[r] = temp;

    // Normalize row r
    const val = matrix[r][lead];
    for (let j = 0; j < numCols; j++) {
      matrix[r][j] /= val;
    }

    // Eliminate other rows
    for (let i = 0; i < numRows; i++) {
      if (i !== r) {
        const factor = matrix[i][lead];
        for (let j = 0; j < numCols; j++) {
          matrix[i][j] -= factor * matrix[r][j];
        }
      }
    }
    lead++;
  }

  // Find free variables
  const isPivot = new Array(numCols).fill(false);
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (Math.abs(matrix[r][c] - 1) < 1e-10) {
        // Check if it's the first non-zero in row
        let isFirst = true;
        for (let k = 0; k < c; k++) {
          if (Math.abs(matrix[r][k]) > 1e-10) isFirst = false;
        }
        if (isFirst) {
          isPivot[c] = true;
          break; // Found pivot for this row
        }
      }
    }
  }

  // Find the first free variable (usually the last column in simple reactions)
  let freeCol = -1;
  for (let c = numCols - 1; c >= 0; c--) {
    if (!isPivot[c]) {
      freeCol = c;
      break;
    }
  }

  if (freeCol === -1) {
    // If no free variables, try to find an approximate solution using a fallback loop, but this means it's likely invalid formula combination
    return null; 
  }

  // Extract null space vector
  const solution = new Array(numCols).fill(0);
  solution[freeCol] = 1;

  for (let r = 0; r < numRows; r++) {
    // Find pivot column for this row
    let pivotCol = -1;
    for (let c = 0; c < numCols; c++) {
      if (Math.abs(matrix[r][c] - 1) < 1e-10) {
        pivotCol = c;
        break;
      }
    }
    if (pivotCol !== -1 && pivotCol !== freeCol) {
      solution[pivotCol] = -matrix[r][freeCol];
    }
  }

  // We want all coefficients to be positive. If they are mostly negative, flip sign
  const sign = solution.find(v => Math.abs(v) > 1e-10)! > 0 ? 1 : -1;
  for (let i = 0; i < solution.length; i++) {
    solution[i] *= sign;
    if (solution[i] < -1e-10) {
      // Cannot balance (some coefficients are negative)
      return null;
    }
    solution[i] = Math.max(0, solution[i]);
  }

  // Multiply by a large number and round to handle floating point issues and find common denominator
  // We check up to a large multiplier to find integer coefficients
  let bestMultiplier = 1;
  const maxMultiplier = 500000;
  for (let m = 1; m <= maxMultiplier; m++) {
    let allInt = true;
    for (let val of solution) {
      const scaled = val * m;
      if (Math.abs(scaled - Math.round(scaled)) > 1e-5) {
        allInt = false;
        break;
      }
    }
    if (allInt) {
      bestMultiplier = m;
      break;
    }
  }

  const finalCoeffs = solution.map(v => Math.round(v * bestMultiplier));
  let g = finalCoeffs[0];
  for (let i = 1; i < finalCoeffs.length; i++) {
    if (finalCoeffs[i] > 0) {
      let a = g, b = finalCoeffs[i];
      while (b !== 0) { let temp = b; b = a % b; a = temp; }
      g = a;
    }
  }

  if (g > 1) {
    for (let i = 0; i < finalCoeffs.length; i++) {
        finalCoeffs[i] /= g;
    }
  }

  const result = {
    rCoeffs: finalCoeffs.slice(0, reactants.length),
    pCoeffs: finalCoeffs.slice(reactants.length)
  };

  if (result.rCoeffs.some(c => c === 0) || result.pCoeffs.some(c => c === 0)) return null;

  return result;
}
