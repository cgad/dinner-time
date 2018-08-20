var baseQuery = "https://api.edamam.com/search?app_id=b27f8bf6&app_key=c4dc7650e31e0ed398abb5860e305431&q=";

$(".search").on("click", function(event) {
    event.preventDefault();

    $("#results-table > tbody").html("");

    var userKeyword = $("#keyword").val();
    console.log(userKeyword);
    var userQuery = baseQuery + userKeyword;
    console.log(userQuery);

    $.ajax({url: userQuery, method: "GET"})
     .then(function(response) {
        console.log(response);

        $("#results-table > thead").html('<tr id="headings"><th>Recipe Name</th><th>Ingredients</th><th class="yield">Servings</th><th class="source">Source</th></tr>');

        for (var i = 1; i <= 5; i++) {
            var result = response.hits[i].recipe;
            var newRow = $("<tr>");

            newRow.append("<td class='label'>" + result.label + "</td>");

            var cell = $("<td class='ingr'>");
            var list = $("<ol>");
            for (var j = 0; j < result.ingredientLines.length; j++) {
                var ingr = result.ingredientLines[j];
                list.append("<li>" + ingr + "</li>");
            }

            cell.append(list);
            newRow.append(cell);
            newRow.append("<td class='yield'>" + result.yield + "</td>");
            newRow.append("<td class='source'><a target=_blank href='" + result.url + "'>" + result.source + "</a></td>");

            $("#results-table > tbody").append(newRow);
        }

        $("#show").html("<button id='more'>Show More</button>");

        $(document).on("click", "#more", function(event) {
            for (var i = 6; i <= response.hits.length; i++) {
                var result = response.hits[i].recipe;
                var newRow = $("<tr>");
    
                newRow.append("<td class='label'>" + result.label + "</td>");
    
                var cell = $("<td class='ingr'>");
                var list = $("<ol>");
                for (var j = 0; j < result.ingredientLines.length; j++) {
                    var ingr = result.ingredientLines[j];
                    list.append("<li>" + ingr + "</li>");
                }
    
                cell.append(list);
                newRow.append(cell);
                newRow.append("<td class='yield'>" + result.yield + "</td>");
                newRow.append("<td class='source'><a target=_blank href='" + result.url + "'>" + result.source + "</a></td>");
    
                $("#results-table > tbody").append(newRow);

                $("#show").html("<button id='less'>Show Less</button>");
            }
        })

        $(document).on("click", "#less", function(event) {
            $("#results-table > tbody").html("");
            for (var i = 1; i <= 5; i++) {
                var result = response.hits[i].recipe;
                var newRow = $("<tr>");
    
                newRow.append("<td class='label'>" + result.label + "</td>");
    
                var cell = $("<td class='ingr'>");
                var list = $("<ol>");
                for (var j = 0; j < result.ingredientLines.length; j++) {
                    var ingr = result.ingredientLines[j];
                    list.append("<li>" + ingr + "</li>");
                }
    
                cell.append(list);
                newRow.append(cell);
                newRow.append("<td class='yield'>" + result.yield + "</td>");
                newRow.append("<td class='source'><a target=_blank href='" + result.url + "'>" + result.source + "</a></td>");
    
                $("#results-table > tbody").append(newRow);
                $("#show").html("");
                $("#show").html("<button id='more'>Show More</button>");
            }
        })
    })

    $("#keyword").val("");
})