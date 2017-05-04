function clear() {
  d3.selectAll("svg").remove();
  d3.selectAll("h4").remove();
  d3.selectAll("br").remove();
}

function draw_review_all() {
  d3.json(review_list_url, function(error, data) {
    for (var id of data) {
      draw_review(id)
    }
  })
}

function draw_review(id) {
  d3.json(review_url + "&id=" + id, function(error, data) {

    d3.select('.container')
      .append('h4')
      .html(id)

    d3.select('.container')
      .append('br')

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

    d3.select('.container')
      .append('br')
  })
}

function onClick_draw_review() {
  clear()
  var id = document.form.data.value
  if (id == "all") {
    draw_review_all()
    return
  }
  draw_review(id)
}
