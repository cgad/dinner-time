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

        $("#results-table > thead").html('<tr><th>Recipe Name</th><th>Ingredients</th><th>Servings</th><th>Source</th></tr>');

        for (var i = 0; i < response.hits.length; i++) {
            var result = response.hits[i].recipe;
            var newRow = $("<tr>");

            newRow.append("<td>" + result.label + "</td>");

            var cell = $("<td>");
            var list = $("<ul>");
            for (var j = 0; j < result.ingredientLines.length; j++) {
                var ingr = result.ingredientLines[j];
                list.append("<li>" + ingr + "</li>");
            }

            cell.append(list);
            newRow.append(cell);
            newRow.append("<td>" + result.yield + "</td>");
            newRow.append("<td><a target=_blank href='" + result.url + "'>" + result.source + "</a></td>");

            $("#results-table > tbody").append(newRow);
        }
    })

    $("#keyword").val("");
})