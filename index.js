function keyPress(eventInformation){
    switch (eventInformation.key){

        case 'a':
            kick.play()
            break;

        case 's':
            snare.play()
            break;

        case 'd':
            hihat.play()
            break;

        case 'j':
            tom.play()
            break;

        case 'k':
            perc.play()
            break;

    }
}

window.addEventListener('keypress', keyPress);

const sounds = ['clap', 'hihat', 'kick', 'snare', 'perc', 'snare', 'tom']
let i = 0;

sounds.forEach((sound) =>{
    const audio = document.createElement('audio');
    audio.setAttribute('src', `/sounds/${sound}.wav`);
    audio.setAttribute('controls', true);
    audio.setAttribute('id', sound);

    document.getElementById('audios').append(audio);
});

sounds.forEach((sound) =>{
    const button = document.createElement('button');
    button.innerText = sound;

    document.getElementById('buttons').append(button);
});

let kick = document.getElementById('kick');
let snare = document.getElementById('snare');
let hihat = document.getElementById('hihat');
let tom = document.getElementById('perc');
let perc = document.getElementById('tom');

