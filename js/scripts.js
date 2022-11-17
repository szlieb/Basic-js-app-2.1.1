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
            var $cardTitle = $(
                "<h4 class='card-title' >" + pokemon.name + "</h4>"
            );
            var $seeProfile = $(
                '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">View Profile</button>'
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
        let abilitiesElement = $(
            "<p>" + "abilities : " + item.abilities + "</p>"
        );

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
