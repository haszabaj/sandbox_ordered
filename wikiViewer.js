//opening the page
$(document).ready(function() {

    //clicking on search

    $('#searchButton').click(function() {


        //define variables

        var searchTerm = $('#searchTerm').val();

        //API url with serach implement

        var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";

        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset-utf-8",
            assync: false,
            dataType: "json",
            success: function(data) {


                //data[1][0] is the heading of the first search result
                //data[2][0] is the description of the first search result
                //data[3][0] is the link of the first search result
                // console.log(data[1][0]);
                //console.log(data[2][0]);
                //console.log(data[3][0]);


                $('#output').html('');


                for (var i = 0; i < data[1].length; i++) {
                    $('#output').prepend("<div><div class='outputItem'><a class='link' href= " + data[3][i] + ">" + data[1][i] + "</a><p>" + data[2][i] + "</p></div></div>");
                };

                $('#searchTerm').val('');
            },


            error: function(errorMessage) {
                alert("Error!");
            },



        });



    });

    $('#searchTerm').keypress(function(e) {
        if (e.which == 13) {
            $('#searchButton').click();
        }
    });


});