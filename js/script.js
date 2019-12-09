
function searchMovie() {
    $('#movie-list').html('');

    $.ajax({
        url: 'http://omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'ac8bea9a',
            's': $('#search-input').val()
        },

        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-4 mt-3 mb-2">
                        <div class="card">
                        <img src="`+ pictureFiltered(data.Poster) + `" class="card-img-top" alt="Picture Not Found!">
                            <div class="card-body">
                              <h5 class="card-title"> `+ data.Title + ` </h5>
                              <p class="card-subtitle mb-2 text-muted"> `+ data.Year + `</p>
                              <a href="#" class="btn btn-primary see-detail" data-toggle="modal" 
                              data-target="#exampleModal" data-id="`+ data.imdbID + `"> More Detail </a>
                            </div>
                        </div>
                    </div>`);
                });

                $('#search-input').val('');

            } else {
                $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center">` + result.Error + `</h1>
                </div>`);
            }
        }
    });
};

function pictureFiltered(picture) {
    if (picture == "N/A") {
        let path = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgB4o105JeFOTJDbmADjI8LkBj9Tk2qosCBY04ZM-Pc1dpKlJV";
        return path.toString();
    } else {
        return picture.toString();
    }
};

$('#search-button').on('click', function () {
    searchMovie();
});

$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url: 'http://omdbapi.com/',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': 'ac8bea9a',
            'i': $(this).data('id')
        },

        success: function (movie) {
            if (movie.Response === "True") {
                $('.modal-body').html(`
                <div class="container">
                    <p> Title    : `+ movie.Title + `</p>
                    <p> Year     : `+ movie.Year + `</p>
                    <p> Rated    : `+ movie.Rated + `</p>
                    <p> Release  : `+ movie.Released + `</p>
                    <p> Runtime  : `+ movie.Runtime + `</p>
                    <p> Genre    : `+ movie.Genre + `</p>
                    <p> Director : `+ movie.Director + `</p>
                    <p> Writer   : `+ movie.Writer + `</p>
                    <p> Actor    : `+ movie.Actors + `</p>
                    <p> Plot     : `+ movie.Plot + `</p>
                    <p> Language : `+ movie.Language + `</p>
                    <p> Country  : `+ movie.Country + `</p>
                    <p> Award    : `+ movie.Awards + `</p>
                </div>
                `);
            }
        }
    })
})