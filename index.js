let code = []; // Code couleur que le joueur doit deviner 
let guess = []; // Code couleur que le joueur a essayé

const colorOptions = document.querySelectorAll('.color');
const hintContainer = document.querySelectorAll('.hint');
const secretColor = document.querySelectorAll('.secretColor');

let guessNumber = 1;
let clicks = 1; 
let turn = 1;

const colors = ['green', 'purple', 'red', 'yellow','blue','black'];

function randomColors(colors){
    // Déterminer aléatoirement différents codes composés de 4 couleurs parmi les 6 de l'array colors
    for (let i=0; i<4; i++){
        //let j=Math.floor(Math.random()*colors.length); 
        //code.push(colors[j]) // 1ère façon de le faire
        code.push(colors[Math.floor(Math.random()*colors.length)]) // 2ème façon de le faire
    }
}
console.log(code)
randomColors(colors) 
console.log(code) // pour n'obtenir que les codes à 4 couleurs (pas 1, ni 2, ni 3)

function checkClicks() {
    if (clicks < 4) {
        clicks++; //. incrémente si moins de 5 (cad concrètement continue à compléter la div/ligne guess en cours)
    } else {
        clicks = 1 // sinon reinitialise le compteur (cad concrètement passe à la div/ligne guess suivante);
        guessNumber++ // incrémente la ligne suivante à partir de 1 (car défini au-dessus)
        checkCode(); // met en route la fonction checkCode
        guess =[];
        turn++;
    }
}

colorOptions.forEach(btn => {
   console.log(btn)
   const color =  btn.id; // faire correspondre un bouton à chaque couleur de mon array Color
   console.log("color ?", btn.id)
   // A chaque couleur, faire correspondre un bouton qui permet de :
   // mettre en application la fonction pickColor quand on clique dessus
   // puis la fonction checkClicks
    btn.addEventListener('click', () => {
        guess.push(color)
        pickColor(color);
        checkClicks();
    });
});

function pickColor(color) {
   // prendre la couleur que l'on vient de cliquer
   // et la placer en fonction de round ET clicks
   // round permet de trouver la ligne de "Choose your code"
   // et clicks permet d'en trouver la colone
   console.log(color)
   console.log("guess > ", guessNumber);
   console.log("clicks > ", clicks);
   const guessLine = document.getElementById("guess-" + guessNumber);
   const targetColor = guessLine.querySelector(`.secretColor:nth-child(${clicks})`)
   console.log(targetColor);
   // targetColor.style.backgroundColor = color; 2ème option pour la ligne suivante
   targetColor.classList.add(color);   
}

function checkCode(){
    // trouver si la couleur (secretColor) choisie par le joueur 
    // correspond à la couleur choisie aléatoirement par la fonction randomColor
    // ==> ce qui implique la couleur + le placement dans l'array
    //for (let i=0; i<4; i++){

    const colorsOnlyCheck = []; 
    
    guess.forEach(function(color, index) {
        const hintLine = document.getElementById(`check-${turn}`); // définir une variable dans laquelle on sélectionne toutes les classes hint de la première ligne de vérif
        const hintsInTheLine = hintLine.querySelector('.hint:not(.locked)'); // définir une variable dans laquelle on sélectionne la première class hint de la première ligne de vérif
         // :not(.locked) pour sélectionner le hint suivant (celui qui n'est pas "bloqué") sinon on sélectionne toujours le même = le premier (car utilisation de querySelector et non pas querySelectorAll)
           
         if (code[index] === color) { // si l'emplacement ET la couleur du code défini aléatoirement et du code deviné sont identiques
            colorsOnlyCheck.push(color);

        hintsInTheLine.classList.add('green'); // la class hint devient vert (validé)
        hintsInTheLine.classList.add('locked'); // la class hint déjà vérifiée est "locké" afin que le loop aille sélectionner la prochaine class hint
      }
    })

    guess.forEach((color, index) => {
        const hintLine = document.getElementById(`check-${turn}`);
        const hintsInTheLine = hintLine.querySelector('.hint:not(.locked)');

        if (!colorsOnlyCheck.includes(color) && code.includes(color)){
            colorsOnlyCheck.push(color);
        
        hintsInTheLine.classList.add('blue'); // la class hint devient orange (à moitié validé...)
        hintsInTheLine.classList.add('locked'); // la class hint déjà vérifiée est "locké" afin que le loop aille sélectionner la prochaine class hint
        }
    })

//function checkCode2(){
    // déterminer si une couleur qui est dans le code deviné est dans le code défini aléatoirement 
    //if (guess[i].includes(try2.length)); 
    //    hintsInTheLine.classList.add('orange'); // la class hint devient vert (validé)
    //    hintsInTheLine.classList.add('locked'); 

    //const codeCopy = code.filter(word => word.length); (une façon de faire une copie)
    //const guessCopy = guess.filter(word => word.length);
    
    //let findTheMatch = guess.find(code[0]||code[1]||code[2]||code[3])

    //function checkCodeTwo(colors, index){ //  si l'emplacement OU la couleur du
    //code défini aléatoirement et du code deviné sont identiques
    //    const codeCopy = []
    //   const guessCopy = []

    //    if (codeCopy.includes(colors, index) && guessCopy.includes(colors,index)){
    //        hintsInTheLine.classList.add('green'); // la class hint devient ver
    // (validé)
    //        hintsInTheLine.classList.add('locked'); // la class hint déjà 
    //vérifiée est "locké" afin que le loop aille sélectionner la prochaine class 
    //hint 
        }


//function checkCode3(){}
    //  si l'emplacement ET la couleur du code défini aléatoirement et du code
    // deviné sont différents