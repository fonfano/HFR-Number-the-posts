// ==UserScript==
// @name        [HFR] Number the posts
// @namespace   github.com/fonfano
// @match       https://forum.hardware.fr/*
// @grant       none
// @version     0.1.0
// @author      Lt Ripley
// @description Numérote les posts d'une page
// ==/UserScript==


//  Historique
// 02/10/2020   Création.   v 0.1.0



let isUnder = false;    // Option de position du numéro de post dans la toolbar : false = à la suite à droite, true = en dessous

let toolbarColl = document.getElementsByClassName("toolbar");    // collection

let count = 1;

for (let toolBar of toolbarColl)  { 

  if (isUnder) {

    let newSpan = document.createElement('span');

    newSpan.textContent = "#" + count;

    //newP.style.fontWeight = 'bold';

    toolBar.append(newSpan);
  }


  else {

    let hashText = document.createTextNode('#'+count);

    toolBar.prepend(hashText);
  }

  count++;
}
