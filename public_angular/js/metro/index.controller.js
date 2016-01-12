(function(){
  angular
  .module("wmata")
  .controller("LineIndexController", [
    "LineService",
    IndexControllerFunction
  ])

  function IndexControllerFunction(LineService){

    var self = this;

    //Stations API Call
    LineService.StationApiCall().then(function(data){
      var self = this;

      self.dataStations = data.data;

      //lines API call
      LineService.ApiCall().then(function(data){
        self.dataLines = data.data[0].stations;
        D3scatterplot(self.dataStations, self.dataLines);
      });
    });

    //D3 Map
  function D3scatterplot(stations, linePoints) {
    console.log(linePoints)
    var newScaledStationData = [];
    var newScaledLineData = [];

    //scale for the x coordinate data
    var xScale = d3.scale.linear()
                   .domain([d3.min(stations, function(d){return d[0];}), d3.max(stations, function(d) { return d[0]; })])
                   .range([0, 1000]);
    //scale for the y coordinate data
     var yScale = d3.scale.linear()
                    .domain([d3.min(stations, function(d){return d[1];}), d3.max(stations, function(d) { return d[1]; })])
                    .range([0, 1000]);

    // scale function for the initial station data
    for (var i = 0; i < stations.length; i++) {
      var scaledArray = [];
      var xScaled = xScale(stations[i][0]);
      scaledArray.push(xScaled);
      var yScaled = yScale(stations[i][1]);
      scaledArray.push(yScaled);
      var lineColor = stations[i][2];
      scaledArray.push(lineColor);
      var stationName = stations[i][3];
      scaledArray.push(stationName);
      newScaledStationData.push(scaledArray);
    }

    //scale function for the initial line data
    for (var i= 0; i < linePoints.length; i++){
      var scaledDataLine = { "x" : xScale(linePoints[i].x), "y" : yScale(linePoints[i].y) }
      newScaledLineData.push(scaledDataLine);
    }

    // var dataset = stations;
    var width = 1200;
    var height = 1200;

    var svg = d3.select("body")
          .append("svg")
          .attr("width", width)
          .attr("height", height);

    // for path
    var lineGroup = svg.append("g")

    var lineFunction = d3.svg.line()
                       .x(function(d) { return (d.x); })
                       .y(function(d) { return -(d.y); })
                       .interpolate("linear");

    var lineGraph = lineGroup.append("path")
                    .attr("d", lineFunction(newScaledLineData))
                    .attr("stroke", "blue")
                    .attr("stroke-width", 10)
                    .attr("fill", "none")
                    .attr("transform", "translate(" + 50 + "," + 1050 + ")");

    //aligns the metro map properly
    var circleGroup = svg.append("g")
                      .attr("transform", "translate(50,1050)");

    circleGroup.selectAll("circle")
    .data(newScaledStationData)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return d[0];
    })
    .attr("cy", function(d) {
      return -(d[1]);
    })
    .attr("r", 10)
    .attr("line", function(d){
      if(d[2] === "BL"){
        return "Blue"
      }else{
      return d[2]
    }
    })
    .attr("station_name", function(d){
      return d[3]
    })
    .style("fill", function(d){
      if(d[2] === "BL"){
        return "Blue"
      }else if (d[2] === "RD"){
        return "Red"
      }else if (d[2] === "SV"){
        return "Silver"
      }else if (d[2] === "OR"){
        return "orange"
      }else if (d[2] === "GR"){
        return "green"
      }else if (d[2] === "YL"){
        return "yellow"
      }else{
      return d[2]
    }
    })
    .style("stroke", "black")
    .append("title")
    .text(function(d) {
          return d;
    });
  };
  }
})();
