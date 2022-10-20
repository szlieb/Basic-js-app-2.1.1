let pokemanRepository = (function () {
    let pokemonList = [
        { name: "Charmeleon", height: "1", type: ["grass", "water", "speed"] },
        { name: "Spearow", height: "3", type: "water" },
        { name: "Sandslash", height: "2", type: "speed" },
    ];

    let getAll = function () {
        return pokemonList
    };

    let add = function (item) {
        
        if(typeof item == "object"){
            pokemonList.push (item);  
        }
    };
    
    return {
        getAll: getAll,
        add: add
    }
}) ();

pokemanRepository.getAll().forEach ( item => {
    
    if (item.height > 0 && item.height < 2) {
        document.write(
            "<h1>" +
                item.name +
                " (height: " +
                item.height +
                ") - This is a small Pokepmon!)</h1>"
        );
    } else if (item.height > 0.3 && item.height < 3) {
        document.write(
            "<h1>" +
            item. name +
                " (height: " +
                item .height +
                ") - This is a medium sized Pokemon!)</h1>"
        );
    } else {
        document.write(
            "<h1>" +
            item.name +
                " (height: " +
                item.height +
                ") - This is a large pokemon!)</h1>"
        );
    }
});


// // expect this to log the pokeman list
// console.log (pokemanRepository.getAll());
// console.log ("pokemanList size is " + pokemanRepository.getAll().length);
// // adding 1 pokeman object to the list
// pokemanRepository.add ( { name: "Kane", height: "5", type: "nudnick" })
// // expect this to log the pokeman list
// console.log (pokemanRepository.getAll());
// console.log ("pokemanList size is " + pokemanRepository.getAll().length);


//pokemonList.forEach ( item => console.log (item))



//the "for" will start the loop, the "let i=0" will set loop to start from "0". The pokemonList.length will go through the length of my PokemonList



    /*leaving this here for a placeholder for now will remove when i have time to add these to my personal notes */
/*let pokemon1 = {name:"Charmeleon", height:"1.1 m", type:"grass" };*/
/*
//Here is an example of a variable overwirting a prev one and a 1 line comment.
let myName = 'Bob';
document.write(myName);
myName = 'John Doe';
document.write(myName);


//Math example using JS for + numebrs
let simpleAddition = 2 + 2;
document.write(simpleAddition);


//Math example using JS for multipliing numbers and sizing
let size = 100;
let doubleSize = size * 2;
document.write(doubleSize);
let minSize = (doubleSize * 2) - (size / 2);
document.write(minSize);
*/

