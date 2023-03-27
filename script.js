const data = {
    color: 'red',
    name: 'Jane Doe',
    type: 'Superhero',
    animalLongKeyName: 'Shark',
    number: 42,
    heroes: ['Wonder Woman: DC', 'Batman:DC', 'Thor:Marvel', 'Ant Man:Marvel'],
};

//1. Picking single values

const {name, color} = data.color;

printColor(data);

function printColor({color, animalLongKeyName: animal, msg = 'nothing'}){
    console.log(color, animal, msg)
}

//2. Destructure Arrays

const [h1, h2] = data.heroes;


//3. Copy Arrays

const heroes = ['Wonder Woman: DC', 'Batman:DC', 'Thor:Marvel', 'Ant Man:Marvel'];
const customHeros = [...heroes];

customHeros.push('Spiderman:Marvel');

console.log(heroes);
console.log(customHeros);

printHeroes('A', 'B');
printHeroes(...heroes);

function printHeroes(superhero ,...heroesToPrint){
    console.log(superhero);
    console.log(heroesToPrint);
}

//4. Leverage spread and rest operators

