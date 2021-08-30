// ==UserScript==
// @name        [HFR] Number the posts
// @namespace   github.com/fonfano
// @match       https://forum.hardware.fr/*
// @grant       none
// @version     0.4.5
// @author      Lt Ripley
// @description Numérote les posts des pages des topics HFR et rappelle le titre du topic
// ==/UserScript==


// Merci à Roger21 pour toute son aide précieuse sur HFR !

//  Historique
// 30/08/2021   Upgrade     v 0.4.5  Fonctionne dans les MPs
// 07/06/2021   Upgrade     v 0.4.4  Amélioration des marges (esthetique) 
// 23/05/2021   Upgrade     v 0.4.3  Ajout option pour tronquer le titre du sujet 
// 23/05/2021   Upgrade     v 0.4.2  Nouveau code pour récupérer le titre, fonctionne avec les caractères spéciaux
// 18/05/2021   Upgrade     v 0.4.1  Ajout de la possibilité de colorer le texte + simplification du code
// 18/05/2021   Upgrade     v 0.4.0  Ajout du titre du topic 
// 16/03/2020   Upgrade     v 0.3.0  Ajout du numéro de page
// 20/10/2020   Correction  v 0.2.2  Prise en charge des urls .htm
// 15/10/2020   Correction  v 0.2.1  Correction d'un bug : page qui plante quand le topic n'a qu'une seule page ('page' n'est pas présent dans l'URL).
// 07/10/2020   Upgrade.    v 0.2.0  Ajout du nombre total de post depuis le début du topic et changement de numérotation,
//                                   les posts en haut repris de la page d'avant ont le numéro 0
// 05/10/2020   Création.   v 0.1.0


// OPTIONS
let isUnder = false;            // Option de position du texte dans la toolbar : mettre false = à la suite à droite, mettre true = en dessous
let displayTotal = true;        // Option pour afficher à coté le total des posts depuis le début.  true = activé, False = désactivé
let displayPageNumber = true;   // Option pour afficher le numéro de page.  true = activé, False = désactivé
let displaySujet = true;        // Option pour afficher le titre du topic.  true = activé, False = désactivé
let numbersColour = '#000000';  // Option pour colorer les chiffres, exemples : '#000000' = noir d'origine, et '#F18F18' = orange HFR
let titleColour = '#F18F18';    // Option pour colorer le titre, exemples : '#000000' = noir d'origine, et '#F18F18' = orange HFR
let shortenTitleValue = 200;    // Option. Valeur en nombre de caractères pour tronquer le sujet.
//


let toolBarCollection = document.getElementsByClassName("toolbar");

if ( document.getElementById("md_arbo_tree_1") && document.getElementById("md_arbo_tree_b_1") ) {

  let url = document.location.href;
  var currentPageNumber = getCurrentPage(url);
  var totalPostsInFullPages = countTotalPostsInFullPages(currentPageNumber);
  if (displaySujet) {
    var sujet = getSujet();
    sujet = shortenTitle(sujet, shortenTitleValue);
  }
  
}

let count = 0;  // post

if (currentPageNumber < 2) { count++; }


for (let toolBar of toolBarCollection) {
  
  let text = 'msg '+count;

  if (displayTotal)  {
    text+= ' | total : '+ (totalPostsInFullPages+count);
  }

  if (displayPageNumber)  {
    text+= ' | page ' + (currentPageNumber);
  }
  
  let maDiv = document.createElement("div");

  maDiv.appendChild(document.createTextNode(text));  // nombres
  maDiv.style.color = numbersColour;

  if(displaySujet)  {
    let monSpan = document.createElement("span" );
    monSpan.appendChild(document.createTextNode(sujet)); // le titre du topic
    monSpan.style.marginLeft = "15px";
    monSpan.style.color = titleColour;
    maDiv.appendChild(monSpan);
  }

  if (!isUnder)  {  
    maDiv.setAttribute("class", "left" );
    //maDiv.style.cssFloat = "left";  // en lieu et place du setAttribute au dessus, pour la compat avec [HFR]Bookmarks avant la modif du dev
    maDiv.style.marginLeft = "12px";
    maDiv.style.marginTop = "2px";  // 2 ou 3 = milieu, 7 = en bas
    
    toolBar.insertBefore(maDiv, toolBar.querySelector("div.spacer" ));  // insérer avant le spacer qui est dessous
  }

  else {
    maDiv.style.marginLeft = "0px";
    toolBar.appendChild(maDiv);
  }

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


function getSujet ()  {
   
  if (document.querySelector("table.main th.padding > div.left > h3" ))  {
  return document.querySelector("table.main th.padding > div.left > h3" ).textContent.trim();
  }
    
  if (document.querySelector("#mesdiscussions > table.main > tbody > tr.cBackHeader.fondForum2Title > th.padding > h3"))  {
  return document.querySelector("#mesdiscussions > table.main > tbody > tr.cBackHeader.fondForum2Title > th.padding > h3").textContent.trim();
  }
  
}


function shortenTitle(title, index)  {
  
  let title2 = title.substring(0, index)
  
  if (title2 < title)  {title2 += '...'}
  
  return title2
}
