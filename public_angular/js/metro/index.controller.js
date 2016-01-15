(function(){
  angular
  .module("wmata")
  .controller("LineIndexController", [
    "LineService",
    "ngDialog",
    IndexControllerFunction
  ])

  function IndexControllerFunction(LineService, ngDialog){

    var dataStations ;
    var allLines ;

    LineService.getAllLines().then(function(data){
      allLines = data;
      return LineService.getStationData()
    }).then(function(data){
      dataStations = data.data;
        D3scatterplot(dataStations, allLines);
    });


  //D3 Map Function, called in the last API call above
  function D3scatterplot(stations, linePoints) {
    var newScaledStationData = [];

    var newScaledSilverLineData = [];
    var newScaledRedLineData = [];
    var newScaledYellowLineData = [];
    var newScaledBlueLineData = [];
    var newScaledGreenLineData = [];
    var newScaledOrangeLineData = [];

    //scale for the x coordinate data
    var translateY = 2100;
    var translateX = 50;

    var xScale = d3.scale.linear()
                   .domain([d3.min(stations, function(d){return d[0];}), d3.max(stations, function(d) { return d[0]; })])
                   .range([0, 2000]);
    //scale for the y coordinate data
     var yScale = d3.scale.linear()
                    .domain([d3.min(stations, function(d){return d[1];}), d3.max(stations, function(d) { return d[1]; })])
                    .range([0, 2000]);

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
      var stationCode = stations[i][4];
      scaledArray.push(stationCode);
      newScaledStationData.push(scaledArray);
    }

    // var dataset = stations;
    var width = 2100;
    var height = 2200;

    var svg = d3.select(".svgDiv")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("class", "svg");

    //scale for silver line data and generate silver line path
    for (var i= 0; i < linePoints.silver.length; i++){
      var scaledSilverLineData = { "x" : xScale(linePoints.silver[i].x), "y" : yScale(linePoints.silver[i].y) }
      newScaledSilverLineData.push(scaledSilverLineData);
    }

    var lineGroup = svg.append("g")
    var lineFunction = d3.svg.line()
                       .x(function(d) { return (d.x); })
                       .y(function(d) { return -(d.y); })
                       .interpolate("monotone");

    var lineGraph = lineGroup.append("path")
                    .attr("d", lineFunction(newScaledSilverLineData))
                    .attr("stroke", "silver")
                    .attr("stroke-width", 20)
                    .attr("fill", "none")
                    .attr("transform", "translate(" + translateX + "," + translateY + ")");

    //scale for red line data and generate red line path
    for (var i= 0; i < linePoints.red.length; i++){
      var scaledRedLineData = { "x" : xScale(linePoints.red[i].x), "y" : yScale(linePoints.red[i].y) }
      newScaledRedLineData.push(scaledRedLineData);
    }

    var lineGroup = svg.append("g")
    var lineFunction = d3.svg.line()
                       .x(function(d) { return (d.x); })
                       .y(function(d) { return -(d.y); })
                       .interpolate("monotone");

    var lineGraph = lineGroup.append("path")
                    .attr("d", lineFunction(newScaledRedLineData))
                    .attr("stroke", "red")
                    .attr("stroke-width", 10)
                    .attr("fill", "none")
                    .attr("transform", "translate(" + translateX + "," + translateY + ")");

    //scale for orange line data and generate orange line path
    for (var i= 0; i < linePoints.orange.length; i++){
      var scaledOrangeLineData = { "x" : xScale(linePoints.orange[i].x), "y" : yScale(linePoints.orange[i].y) }
      newScaledOrangeLineData.push(scaledOrangeLineData);
    }

    var lineGroup = svg.append("g")
    .attr("class", "orange")

    var lineFunction = d3.svg.line()
                       .x(function(d) { return (d.x); })
                       .y(function(d) { return -(d.y); })
                       .interpolate("monotone");

    var lineGraph = lineGroup.append("path")
                    .attr("d", lineFunction(newScaledOrangeLineData))
                    .attr("stroke", "orange")
                    .attr("stroke-width", 10)
                    .attr("fill", "none")
                    .attr("transform", "translate(" + translateX + "," + translateY + ")");

    //scale for green line data and generate green line path
    for (var i= 0; i < linePoints.green.length; i++){
      var scaledGreenLineData = { "x" : xScale(linePoints.green[i].x), "y" : yScale(linePoints.green[i].y) }
      newScaledGreenLineData.push(scaledGreenLineData);
    }

    var lineGroup = svg.append("g")
    var lineFunction = d3.svg.line()
                       .x(function(d) { return (d.x); })
                       .y(function(d) { return -(d.y); })
                       .interpolate("monotone");

    var lineGraph = lineGroup.append("path")
                    .attr("d", lineFunction(newScaledGreenLineData))
                    .attr("stroke", "green")
                    .attr("stroke-width", 20)
                    .attr("fill", "none")
                    .attr("transform", "translate(" + translateX + "," + translateY + ")");

    //scale for yellow line data and generate yellow line path
    for (var i= 0; i < linePoints.yellow.length; i++){
      var scaleYellowLineData = { "x" : xScale(linePoints.yellow[i].x), "y" : yScale(linePoints.yellow[i].y) }
      newScaledYellowLineData.push(scaleYellowLineData);
    }

    var lineGroup = svg.append("g")
    var lineFunction = d3.svg.line()
                       .x(function(d) { return (d.x); })
                       .y(function(d) { return -(d.y); })
                       .interpolate("monotone");

    var lineGraph = lineGroup.append("path")
                    .attr("d", lineFunction(newScaledYellowLineData))
                    .attr("stroke", "yellow")
                    .attr("stroke-width", 15)
                    .attr("fill", "none")
                    .attr("transform", "translate(" + translateX + "," + translateY + ")");

    //scale for blue line data and generate blue line path
    for (var i= 0; i < linePoints.blue.length; i++){
      var scaleBlueLineData = { "x" : xScale(linePoints.blue[i].x), "y" : yScale(linePoints.blue[i].y) }
      newScaledBlueLineData.push(scaleBlueLineData);
    }

    var lineGroup = svg.append("g")
    var lineFunction = d3.svg.line()
                       .x(function(d) { return (d.x); })
                       .y(function(d) { return -(d.y); })
                       .interpolate("monotone");

    var lineGraph = lineGroup.append("path")
                    .attr("d", lineFunction(newScaledBlueLineData))
                    .attr("stroke", "blue")
                    .attr("stroke-width", 5)
                    .attr("fill", "none")
                    .attr("transform", "translate(" + translateX + "," + translateY + ")");

    //aligns the metro map properly
    var circleGroup = svg.append("g")
                      .attr("transform", "translate(50,2100)");

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
    .attr("station_code", function(d){
      return d[4]
    })
    // .on("mouseover", function(d){
    //
    //   var xPosition = parseFloat(d3.select(this).attr("cx")) + 2;
    //   var yPosition = parseFloat(d3.select(this).attr("yy")) + 14;
    //
    //   svg.append("text")
    // .attr("id", "tooltip")
    // .attr("x", xPosition)
    // .attr("y", yPosition)
    // .attr("text-anchor", "middle")
    // .attr("font-family", "sans-serif")
    // .attr("font-size", "11px")
    // .attr("font-weight", "bold")
    // .attr("fill", "black")
    // .text(d[3]);
    // })
    .on('click', function(d){

      LineService.TrainPrediction(d[4]).then(function(data){



        var track1 = {time : []};
        var track2 = {time: []};
        //
        for(var i = 0; i < data.data.Trains.length; i ++){
          if(data.data.Trains[i].Group == "1"){
            track1.time.push(data.data.Trains[i].DestinationName + " " + data.data.Trains[i].Min)
          }else if(data.data.Trains[i].Group == "2"){
            track2.time.push(data.data.Trains[i].DestinationName + " " + data.data.Trains[i].Min)
          }else{
            console.log("nothing")
          }
        }
        // console.log(data.data.Trains[0].Min)

        var allTracks = {track1: track1, track2: track2}

        // $(".ngdialog").remove()

        ngDialog.open({ template: "js/metro/dialogTemplate.html",
                        data: allTracks,
                        // className: 'ngdialog-theme-flat',
                        showClose: true });

        // ngDialog.open({ template: "<div>" + data.data.Trains[0].Min + "</div>",
        //                 plain: true});
        // alert(allTracks)
      })
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
    })
  };
  }
})();

// //Stations API Call
// LineService.StationApiCall().then(function(data){
//   var self = this;
//   self.dataStations = data.data;
//
//   //API call for all lines, puts them in a useful object
//   LineService.SilverCall().then(function(data){
//     self.dataLines = data.data[0].stations;
//     D3scatterplot(self.dataStations, self.dataLines);
//   });
// });
