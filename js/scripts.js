let pokemonRepository = (function () {
	// this will store all our pokamon items
    let pokemonList = [];
	// this saves the api url to get the LIST of pokamon items to a variable
    let listApiUrl="https://pokeapi.co/api/v2/pokemon/?limit=150";
	// this saves loader DOM element so we can hide and show it when necessary
    let loader=document.getElementById("loading");

	// calling this will show the loader
    function showLoader(){
        loader.classList.add ("loading-show");
        loader.classList.remove ("loading-hide");
    }
	
	// calling this will hide the loader
    function hideLoader(){
        loader.classList.add ("loading-hide");
        loader.classList.remove ("loading-show");
    }

	// this simply adds whatever the passed "item" is into the above "pokemonList" variable
    function add(item) {
        pokemonList.push(item)
    }

	// loads a all the pokomon items returned with calling the "listApiUrl" variable above
	// we are making sure to hide the loaded once complete whether sucessfully or failure (see catch)
	function loadList() {
        showLoader();
		// fetch will make the http request to "https://pokeapi.co/api/v2/pokemon/?limit=150"
        return fetch (listApiUrl).then(function(response) {      
			// at this point the request has been made and we are getting a response. 
			// we are taking whatever the response.json() returns and passing it along to the next function
            return response.json();
        }).then(function(json){
			// at this point we have our json blob, now we do not want the "count", "prev" or "next" fields. 
			// all we care about is the "results" field which will contain 150 pokamon items.
            let results= json.results;
            results.forEach(function(item) {
                // api returns "url" as the name of the details url. so will change it to be "detailsUrl" as requested in the course notes.
                let tranformed=transformListItem(item);
                add(tranformed);
            })
            console.log(pokemonList);
            hideLoader();
        }).catch(function(e) {
            hideLoader();
            console.error(e);
        });
    }

	// updates a existing pokomon item in our list by adding to fields to it. height and imgUrl.
    // we are making sure to hide the loaded once complete whether sucessfully or failure (see catch)
    function loadDetail(item) {
        showLoader();
		// call the detail url to get the height and imgurl
        return fetch (item.detailsUrl).then(function(response) {      
			// at this point the request has been made and we are getting a response. 
			// we are taking whatever the response.json() returns and passing it along to the next function
            return response.json();
        }).then(function(json) {
			// the json will contain lots of data. all we care about is the height and imgUrl which are choosing the first image in the sprites array.
			// we are updating the pokomon item here. we are adding two new fields to it - height and imgUrl
            item.height=json.height;
            item.imgUrl=json.sprites.back_default;
            showDetails(item);
            hideLoader();
        }).catch(function(e) {
            hideLoader();
            console.error(e);
        });
    }

    // api returns "url" as the name of the details url. so will change it to be "detailsUrl" as requested in the course notes.
    function transformListItem(item){
        return {
            name: item.name,
            detailsUrl: item.url
        }
    }
  
  

    //This should return all that is in the variable pokemonList
    function getAll() {
        return pokemonList;
    }

	// take a pokomon item and creates a html list out of them while also binding a click function to each one that will fetch more details via details api
    function addListItem(pokemon) {
        //target the class pokemon-list in the HTML file
        let pokemonList=document.querySelector(".pokemon-list");
        //Creat a list itmes on the ul class pokemon-list 
        let listpokemon=document.createElement("li");
        //creates buttons out of the UL list
        let button=document.createElement("button");
        // EVent listner
        addPokemonListener(button, pokemon);
        // pass in the pokemon names in the inner text of the button
        button.innerText=pokemon.name;
        /*Link button class to my CSS*/
        button.classList.add("button-class"); 
        //pass the li into the button on the webpage
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }

    // in addListItem function above, we are taking a button and adding a click listener to it. 
	// i.e, we are essentially saying, when the user will click on the button run the function loadDetail which will get the height and imgUrl
    function addPokemonListener (button, pokemon) {
        button.addEventListener('click', function() {
            loadDetail(pokemon);
        });
    }

    //Add show details function.
	// all this does is log the details to the console.
    function showDetails (pokemon) {
        console.log(pokemon);
    }
	
	// at this point we are done. but all our functions only live inside our function. outsider will have no access.
	// to solve this problem we are "export" all our functions so they can be called by others. 
	// i.e, pokemonRepository.loadList().then... below lives outside this function. so if we calls pokemonRepository he will now have access to the the loadList function to do what he needs.
    return {
        //Return added items
        add: add,
        //get all items
        getAll: getAll,
        //Return the new list items
        addListItem: addListItem,
        loadList: loadList,
        loadDetail:loadDetail
    }

    ;
}

)();
// this is the first thing in the code to run, and it will trigger the list to be loaded and once loaded it will trigger the html list items to be rendered in the page
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(item){
        pokemonRepository.addListItem(item);
    });
})