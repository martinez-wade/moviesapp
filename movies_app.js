"use strict";


// FETCH ALL movies
$(document).ready(function(){


const movies = () => {
    const URL = "https://lean-imported-ballcap.glitch.me/movies";
    return fetch(URL).then(res => res.json());

}
movies();

const renderMovieHTML = () => {
    console.log("Rendering movies HTML")
    movies().then((data) => {
        $('.loader').hide();
        console.log("HI HI");
        console.log(data);
        let MovieCards = data.map(movie => {
            return `
            <div>
            <h3>Title: ${movie.title}</h3>
            <p>Director: ${movie.director}</p>
            <p>Rating: ${movie.rating}</p>
            <button data-id="${movie.id}" data-title="${movie.title}" data-director="${movie.director}" data-rating="${movie.rating}" class="edit">Edit</button>
            <button data-id="${movie.id}"class="delete">Delete</button>
            </div>
            `

        })

        const editbut = document.getElementById("library").innerHTML = MovieCards.join("");

        return data;
    }).then((data) => {
        console.log(data)
        // renderSongHTML();

        // FETCH A SONG BY ID

        const getMovieById = (id) => {
            const URL = `https://lean-imported-ballcap.glitch.me/movies/ ${id}`;
            return fetch(URL).then(res => res.json()).then(res => console.log(res));
        }
        $('.delete').click(function() {
            let deletedID = $(this).attr('data-id')
            deleteMovie(deletedID);

        })


        //edit button!
        $(".edit").click(function () {
            const ID= $(this).attr("data-id")
            console.log(ID);
            $('#editForm').html(`<form class="card bg-warning form-floating ">New Title<input id="title1" class='inputedit' type='text' value="${$(this).attr("data-title")}">New Director<input id="director1" class='editd' type='text' value="${$(this).attr("data-director")}"> Your Rating<input class='editd' id="rating1" type='number' value="${$(this).attr("data-rating")}" min="1" max="5"> <input type="hidden" value="${ID}" id="editedID"><button class="addchange">submit</button></form> `)
            $(".addchange").click(function(){
                let movieID = $("#editedID").val()
                console.log(movieID)
                const URL = `https://lean-imported-ballcap.glitch.me/movies/${movieID}`;
                console.log(URL);
                // fetch(URL).then(res=>res.json()).then(result => result)
                let editedMovie = {
                    id: movieID,
                    title:  $("#title1").val(),
                    director: $("#director1").val(),
                    rating: $("#rating1").val()
                }
                editMovie(editedMovie)
                console.log(editedMovie);




                // let deleted = $('.delete').click(function(){
                //     return movie.id
                // })
            });

        });
    })


}



renderMovieHTML();


// Editing button functionaility
const editMovie = (movie) => {
    const URL = "https://lean-imported-ballcap.glitch.me/movies";
    let options = {
        method: "PATCH",
        headers: {
            // Content-Type : tells the server what type of data we are sending with our request. When interacting with a JSON API, this will usually be in application/json.
            'Content-Type': 'application/json' // establishing the format in which we send the data.
        },
        body: JSON.stringify(movie) // convert the JS object into a JSON String before sending it to the server.
    }

    return fetch(`${URL}/${movie.id}`, options).then(resp => resp.json()).then(() => renderMovieHTML())
}




// editSong(editedSong);

// POST REQUEST

const addMovie = (movieObj) => {
    const URL = "https://lean-imported-ballcap.glitch.me/movies";
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieObj)
    }
    return fetch(URL, options).then(res => res.json()).then(result => console.log("You've successfully created a new movie!", result))
}


// Whenever the "Add Song" button is clicked, create new object based on the input fields.
document.getElementById("addMovie").addEventListener("click", function (e) {
    e.preventDefault();
    let newMovie = {
        title: document.getElementById("title").value,
        director: document.getElementById("director").value,
        rating: document.getElementById("rating").value

    }
    addMovie(newMovie).then((res) => {
        console.log(res)
        renderMovieHTML()
    })
})


// DELETE METHOD

const deleteMovie = (id) => {
    const URL = `https://lean-imported-ballcap.glitch.me/movies`;
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${URL}/${id}`, options).then(() => console.log("The movie has been deleted successfully")).then(renderMovieHTML)
}

// deleteMovie();




//END JQUERY DON"T GO UNDER
});