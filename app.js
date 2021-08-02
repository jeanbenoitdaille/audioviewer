const audioPlayer = document.querySelector('audio');

audioPlayer.addEventListener ('play',() =>{



const contextAudio = new AudioContext();

const src = contextAudio.createMediaElementSource(audioPlayer);

const analyseur = contextAudio.createAnalyser();

const canvas = document.getElementById ('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext ('2d')

src.connect (analyseur);
analyseur.connect (contextAudio.destination);

analyseur.fftSize = 1024;

const frequencesAudio = analyseur.frequencyBinCount;
console.log (frequencesAudio);


const tableauFrequences = new Uint8Array (frequencesAudio);


const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const largeurBarre = (WIDTH/tableauFrequences.length);
let hauteurBarre;
let x;


function retourneBarres() {

    requestAnimationFrame (retourneBarres)

    x=0;
    analyseur.getByteFrequencyData (tableauFrequences);

    ctx.fillStyle = "#000";
    ctx.fillRect (0,0,WIDTH,HEIGHT);

    for (let i=0; i<frequencesAudio;i++) {

        hauteurBarre =tableauFrequences[i];

        let r =250;
        let g =50;
        let b = i;

        ctx.fillStyle ='rgb (${r},${g},${b})';
        ctx.fillRect(x,HEIGHT,largeurBarre,-hauteurBarre)

        x+=largeurBarre +1;
    }

}


retourneBarres();



})