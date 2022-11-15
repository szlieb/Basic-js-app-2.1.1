var pokemonRepository = (function () {
    // this will store all our pokmon items
    var repository = [];
    // this saves the api url to get the LIST of pokemon items to a variable
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "detailsUrl" in pokemon
      ) {
        repository.push(pokemon);
      } else {
        console.log("add an object");
      }
    }
    function getAll() {
      return repository;
    }
    function addListItem(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
        var $list = $(".list");
  
        var $card = $('<div class="card" style="width:200px"></div>');
        var $image = $(
          '<img class="card-img-top" alt="Card image" style="width:50%" />'
        );
        $image.attr("src", pokemon.imageUrlFront);
        var $cardBody = $('<div class="card-body"></div>');
        var $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
        var $seeProfile = $(
          '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
        );
  
        $list.append($card);
        //adding image to each card
        $card.append($image);
        $card.append($cardBody);
        $cardBody.append($cardTitle);
        $cardBody.append($seeProfile);
  
        $seeProfile.on("click", function (event) {
          showDetails(pokemon);
        });
      });
    }
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        console.log(item);
        showModal(item);
      });
    }
    function loadList() {
      return $.ajax(apiUrl)
        .then(function (json) {
          json.results.forEach(function (item) {
            var pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
            console.log(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  
    function loadDetails(item) {
      var url = item.detailsUrl;
      return $.ajax(url)
        .then(function (details) {
          // add details to the item
          item.imageUrlFront = details.sprites.front_default;
          item.imageUrlBack = details.sprites.back_default;
          item.height = details.height;
          // loop each ofthe pokemon types
          item.types = [];
          for (var i = 0; i < details.types.length; i++) {
            item.types.push(details.types[i].type.name);
          }
    
         
          // loop to get abilities of a selected pokemon
          item.abilities = [];
          for (var i = 0; i < details.abilities.length; i++) {
            item.abilities.push(details.abilities[i].ability.name);
          }
  
          item.weight = details.weight;
        })
        .catch(function (e) {
          console.error(e);
        });
    }
    // show the modal content
    function showModal(item) {
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      let modalHeader = $(".modal-header");
      modalTitle.empty();
      modalBody.empty();
  
      // creating element for name in modal
      let nameElement = $("<h1>" + item.name + "</h1>");
      // creating img in modal
      let imageElementFront = $('<img class="modal-img" style="width:50%">');
      imageElementFront.attr("src", item.imageUrlFront);
      let imageElementBack = $('<img class="modal-img" style="width:50%">');
      imageElementBack.attr("src", item.imageUrlBack);
      // creating element for height in modal
      let heightElement = $("<p>" + "height : " + item.height + "</p>");
      // creating element for weight in modal
      let weightElement = $("<p>" + "weight : " + item.weight + "</p>");
      // creating element for type in modal
      let typesElement = $("<p>" + "types : " + item.types + "</p>");
      // creating element for abilities in modal
      let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");
  
      modalTitle.append(nameElement);
      modalBody.append(imageElementFront);
      modalBody.append(imageElementBack);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
      modalBody.append(abilitiesElement);
    }
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal,
    };
  })();
  pokemonRepository.loadList().then(function () {
    // data gets loaded
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });




/*old ocde*/
// let pokemonRepository = (function () {
//     // this will store all our pokmon items
//     let pokemonList = [];
//     // this saves the api url to get the LIST of pokemon items to a variable
//     let listApiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
//     // this simply adds whatever the passed "item" is into the above "pokemonList" variable
//     function add(item) {
//         pokemonList.push(item);
//     }
//     // loads a all the pokomon items returned with calling the "listApiUrl" variable above
//     // we are making sure to hide the loaded once complete whether sucessfully or failure (see catch)
//     function loadList() {
//         showLoader();
//         // fetch will make the http request to "https://pokeapi.co/api/v2/pokemon/?limit=150"
//         return fetch(listApiUrl)
//             .then(function (response) {
//                 // at this point the request has been made and we are getting a response.
//                 // we are taking whatever the response.json() returns and passing it along to the next function
//                 return response.json();
//             })
//             .then(function (json) {
//                 // at this point we have our json blob, now we do not want the "count", "prev" or "next" fields.
//                 // all we care about is the "results" field which will contain 150 pokemon items.
//                 let results = json.results;
//                 results.forEach(function (item) {
//                     // api returns "url" as the name of the details url. so will change it to be "detailsUrl" as requested in the course notes.
//                     let tranformed = transformListItem(item);
//                     add(tranformed);
//                 });
//                 console.log(pokemonList);
//                 hideLoader();
//             })
//             .catch(function (e) {
//                 hideLoader();
//                 console.error(e);
//             });
//     }
//     //This should return all that is in the variable pokemonList
//     function getAll() {
//         return pokemonList;
//     }
//     //modal

//     let modalContainer = document.querySelector("#modal-container");

//     function showModal(pokemon) {
//         modalContainer.innerHTML = "";
//         let modal = document.createElement("div");
//         modal.classList.add("modal");
//         //start adding modal content
//         let closeButtonElement = document.createElement("button");
//         closeButtonElement.classList.add("modal-close");
//         closeButtonElement.innerText = "Close";
//         closeButtonElement.addEventListener("click", hideModal);
//         let titleElement = document.createElement("h1");
//         (titleElement.innerText = pokemon.name), pokemon.imgUrl;
//         let contentElement = document.createElement("p");
//         contentElement.innerText = `height: ${pokemon.height}`;
//         let pokemonImg = document.createElement("img");
//         pokemonImg.classList.add("img-elements");
//         pokemonImg.src = pokemon.imgUrl;
//         modal.appendChild(closeButtonElement);
//         modal.appendChild(titleElement);
//         modal.appendChild(pokemonImg);
//         modal.appendChild(contentElement);
//         modalContainer.appendChild(modal);
//         modalContainer.classList.add("is-visible");
//         modalContainer.addEventListener("click", (e) => {
//             let target = e.target;
//             if (target === modalContainer) {
//                 hideModal();
//             }
//         });
//     }

//     function hideModal() {
//         let modalContainer = document.querySelector("#modal-container");
//         modalContainer.classList.remove("is-visible");
//     }
//     window.addEventListener("keydown", (e) => {
//         let modalContainer = document.querySelector("#modal-container");
//         if (
//             e.key === "Escape" &&
//             modalContainer.classList.contains("is-visible")
//         ) {
//             hideModal();
//         }
//     });
//     modalContainer.addEventListener("click", (e) => {
//         // Since this is also triggered when clicking INSIDE the modal
//         // We only want to close if the user clicks directly on the overlay
//         let target = e.target;
//         if (target === modalContainer) {
//             hideModal();
//         }
//     });

//     // in addListItem function above, we are taking a button and adding a click listener to it.
//     // i.e, we are essentially saying, when the user will click on the button run the function loadDetail which will get the height and imgUrl
//     function addPokemonListener(button, pokemon) {
//         button.addEventListener("click", function () {
//             loadDetail(pokemon);
//         });
//     }

//     // this saves loader DOM element so we can hide and show it when necessary
//     let loader = document.getElementById("loading");
//     // calling this will show the loader
//     function showLoader() {
//         loader.classList.add("loading-show");
//         loader.classList.remove("loading-hide");
//     }
//     // calling this will hide the loader
//     function hideLoader() {
//         loader.classList.add("loading-hide");
//         loader.classList.remove("loading-show");
//     }

//     // updates a existing pokomon item in our list by adding to fields to it. height and imgUrl.
//     // we are making sure to hide the loaded once complete whether sucessfully or failure (see catch)
//     function loadDetail(item) {
//         showLoader();
//         // call the detail url to get the height and imgurl
//         return fetch(item.detailsUrl)
//             .then(function (response) {
//                 // at this point the request has been made and we are getting a response.
//                 // we are taking whatever the response.json() returns and passing it along to the next function
//                 return response.json();
//             })
//             .then(function (json) {
//                 // the json will contain lots of data. all we care about is the height and imgUrl which are choosing the first image in the sprites array.
//                 // we are updating the pokomon item here. we are adding two new fields to it - height and imgUrl
//                 item.imgUrl = json.sprites.front_default;
//                 item.height = json.height;
//                 showModal(item);
//                 hideLoader();
//             })
//             .catch(function (e) {
//                 hideLoader();
//                 console.error(e);
//             });
//     }
//     // api returns "url" as the name of the details url. so will change it to be "detailsUrl" as requested in the course notes.
//     function transformListItem(item) {
//         return {
//             name: item.name,
//             detailsUrl: item.url,
//         };
//     }
//     /*//This should return all that is in the variable pokemonList
//             function getAll() {
//                 return pokemonList;
//             }*/
//     // take a pokomon item and creates a html list out of them while also binding a click function to each one that will fetch more details via details api
//     function addListItem(pokemon) {
//         //target the class pokemon-list in the HTML file
//         let pokemonList = document.querySelector(".pokemon-list");
//         //Creat a list itmes on the ul class pokemon-list
//         let listpokemon = document.createElement("li");
//         //creates buttons out of the UL list
//         let button = document.createElement("button");
//         // EVent listner
//         addPokemonListener(button, pokemon);
//         // pass in the pokemon names in the inner text of the button
//         button.innerText = pokemon.name;
//         //*Link button class to my CSS*/
//         button.classList.add("button-class");
//         //pass the li into the button on the webpage
//         listpokemon.appendChild(button);
//         pokemonList.appendChild(listpokemon);
//     }

//     // at this point we are done. but all our functions only live inside our function. outsider will have no access.
//     // to solve this problem we are "export" all our functions so they can be called by others.
//     // i.e, pokemonRepository.loadList().then... below lives outside this function. so if we calls pokemonRepository he will now have access to the the loadList function to do what he needs.
//     return {
//         //Return added items
//         add: add,
//         //get all items
//         getAll: getAll,
//         //Return the new list items
//         addListItem: addListItem,
//         loadList: loadList,
//     };
// })();
// // this is the first thing in the code to run, and it will trigger the list to be loaded and once loaded it will trigger the html list items to be rendered in the page
// pokemonRepository.loadList().then(function () {
//     pokemonRepository.getAll().forEach(function (pokemon) {
//         pokemonRepository.addListItem(pokemon);
//     });
// });
