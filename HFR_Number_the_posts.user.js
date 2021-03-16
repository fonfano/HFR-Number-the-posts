// ==UserScript==
// @name        [HFR] Number the posts
// @namespace   github.com/fonfano
// @match       https://forum.hardware.fr/*
// @grant       none
// @version     0.3.0
// @author      Lt Ripley
// @description Numérote les posts des pages des topics HFR
// ==/UserScript==


//  Historique
// 16/03/2020   Upgrade     v 0.3.0  Ajout du numéro de page
// 20/10/2020   Correction  v 0.2.2  Prise en charge des urls .htm
// 15/10/2020   Correction  v 0.2.1  Correction d'un bug : page qui plante quand le topic n'a qu'une seule page ('page' n'est pas présent dans l'URL).
// 07/10/2020   Upgrade.    v 0.2.0  Ajout du nombre total de post depuis le début du topic et changement de numérotation,
//                                   les posts en haut repris de la page d'avant ont le numéro #0
// 05/10/2020   Création.   v 0.1.0



let isUnder = false; // Option de position des numéros de post dans la toolbar : mettre false = à la suite à droite, mettre true = en dessous
let totalToo = true; // Option pour afficher à coté le total des posts depuis le début.  Mettre true = oui, false = non,
let pageNumber = true;  // Option pour afficher le numéro de page.  True = activé, False = désactivé


let toolbarCollection = document.getElementsByClassName("toolbar");

if ( document.getElementById("md_arbo_tree_1") && document.getElementById("md_arbo_tree_b_1") ) {

    let url = document.location.href;
    var currentPageNumber = getCurrentPage(url);
    var totalPostsInFullPages = countTotalPostsInFullPages(currentPageNumber);
}

let count = 0;  // post

if (currentPageNumber < 2) {
        count++;
}


for (let toolBar of toolbarCollection) {

    let text = 'msg '+count;
    if (totalToo) {
        text+=' | total : '+ (totalPostsInFullPages+count);
    }
    if (pageNumber)  {
      text+= ' | page ' + (currentPageNumber);
    }
    let textToDisplay = document.createTextNode(text);

    isUnder ? toolBar.append(textToDisplay) : toolBar.prepend(textToDisplay);

    count++;
}


function getCurrentPage(url) {  // recup le numero de page
                                // 2 ifs pour 2 types d'url selon qu'on vienne de la page des drapals ou non
    let pageNumberString = "";

    if (url.includes('page=') ) {

            let index = url.indexOf('page=')+5;

            while (url.charAt(index) != '&') {
                pageNumberString += url.charAt(index).toString();
                index++;
            }
    }

    else { pageNumberString = "0";}

    if (url.includes('.htm') ) {

        pageNumberString = "";

        let index2 = url.lastIndexOf('_')+1;

        while (url.charAt(index2) != '.') {
            pageNumberString += url.charAt(index2).toString();
            index2++;
        }
    }

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
