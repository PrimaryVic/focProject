<template>
    <h2>Guesser Game</h2>

    <h3>Current Deck: {{ deckId }}</h3>

    <button @click="() => (guess = 'red')">Guess Red</button>
    <button @click="() => (guess = 'black')">Guess Black</button>

    <h3>Current Guess: {{ guess }}</h3>

    <h3>Score: {{ score }}</h3>

    <div v-if="guess">
        <button @click="drawCard">Draw Card</button>

        <br />

        <div v-if="card">
            <img :src="card.image" alt="" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const deckId = ref();

onMounted(async () => {
    const { deck_id } = await $fetch(
        'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );
    deckId.value = deck_id;
});

const guess = ref();
const score = ref(0);
const card = ref();

async function drawCard() {
    const API = `https://www.deckofcardsapi.com/api/deck/${deckId.value}/draw/?count=1`;

    const data = await fetch(API).then((res) => res.json());
    card.value = data.cards[0];
    evaluateGuess();
}

function evaluateGuess() {
    // Figure out color of card
    const { suit } = card.value;
    // Check if guess matches the color

    const colormatch = {
        red: ['HEARTS', 'DIAMONDS'],
        black: ['SPADES', 'CLUBS'],
    };

    return colormatch[guess.value].includes(suit) ? score.value++ : false;
    // if match increment the score
}
</script>
