//
// var width = 480,
//     height = 300,
//     speed = 1e-2,
//     start = Date.now();
//
// var sphere = {type: "Sphere"};
//
// var projection = d3.geo.orthographic()
//     .scale(height / 2.1)
//     .translate([width / 2, height / 2])
//     .clipAngle(90)
//     .precision(.5);
//
// var graticule = d3.geo.graticule();
//
// var canvas = d3.select("#globecontainer").append("canvas")
//     .attr("width", width)
//     .attr("height", height);
//
// var context = canvas.node().getContext("2d");
//
// var path = d3.geo.path()
//     .projection(projection)
//     .context(context);
//
// var hiddenCanvas = d3.select("#globecontainer").append("canvas")
//     .attr("width", width)
//     .attr("height", height);
//
// var hiddenContext = hiddenCanvas.node().getContext("2d");
//
// var hiddenProjection = d3.geo.equirectangular()
//     .translate([width / 2, height / 2])
//     .scale(width / 7);
//
// var hiddenPath = d3.geo.path()
//     .projection(hiddenProjection)
//     .context(hiddenContext);
//
// d3.json("data/map.json", function(error, topo) {
//   var selected = false;
//
//   var land = topojson.feature(topo, topo.objects.land),
//       borders = topojson.feature(topo, topo.objects.countries),
//       grid = graticule();
//
//   var fillToCountry = {};
//   var i = borders.features.length;
//   while (i--) {
//     hiddenContext.beginPath();
//     hiddenPath(borders.features[i]);
//     hiddenContext.fillStyle = "rgb(" + i + ",0,0)";
//     hiddenContext.fill();
//   }
//
//   d3.timer(function() {
//     projection.rotate([speed * (Date.now() - start), -15]);
//
//     context.clearRect(0, 0, width, height);
//
//     context.beginPath();
//     path(sphere);
//     context.lineWidth = 3;
//     context.strokeStyle = "#000";
//     context.stroke();
//
//     context.beginPath();
//     path(sphere);
//     context.fillStyle = "#fff";
//     context.fill();
//
//     context.beginPath();
//     path(land);
//     context.fillStyle = "#222";
//     context.fill();
//
//     context.beginPath();
//     path(borders);
//     context.lineWidth = .5;
//     context.strokeStyle = "#fff";
//     context.stroke();
//
//     context.beginPath();
//     path(grid);
//     context.lineWidth = .5;
//     context.strokeStyle = "rgba(119,119,119,.5)";
//     context.stroke();
//
//     if (selected !== false) {
//       context.beginPath();
//       path(borders.features[selected]);
//       context.fillStyle = "#0ad";
//       context.fill();
//     }
//   });
//
//   canvas
//     .on("mousemove", select)
//     .on("touchstart", select);
//
//   function select() {
//     var pos = d3.mouse(this);
//     var latlong = projection.invert(pos);
//     var hiddenPos = hiddenProjection(latlong);
//     if (hiddenPos[0] > -1) {
//       var p = hiddenContext.getImageData(hiddenPos[0], hiddenPos[1], 1, 1).data;
//       selected = p[0];
//       context.beginPath();
//       path(borders.features[selected]);
//       context.fillStyle = "#0ad";
//       context.fill();
//     } else {
//       selected = false;
//     }
//   };
// });
//
// d3.select(self.frameElement).style("height", (2*height) + "px");

(function() {
  var link = document.createElement('link');
  link.href = 'http://fonts.googleapis.com/css?family=Source+Code+Pro:400,700|Source+Sans+Pro:400,400italic,700italic,700';
  link.rel = 'stylesheet';
  link.type = 'text/css';
  if (document.location.hostname != 'localhost')
    document.getElementsByTagName('html')[0].appendChild(link);
  }
)();
