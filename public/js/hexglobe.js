// convenience funciton to create a Hex Globe
function makeHexGlobe(svg, hexbin_id, hexsize, image_url, width, height) {
  var hex_width = hexsize * 2 * Math.sin(Math.PI / 3);
  var hex_height = hexsize * 1.5;

  var grid_odd_r =  makeGridDiagram(d3.select(svg),
                      Grid.trapezoidalShape(0, width/hex_width, 0, height/hex_height, Grid.oddRToCube))
                        .addHexCoordinates(Grid.cubeToOddR, true, false)
                        .update(hexsize*2, true);

  var hexbin = d3.hexbin()
      .size([width, height])
      .radius(hexsize);

  var color = d3.scale.linear()
      .domain([14, 15, 35, 132])
      .range(["#333", "#d7191c", "#ffffbf", "#2c7bb6"])
      .interpolate(d3.interpolateHcl);

  var canvas = d3.select(hexbin_id).append("canvas")
      .attr("width", width)
      .attr("height", height);

  var context = canvas.node().getContext("2d");
  var points = [];

  getHexGlobeImage(image_url, function(image) {
    context.drawImage(image, 0, 0, width, height);
    image = context.getImageData(0, 0, width, height);

    // Rescale the colors.
    for (var c, i = 0, n = width * height * 4, d = image.data; i < n; i += 4) {
      points.push([i/4%width, Math.floor(i/4/width), d[i]]);
    }

    var mapper = {};
    hexagons = hexbin(points);
    hexagons.forEach(function(d) {
      d.mean = d3.mean(d, function(p) { return p[2]; });
      d.x = d3.mean(d, function(p) { return p[0]; });
      d.y = d3.mean(d, function(p) { return p[1]; });

      var s = new ScreenCoordinate(d.x, d.y);
      s.scale(grid_odd_r.grid.scale / 2);
      d.cube = FractionalCube.cubeRound(grid_odd_r.grid.cartesianToHex(s));
      mapper[d.cube.toString()] = d.mean;
    });

    grid_odd_r.tiles
      .each(function(d) {
        d.color = color(mapper[d.key]);
        d.node.select("polygon")
          .style("fill", d.color);
      });
  });

  return grid_odd_r;
}

function getHexGlobeImage(path, callback) {
  var image = new Image();
  image.onload = function() { callback(image); };
  image.src = path;
}
