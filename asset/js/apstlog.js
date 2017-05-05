function clear() {
  d3.selectAll('div').remove()
  d3.selectAll('svg').remove()
  d3.selectAll('h4').remove()
  d3.selectAll('br').remove()
}

function init() {
  d3.json(base_url + "/review?output=json", function(error, data) {
    for (var id of data) {
      d3.select('select')
        .append('option')
        .attr('value', id)
        .html(id)
    }
  })
}

function draw_review_all() {
  clear()
  d3.json(base_url + "/review?output=json", function(error, data) {
    for (var id of data) {
      d3.select('body')
        .append('div')
        .attr('class', 'container')
        .attr('id', "id" + id)
    }
    for (var id of data) {
      draw_review(id)
    }
  })
}

function draw_review(id) {
  var url = base_url + "/review/search?limit=200&id=" + id
  d3.json(url + "&output=json", function(error, data) {

    d3.select("#id" + id)
      .append('h4')
      .html("<a href=\"" + url + "\">" + id + "</a>")

    d3.select("#id" + id)
      .append('br')

    var svg = d3.select("#id" + id)
      .append('svg')
      .attr('width', 1100)
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
      .append('title')
      .text(function(d) {
        return d.Content
      })
  })
}

function onClick_draw_review() {
  clear()
  var id = document.form.data.value
  if (id == "all") {
    draw_review_all()
    return
  }

  d3.select('body')
    .append('div')
    .attr('class', 'container')
    .attr('id', "id" + id)
  draw_review(id)
}
