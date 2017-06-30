function init() {
  // option
  d3.json(base_url + '/app?output=json', function(error, data) {
    for (var app of data) {
      d3.select('select')
        .append('option')
        .attr('value', app.ID)
        .html(app.ID)
    }
  })
}

function clear() {
  d3.selectAll('div').remove()
  d3.selectAll('svg').remove()
  d3.selectAll('h4').remove()
  d3.selectAll('br').remove()

  /*
    d3.select('body')
      .append('div')
      .attr('id', 'tooltip')
      .attr('class', 'btn btn-default')
      .attr('data-toggle', 'tooltip')
      .attr('data-placement', 'top')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
  */

}

function review_all() {
  clear()

  d3.json(base_url + '/app?output=json', function(error, data) {
    var container = d3.select('body')
      .append('div')
      .attr('class', 'container-fluid')
    for (var app of data) {
      container.append('div')
        .attr('class', 'row')
        .attr('id', 'id' + app.ID)
    }
    for (var app of data) {
      review(app.ID, app.Name)
    }
  })
}

function review(id, name) {
  var url = base_url + '/review/search?limit=200&id=' + id
  d3.json(url + '&output=json', function(error, data) {

    var div = d3.select('#id' + id)
    div.append('h4').html('<a href=\'' + url + '\'>' + name + '</a>')
    div.append('br')

    var svg = div.append('svg')
      .attr('width', 1200)
      .attr('height', 200)

    svg.selectAll('circle')
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
          case '1':
            return 'red'
          case '2':
            return 'orange'
          case '3':
            return 'black'
          case '4':
            return 'blue'
          case '5':
            return 'green'
        }
      })
      .style('opacity', 0.2)
      .append('title')
      .text(function(d) {
        return '[' + d.Rating + ']' + d.Title + '\n' +
          d.Content + '\n' +
          d.Author + '/' + d.Updated
      })

    /*
          .on('mouseover', function(d) {
            return d3.select('#tooltip')
              .style('visibility', 'visible')
            //.attr('title', d.Content)
            //.text(d.Content)
          })
          .on('mousemove', function() {
            return d3.select('#tooltip')
              .style('top', (event.pageY - 10) + 'px')
              .style('left', (event.pageX + 10) + 'px');
          })
          .on('mouseout', function() {
            return d3.select('#tooltip')
              .style('visibility', 'hidden');
          })
          */
  })
}

function onChange_review() {
  clear()
  var id = document.form.data.value
  if (id == 'all') {
    review_all()
    return
  }

  d3.json(base_url + '/app?output=json', function(error, data) {
    for (var app of data) {
      if (app.ID == id) {
        d3.select('body')
          .append('div')
          .attr('class', 'container-fluid')
          .append('div')
          .attr('class', 'row')
          .attr('id', 'id' + app.ID)
        review(app.ID, app.Name)
      }
    }
  })
}
