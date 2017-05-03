
function clear() {
  d3.selectAll("svg").remove();
  d3.selectAll("text").remove();
}


function draw_ranking() {
  clear()

  var query = document.form.data.value;
  d3.json(base + "/ranking/search?query=" + query + "&output=json", function(error, dataset) {
    d3.select('.content')
      .append('text')
      .html(JSON.stringify(dataset))
  })
}

function draw_review() {
  clear()

  var id = document.form.data.value;
  d3.json(base + "/review/search?id=" + id + "&output=json&limit=200", function(error, data) {

    var svg = d3
      .select('.container')
      .append('svg')
      .attr('width', 900)
      .attr('height', 200)

    svg.selectAll("circle")
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', function(d, i) {
        return 30 + (i * 15)
      })
      .attr('cy', 100)
      .attr('r', function(d) {
        return d.Content.length / 5
      })
      .attr('fill', function(d) {
        switch (d.Rating) {
          case "1":
            return "red"
          case "2":
            return "orange"
          case "3":
            return "black"
          case "4":
            return "blue"
          case "5":
            return "green"
        }

      })
      .style('opacity', 0.2)
  })

}
