let pokemonList = [
    { name: "Charmeleon", height: "1", type: ["grass", "water", "speed"] },
    { name: "Spearow", height: "3", type: "water" },
    { name: "Sandslash", height: "2", type: "speed" },
];

//the "for" will start the loop, the "let i=0" will set loop to start from "0". The pokemonList.length will go through the length of my PokemonList

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 0 && pokemonList[i].height < 2) {
        document.write(
            "<h1>" +
                pokemonList[i].name +
                " (height: " +
                pokemonList[i].height +
                ") - This is a small Pokepmon!)</h1>"
        );
    } else if (pokemonList[i].height > 0.3 && pokemonList[i].height < 3) {
        document.write(
            "<h1>" +
                pokemonList[i].name +
                " (height: " +
                pokemonList[i].height +
                ") - This is a medium sized Pokemon!)</h1>"
        );
    } else {
        document.write(
            "<h1>" +
                pokemonList[i].name +
                " (height: " +
                pokemonList[i].height +
                ") - This is a large pokemon!)</h1>"
        );
    }
}






    
    /*leavin gthis here for a placeholder ofr now will remove when i have time to add these to my personal notes */
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

