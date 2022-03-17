// Je défini mes constantes
const inputsCouleur = document.querySelectorAll(".inp-couleur");
const inputRange = document.querySelector(".inp-range");
const btns = document.querySelectorAll("button");
const fond = document.body;
const containerCouleurs = document.querySelector(".container-couleurs");
const span = document.querySelector("span");
const btnRandom = document.querySelector(".random");

//? Démarage

// J'initialise les valeurs pour remplir les inputs
let valCouleurs = ["#BA5370", "#F4E2D8"];
let inclinaison = 45;
let index = 3;

inputsCouleur[0].value = valCouleurs[0];
inputsCouleur[1].value = valCouleurs[1];

// J'applique le style des mes valeurs aux visuels
inputsCouleur[0].style.background = valCouleurs[0];
inputsCouleur[1].style.background = valCouleurs[1];

// J'applique le dégradé à mon fond
fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs}`;
// autre possibilitée
// fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs[0]}, ${valCouleurs[1]})`;

//? Inclinaison

inputRange.addEventListener("input", (e) => {
	// La range va de 0 à 100 donc pour générer une inclinaison sur 360 degré je multiplie par 3,6 (meme si on aurait pu modifier les valeurs de la range)
	inclinaison = e.target.value * 3.6;
	fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
});

//? Rajout / Suppression de couleurs

// j'écoute le click sur mes boutons
btns.forEach((btn) => {
	btn.addEventListener("click", rajouteEnleve);
});

function rajouteEnleve(e) {
	span.innerText = "";
	const allInputs = document.querySelectorAll(".inp-couleur");

	// je crée ma constante randomColor et je lui applique une formule pour générer un format hexadecimale.
	const randomColor = Math.floor(Math.random() * 16777215).toString(16);
	// console.log(randomColor);

	// Si jamais la valeur du bouton est "plus", alors si mon nombre d'inputs est supérieur ou egale a 7 je retoune ma valeur, sinon j'aoute une nouvelle couleur
	if (e.target.className === "plus") {
		if (allInputs.length >= 7) {
			return;
		}

		// je crée ma nouvelle couleur et je lui donne des attributs pour la rendre identifiable.
		const nvCouleur = document.createElement("input");
		nvCouleur.setAttribute("class", "inp-couleur");
		nvCouleur.setAttribute("data-index", index);
		nvCouleur.setAttribute("maxlength", 7);
		nvCouleur.value = `#${randomColor.toUpperCase()}`;
		nvCouleur.style.background = `#${randomColor}`;
		containerCouleurs.appendChild(nvCouleur);
		valCouleurs.push(`#${randomColor.toUpperCase()}`);

		// MAJ du fond.
		fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
		index++;
	} else if (e.target.className === "moins") {
		if (valCouleurs.length === 2) {
			span.innerText = "Il faut au moins deux couleurs !";
		} else {
			valCouleurs.pop();
			allInputs[allInputs.length - 1].remove();
			index--;
			fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
		}
	}

	// MAJ des inputs
	allInputs.forEach((inp) => {
		inp.addEventListener("input", majCouleurs);
	});
}

// MAJ inputs de bases
inputsCouleur.forEach((inp) => {
	inp.addEventListener("input", majCouleurs);
});

function majCouleurs(e) {
	let indexEnCours = e.target.getAttribute("data-index");
	e.target.value = e.target.value.toUpperCase();
	valCouleurs[indexEnCours - 1] = e.target.value.toUpperCase();
	e.target.style.background = valCouleurs[indexEnCours - 1];
	fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
}

//? Random

btnRandom.addEventListener("click", () => {
	const inputs = document.querySelectorAll(".inp-couleur");
	for (let i = 0; i < valCouleurs.length; i++) {
		valCouleurs[i] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
		inputs[i].value = valCouleurs[i].toUpperCase();
		inputs[i].style.background = valCouleurs[i].toUpperCase();
		fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
	}
});
