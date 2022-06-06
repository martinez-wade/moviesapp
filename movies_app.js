"use strict";



// FETCH ALL SONGS


const movies = () => {
    const URL = "https://lean-imported-ballcap.glitch.me/movies";
    return fetch(URL).then(res => res.json());

}
movies();

const renderSongHTML = () => {
    console.log("Rendering song HTML")
    movies().then((data) => {
        console.log(data);
        let songCards = data.map(movie => {
            return `
            <div>
            <h3>Title: ${movie.title}</h3>
            <p>Artist: ${movie.director}</p>
            <p>Rating: ${movie.rating}</p>
            <button data-id="${movie.id}">Edit</button>
            <button data-id="${movie.id}">Delete</button>
            </div>
            `
        })
        console.log(songCards);
        document.getElementById("library").innerHTML = songCards.join("");
    })
}
renderSongHTML();

// // FETCH A SONG BY ID
//
// const getSongById = (id) => {
//     const URL = `https://acoustic-little-chive.glitch.me/songs/${id}`;
//     return fetch(URL).then(res => res.json()).then(res => console.log(res));
// }
//
// getSongById(8);


// EDIT (PUT vs PATCH)

// PUT method - requires you to resubmit the entire entity.
// PATCH method - only edits properties that currently exist in the entity.


// PUT METHOD

// const editSong = (song) => {
//     const URL = "https://acoustic-little-chive.glitch.me/songs";
//     let options = {
//         method: "PUT",
//         headers: {
//             // Content-Type : tells the server what type of data we are sending with our request. When interacting with a JSON API, this will usually be in application/json.
//             'Content-Type': 'application/json' // establishing the format in which we send the data.
//         },
//         body: JSON.stringify(song) // convert the JS object into a JSON String before sending it to the server.
//     }
//
//     return fetch(`${URL}/${song.id}`, options).then(resp => resp.json())
// }
//
// let editedSong = {
//     id: 1,
//     title: "Dirty Deeds",
//     artist: "ACDC"
// }
//
// editSong(editedSong);

// PATCH METHOD

// const editSong = (song) => {
//     const URL = "https://acoustic-little-chive.glitch.me/songs";
//     let options = {
//         method: "PATCH",
//         headers: {
//             // Content-Type : tells the server what type of data we are sending with our request. When interacting with a JSON API, this will usually be in application/json.
//             'Content-Type': 'application/json' // establishing the format in which we send the data.
//         },
//         body: JSON.stringify(song) // convert the JS object into a JSON String before sending it to the server.
//     }
//
//     return fetch(`${URL}/${song.id}`, options).then(resp => resp.json())
// }
//
// let editedSong = {
//     id: 1,
//     title: "TNT",
// }
//
// editSong(editedSong);

// POST REQUEST

// const addSong = (songObj) => {
//     const URL = "https://acoustic-little-chive.glitch.me/songs";
//     let options = {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(songObj)
//     }
//     return fetch(URL, options).then(res => res.json()).then(result => console.log("You've successfully created a new song!", result))
// }
//
//
// // Whenever the "Add Song" button is clicked, create new object based on the input fields.
// document.getElementById("addSong").addEventListener("click", function (e) {
//     e.preventDefault();
//     let newSong = {
//         title: document.getElementById("title").value,
//         artist: document.getElementById("artist").value
//     }
//     addSong(newSong).then((res) => {
//         console.log(res)
//         renderSongHTML()
//     })
// })
//
// // DELETE METHOD
//
// const deleteSong = (id) => {
//     const URL = "https://acoustic-little-chive.glitch.me/songs";
//     let options = {
//         method: "DELETE",
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//     return fetch(`${URL}/${id}`, options).then(() => console.log("The song has been deleted successfully")).then(renderSongHTML)
// }
//
// deleteSong(1);