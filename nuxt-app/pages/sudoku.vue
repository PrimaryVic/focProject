<script setup>
import { ref } from 'vue';

let sudokuGrid = ref([]);
let originalGrid = ref([]);
let solution = ref([]);
let solutionGrid = ref([]);
let result = ref('Try your luck on this sudoku')

async function getBoard() {
  try {
    const response = await fetch('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value, solution}}}');
    const data = await response.json();
    console.log(data)
    sudokuGrid.value = data.newboard.grids[0].value;
    originalGrid.value = JSON.parse(JSON.stringify(sudokuGrid.value)); // copy initial state
    solution.value = data.newboard.grids[0].solution;
    solutionGrid.value = JSON.parse(JSON.stringify(solution.value));
    console.log(sudokuGrid.value);
  } catch (error) {
    console.error('Error:', error);
  }
}

getBoard();

const checkSolution = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (solutionGrid.value[i][j] !== sudokuGrid.value[i][j]) { // change sudokuGrid to solutionGrid
        return false;
      }
    }
  }
  return true;
};

const check = () => {
  if(checkSolution()) result.value = 'Good job you solved it!';
  else result.value = 'Your solution is not correct, keep trying!';
};

</script>

<template>
  <h1 class="flex justify-center"> {{result}} </h1>
  <div class="flex justify-center items-center m-5 bg-gray-100">
    <div class="grid grid-cols-9 gap-0">
      <template v-for="(row, rowIndex) in solutionGrid">
        <div
            v-for="(cell, colIndex) in row"
            :key="`${rowIndex}-${colIndex}`"
            class="w-16 h-16 border border-gray-200 flex items-center justify-center"
            :class="{
              'border-l-4 border-t-4 border-black': rowIndex % 3 === 0 && colIndex % 3 === 0,
              'border-t-4 border-black': rowIndex % 3 === 0 && colIndex % 3 !== 0,
              'border-l-4 border-black': rowIndex % 3 !== 0 && colIndex % 3 === 0,
            }"
        >
          <input
              class="w-full h-full text-center bg-white outline-none text-lg font-bold"
              type="number"
              :value="sudokuGrid[rowIndex][colIndex] === 0 ? '' : sudokuGrid[rowIndex][colIndex]"
              @input="value => sudokuGrid[rowIndex][colIndex] = parseInt(value.target.value)"
              :disabled="originalGrid[rowIndex][colIndex] !== 0"
              min="1"
              max="9"
          />
        </div>
      </template>
    </div>
  </div>
  <div class="flex justify-center">
  <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="check">
    Check Solution
  </button>
  <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="getBoard">
    Create a new Board
  </button>
  </div>
</template>

<style scoped>
input:disabled {
  color: gray;
}
</style>
