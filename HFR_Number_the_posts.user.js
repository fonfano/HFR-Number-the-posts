// ==UserScript==
// @name        [HFR] Number the posts
// @namespace   github.com/fonfano
// @match       https://forum.hardware.fr/*
// @grant       none
// @version     0.2.1
// @author      Lt Ripley
// @description Numérote les posts des pages des topics HFR
// ==/UserScript==


//  Historique
// 15/10/2020   Correction  v 0.2.1  Correction d'un bug : page qui plante quand le topic n'a qu'une seule page ('page' n'est pas présent dans l'URL).
// 07/10/2020   Upgrade.    v 0.2.0  Ajout du nombre total de post depuis le début du topic et changement de numérotation,
//                                   les posts en haut repris de la page d'avant ont le numéro #0
// 05/10/2020   Création.   v 0.1.0



let isUnder = false; // Option de position du numéro de post dans la toolbar : mettre false = à la suite à droite, mettre true = en dessous
let totalToo = true; // Option pour afficher à coté le total des posts depuis le début.  Mettre true = oui, false = non,


let toolbarCollection = document.getElementsByClassName("toolbar");

if ( document.getElementById("md_arbo_tree_1") && document.getElementById("md_arbo_tree_b_1") ) {

    let url = document.location.href;
    var currentPageNumber = getCurrentPage(url);
    var totalPostsInFullPages = countTotalPostsInFullPages(currentPageNumber);

}


let count = 0;

if (currentPageNumber == 1 || currentPageNumber == 0) {
        count++;
}

for (let toolBar of toolbarCollection) {

    let text = '#'+count;
    if (totalToo) {
        text+=' | Total : '+(totalPostsInFullPages+count);
    }
    let textToDisplay = document.createTextNode(text);

    if (isUnder) {
        toolBar.append(textToDisplay);
    }

    else {
        toolBar.prepend(textToDisplay);
    }
    count++;
}



function getCurrentPage(url) {

    let pageNumberString = "";

    if (url.includes('page') ) {

            let index = url.indexOf('page')+5;

            while (url.charAt(index) != '&') {
                pageNumberString += url.charAt(index).toString();
                index++;
            }
    }
    else { pageNumberString = "0";}

  return Number(pageNumberString);


}

function countTotalPostsInFullPages(numberOfPages) {

    let totalOfPosts=0;
    if (numberOfPages > 1 ) {
        totalOfPosts =(numberOfPages-1)*40;
    }
    else {totalOfPosts = 0;}

    return totalOfPosts;
}
