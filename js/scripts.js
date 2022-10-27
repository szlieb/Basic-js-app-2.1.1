let pokemonRepository=(function () {
    let repository=[ {
        name: "Charmeleon", height: 1, types: ["grass", "water", "speed"],
    }

    ,
        {
        name: "Spearow", height: 3, types: ["water"],
    }

    ,
        {
        name: "Sandslash", height: 2, types: ["speed"],
    }

    ,
    ];

    // Creating the function to set loop of if's
    function add(pokemon) {
        if (typeof pokemon==="object"&& "name"in pokemon && "height"in pokemon && "types"in pokemon) {
            //This code will push pokemon list to the function
            repository.push(pokemon);
        }

        else {
            console.log("pokemon is not correct");
        }
    }

    //This should return all that is in the variable pokemonList
    function getAll() {
        return repository;
    }

    function addListItem(pokemon) {
        //target the class pokemon-list in the HTML file
        let pokemonList=document.querySelector(".pokemon-list");
        //Creat a list itmes on the ul class pokemon-list 
        let listpokemon=document.createElement("li");
        //creates buttons out of the UL list
        let button=document.createElement("button");
        // should i add the event listner here ?  addPokemonListener(button, pokemon);
        // pass in the pokemon names in the inner text of the button
        button.innerText=pokemon.name;
        /*DO  I PUT THE CSS LINK HERE? is this correct for the css linking line 47?*/
        button.classList.add("button-class"); 
        //pass the li into the button on the webpage
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }

   // creating this function to be used later on Is this the correct way to add event listner? see line 43 
    function addPokemonListener (button, pokemon) {
        button.addEventListener('click', function() {
                showDetails(pokemon);
        }

        )
    }

    //Add show details function
    function showDetails (pokemon) {
        console.log(pokemon.name);
    }

    return {
        //Return added items
        add: add,
        //get all items
        getAll: getAll,
        //Return the new list items
        addListItem: addListItem
    }

    ;
}

)();

//Adding new pokemon to my array
pokemonRepository.add( {
    name: "Kane", height: 0.5, types: ["nudnick"]
}

);
console.log(pokemonRepository.getAll()); //log array with new item

//function refrence
pokemonRepository.getAll().forEach(function (pokemon) {
    //Making the call to get the list items
    pokemonRepository.addListItem(pokemon);
}

);