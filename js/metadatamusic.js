// function that retrieve all the metadata and stock in in objects
function retrieveData(article_id) {
    
    // variable declaration
    let art_retrieved = document.getElementById(article_id),
        artData = {people: {}, places: {}, companies: {}, videogames: {} },
        people = art_retrieved.getElementsByClassName("mention person"),
        places = art_retrieved.getElementsByClassName("mention place"),
        companies = art_retrieved.getElementsByClassName("mention company"),
        videogames = art_retrieved.getElementsByClassName("mention videogame");
 
    // frequency distribution computation
    for (let i=0; i<people.length; i++) {
        newPerson = people[i].getAttribute("about");
        if(newPerson in artData["people"]) {
            artData["people"][newPerson] += 1;
        } else {
            artData["people"][newPerson] = 1;
        }
    }

    for (let i=0; i<places.length; i++) {
        newPlace = places[i].getAttribute("about");
        if(newPlace in artData["places"]) {
            artData["places"][newPlace] += 1;
        } else {
            artData["places"][newPlace] = 1;
        }
    }

    for (let i=0; i<videogames.length; i++) {
        newVideogame = videogames[i].getAttribute("about");
        if(newVideogame in artData["videogames"]) {
            artData["videogames"][newVideogame] += 1;
        } else {
            artData["videogames"][newVideogame] = 1;
        }
    }

    for (let i=0; i<companies.length; i++) {
        newCompany = companies[i].getAttribute("about");
        if(newCompany in artData["companies"]) {
            artData["companies"][newCompany] += 1;
        } else {
            artData["companies"][newCompany] = 1;
        }
    }
    return artData;
}

// constants declaration
const article1 = document.getElementById("article-1"), 
    article2 = document.getElementById("article-2"), 
    article3 = document.getElementById("article-3");

var highlightName = "";
var highlightAccordion;
var oldCategory = "";

function highlightData(art, data) {
    
    // retrieve the actual stylesheet and select highlight color
    let themeLink = document.getElementsByTagName('link')[1].href.split("/");
    let themeRaw = themeLink[themeLink.length-1];
    let theme = themeRaw.split(".")[0];
    let highlightColor;
    switch (theme) {
        case "home":
            highlightColor = "#FFFFFF";
            break;
        case "past":
            highlightColor = "#adaedc";
            break;
        case "futurism":
            highlightColor = "#D7D8BF";
            break;
        case "present":
            highlightColor = "#A89D8E";
            break;
        case "future":
            highlightColor = "#9aaee2";
            break;
    }

    // retrieve the article space in which the navigation happens
    let navSpace;
    switch(art) {
        case 1:
            navSpace = article1;
            break;
        case 2:
            navSpace = article2;
            break;
        case 3:
            navSpace = article3;
            break;
    }

    // retrieve data
    let newCategory = data.getAttribute("class").split("-")[0],
        text = data.innerHTML.split(": "),
        name = text[0],
        freq = parseInt(text[1].match(/\d+/g)[0]),
        clickCounterEl = data.childNodes[1],
        clicks = clickCounterEl.innerHTML.replace(/[()]+/g, ""),
        newQuery, oldQuery;
    
    if (clicks === "") {
        clicks = 0;
    }

    // retrieve the new category of data
    switch(newCategory) {
        case "people":
            newQuery = `span.person[about^="${name}"]`;
            break;
        case "companies":
            newQuery = `span.company[about^="${name}"]`;
            break;
        case "videogames":
            newQuery = `span.videogame[about^="${name}"]`;
            break;
        case "places":
            newQuery = `span.place[about^="${name}"]`;
            break;
    } 
    
    // if category is different, then clear all previous highlights
    if (!(oldCategory == newCategory) || !(highlightName == name)) {
        if (!(highlightName == "")) {
            switch (oldCategory) {
                case "people":
                    oldQuery = `span.person[about^="${highlightName}"]`;
                    break;
                case "companies":
                    oldQuery = `span.company[about^="${highlightName}"]`;
                    break;
                case "videogames":
                    oldQuery = `span.videogame[about^="${highlightName}"]`;
                    break;
                case "places":
                    oldQuery = `span.place[about^="${highlightName}"]`;
                    break;
            }
            clearAll(oldQuery, highlightName, highlightAccordion, navSpace);
        } else {
            oldCategory = newCategory;
        }
    } 

    let newTags = navSpace.querySelectorAll(newQuery);

    if (highlightName == name || highlightName == "") {

        if (clicks<freq) {

            let next = newTags[clicks];
            highlightNew(name, data, highlightColor, next);
            clicks++;
            clickCounterEl.innerHTML = `(${clicks})`;
           
        } else if (clicks == freq) {

            selectAll(newQuery, highlightName, highlightAccordion, navSpace);
            highlightName = "";
            data.style.backgroundColor = "transparent";
            clickCounterEl.innerHTML = "";
            alert(`There aren't any other ${name} occurences in the article.`);
            
        } else {
            console.log("out of range");
        }
    } else {
        // se entra qua vuol dire che è la prima volta che vede quel nuovo nome
        clearAll(oldQuery, highlightName, highlightAccordion, navSpace);
        let next = newTags[clicks];
        highlightNew(name, data, highlightColor, next);
        clicks++;
        clickCounterEl.innerHTML = `(${clicks})`;
    }
    oldCategory = newCategory;
}


function highlightNew(name, data, highlightColor, next) {
        next.scrollIntoView({behavior: "auto", block: "center", inline: "start"});
        next.style.backgroundColor = highlightColor;
        highlightName = name;
        highlightAccordion = data;
}

function clearAll(oldQuery, highlightName, highlightAccordion, navSpace) {
    if (!(highlightName == "")) {
        let oldTags = navSpace.querySelectorAll(oldQuery);
        for (let i=0; i < oldTags.length; i++) {
            oldTags[i].style.backgroundColor = "transparent";
        }
    }
    if (!(highlightAccordion == "")) {
        highlightAccordion.childNodes[1].innerHTML = "";
        highlightAccordion.style.backgroundColor = "transparent"
    }
}
