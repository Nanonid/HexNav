
var width = 360,
    height = 360,
    speed = 1e-1,
    start = Date.now,
    sens = 0.4

var deltaX = 0,
    deltaY = 0,
    currentZ = 0

var targetX = 0,
    targetY = 0,
    targetZ = 0

var sphere = {type: "Sphere"};

var projection = d3.geo.orthographic()
    .scale(width / 2.1)
    .clipAngle(90)
    .translate([width / 2, height / 2]);

var graticule = d3.geo.graticule();

var canvas = d3.select("#globecontainer").append("canvas")
    .attr("width", width)
    .attr("height", height)
    .call(d3.behavior.drag()
          .origin(function() { var r = projection.rotate(); return {x: r[0] / sens, y: -r[1] / sens}; })
          .on("drag", function() {
            var rotate = projection.rotate();
            targetX = deltaX = d3.event.x * sens;
            targetY = deltaY = d3.event.y * sens;
            targetZ = currentZ = rotate[2];
            projection.rotate([deltaX, -deltaY, currentZ]);

            console.log(targetX, targetY);
          }));

function updateGlobe(lon, lat){

  var rad = Math.PI / 180.0;

  // targetX =  (width/2 * Math.cos(lon * rad) * Math.sin(lat * rad));
  // targetY =  (width/2 * Math.sin(lon* rad) * Math.sin(lat * rad));

  targetX = -lon;
  targetY = lat;

  console.log(targetX, targetY);
  //targetZ = width/2 * Math.cos(lat * rad);
}

var context = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(context)


d3.json("data/world-110m.json", function(error, topo) {
  if (error) throw error;

  var land = topojson.feature(topo, topo.objects.land),
      grid = graticule();

  d3.timer(function() {
    // var λ = speed * (Date.now() - start),
    //     φ = -50;
    //     γ = 0;

    context.clearRect(0, 0, width, height);

    context.beginPath();
    path(sphere);
    context.lineWidth = 3;
    context.strokeStyle = "#000";
    context.stroke();
    context.fillStyle = "#fff";
    context.fill();

    context.save();
    context.translate(width / 2, 0);
    context.scale(-1, 1);
    context.translate(-width / 2, 0);
    // projection.rotate([deltaX + 180, -deltaY, currentZ]);
    //
    // context.beginPath();
    // path(land);
    // context.fillStyle = "#dadac4";
    // context.fill();
    //
    // context.beginPath();
    // path(grid);
    // context.lineWidth = .5;
    // context.strokeStyle = "rgba(119,119,119,.5)";
    // context.stroke();
    //
     context.restore();
    projection.rotate([targetX, -targetY, targetZ]);

    context.beginPath();
    path(grid);
    context.lineWidth = .5;
    context.strokeStyle = "rgba(119,119,119,.5)";
    context.stroke();

    context.beginPath();
    path(land);
    context.fillStyle = "#737368";
    context.fill();
    context.lineWidth = .5;
    context.strokeStyle = "#000";
    context.stroke();


  });
});

d3.select(self.frameElement).style("height", height + "px");
