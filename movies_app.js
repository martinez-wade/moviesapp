"use strict";



// FETCH ALL SONGS


const movies = () => {
    const URL = "https://lean-imported-ballcap.glitch.me/movies";
    return fetch(URL).then(res => res.json());

}
movies();

const renderMovieHTML = () => {
    console.log("Rendering movies HTML")
    movies().then((data) => {
        console.log(data);
        let MovieCards = data.map(movie => {
            return `
            <div id="new">
            <h3>Title: ${movie.title}</h3>
            <p>Artist: ${movie.director}</p>
            <p>Rating: ${movie.rating}</p>
            <button data-id="${movie.id}" data-title="${movie.title}" data-director="${movie.director}" data-rating="${movie.rating}" class="edit">Edit</button>
            <button data-id="${movie.id}"class="delete">Delete</button>
            </div>
            `
        })

  const editbut =   document.getElementById("library").innerHTML = MovieCards.join("");
        console.log(editbut);
        return data;
    }).then((data) => {
        console.log(data)
        // renderSongHTML();

        // FETCH A SONG BY ID

        const getMovieById = (id) => {
            const URL = `https://lean-imported-ballcap.glitch.me/movies/ {id}`;
            return fetch(URL).then(res => res.json()).then(res => console.log(res));
        }
        $(".edit").click(function(){
           console.log($(this).attr("data-id"));
            $('#new').append(`<form>title<input class='inputedit' type='text' value="${$(this).attr("data-title")}"> </form><form>director<input class='editd' type='text' value="${$(this).attr("data-director")}"> </form><form>rating<input class='editd' type='text' value="${$(this).attr("data-rating")}"> </form> <button class="addchange">submit</button>`)
            $(".addchange").click(renderMovieHTML)

            console.log(data[0].title);
        });
            $('#new').append(`<form>title<input class='inputedit' type='text' value="${data.title}"> </form><form>director<input class='editd' type='text'> </form><form>rating<input class='editd' type='text'> </form> <button>submit</button>`)
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

    return fetch(`${URL}/${movie.id}`, options).then(resp => resp.json().then())
}

let editedMovie = {
    tittle: 1,
    title: "TNT",
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
    const URL = "https://lean-imported-ballcap.glitch.me/movies";
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${URL}/${id}`, options).then(() => console.log("The movie has been deleted successfully")).then(renderMovieHTML)
}

deleteMovie(1);