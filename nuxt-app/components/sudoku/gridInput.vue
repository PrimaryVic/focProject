<template>
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
        :value="sudokuGrid[rowIndex][colIndex] == 0 ? '' : sudokuGrid[rowIndex][colIndex]"
        @input="value => sudokuGrid[rowIndex][colIndex] = value.target.value"
        :disabled="sudokuGrid[rowIndex][colIndex] !== 0"
        min="1"
        max="9"
    />
  </div>
</template>

<script>
export default {
  name: "gridInput"
}
</script>

<style scoped>

</style>