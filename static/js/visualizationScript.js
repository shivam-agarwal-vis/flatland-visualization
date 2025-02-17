_param = {
  radiusOfCircle: 5,
  radiusOfCircleInLegend: 9,
  // gameName: window.pommermanData["blob"]["config"],
  // gameFinishDate: window.pommermanData["blob"]["finished_at"],
  // result: window.pommermanData["blob"]["result"],
  timespan: window.selectedEpisodeLength,

  entities: [],
  events: ["Start", "End", "Junction", "Move",  "Malfunction", "Deadlock"],
  eventsComparison: ["Start", "End", "Junction", "MoveA", "MoveB", "MalfunctionA", "MalfunctionB", "DeadlockA", "DeadlockB"],
  eventsDictionary: {
    Move: "movement",
    Start: "startTrain",
    End: "endTrain",
    Junction: "junction",
    Malfunction: "malfunction",
    Deadlock: "deadlock",
  },
  eventsDictionaryComparison: {
    MoveA: "movementA",
    MoveB: "movementB",
    Start: "startTrain",
    End: "endTrain",
    Junction: "junction",
    MalfunctionA: "malfunctionA",
    MalfunctionB: "malfunctionB",
    DeadlockA: "deadlockA",
    DeadlockB: "deadlockB",
  },
  eventSumDictionary: {},
  leftPadding: 0,
  rightPadding: 200,
  topPadding: 60,
  bottomPadding: 30,
  svgWidth: 900,
  svgHeight: 760,
  height: 600,
  textEnd: 150,
  marginTextBeforeMatrix: 30,
  glyphOPacity: 0.7,
//   colors: ["#ec6502", "#5eaacb ", "#00cc00", "#eb298d", "#000000"],
  colors: ["#5a5a5a", "#5eaacb ", "#00cc00", "#eb298d", "#000000"],
//   colorA: "#377eb8",
//   colorB: "#ff7f00",

  colorA: "#0394FC",
  colorB: "#FC6B03",
  agentTimelineData: [],
  agentTimelineDataA: [],
  agentTimelineDataB: [],
  entitiesArray: [],
  minHeightOfRow: 15,
  reachedIcon: "\ue013",
  ontrackIcon: "\ue024",
  yettostartIcon: "\ue073",
  iconSize: 10,
  heightOfRow: 0, //to be computed
  computedMinHeightOfTimeline: 0, //to be computed
  tickLength: 8,
  tickFontSize: 12,
  actualPathLengthBarColor: "#4d4747",
  shortestPathLengthBarColor: "#3ec751",
  histogramBarColor: "#4d4747",
  highlightColor: "#ffea00",
  deadlockShapeFillColor: "none",
  deadlockShapeBoundaryColor: "#000000",
  deadlockShapeStrokeWidth: "2px",
  nodeColor: "grey",
  linkColor: "grey",
  highlightOpacity: 0.2,
  currentFrameColor: "#0000ff",
//   nodeMinRadius: 4,
//   nodeMaxRadius: 10,
//   linkMinWidth: 2,
//   linkMaxWidth: 8,
    nodeMinRadius: 8,
    nodeMaxRadius: 15,
    linkMinWidth: 2,
    linkMaxWidth: 7,
  trainColorInDynamicGraph: "grey",
  rowFactor: 5

};

function sameLengthAgentName(trainNum) {
  var stringTrainNum = "";
  if (trainNum < 10) stringTrainNum = "00" + trainNum;
  else if (trainNum < 100) stringTrainNum = "0" + trainNum;
  else stringTrainNum = "" + trainNum;
  return stringTrainNum;
}
function sameLengthStationId(stationid, data) {
  var stringStationNum = "";
  if (Object.keys(data["stationsDictionary"]).length < 10)
    stringStationNum = stationid;
  else {
    if (stationid < 10) stringStationNum = "0" + stationid;
    // else if(stationid < 100)stringStationNum = ""+stationid;
    else stringStationNum = "" + stationid;
  }
  return "S" + stringStationNum;
}

function highlightTrains(trainIdsArray) {
  for (var i = 0; i < trainIdsArray.length; i++) {
    d3.select("#highlighter" + trainIdsArray[i]).attr(
      "opacity",
      _param.highlightOpacity
    );
    d3.select("#AgentCircle"+trainIdsArray[i]).attr("fill", _param.highlightColor);
    d3.select("#AgentText"+trainIdsArray[i]).attr("fill", "black");
    
   
    d3.select("#movingtrain"+trainIdsArray[i]).attr("fill", _param.highlightColor);
  }
}

function deHighlightTrains() {
  d3.selectAll(".highlighters").attr("opacity", 0);
  d3.selectAll(".agentCircles").attr("fill", "black");
  d3.selectAll(".agentIdText").attr("font-weight", "normal");
  d3.selectAll(".agentIdText").attr("fill", "white");
  d3.selectAll(".TrainLabels").attr("font-weight", "normal");
  d3.selectAll(".movingTrains").attr("fill", _param.trainColorInDynamicGraph);
}

function highlightTrainLabel(trainid)
{
    d3.select("#TrainLabel" + trainid).attr("font-weight", "bold");
    d3.select("#AgentText"+trainid).attr("font-weight", "bold");
}

function highlightRegions(regionsArray) {
    for(var i=0; i<regionsArray.length; i++)
    {
        d3.selectAll(".region_"+regionsArray[i]).attr("visibility", "visible");
        d3.select("#Rect"+regionsArray[i]).style("stroke", "#000000");
        d3.select("#aggregatedGraphRegionNode"+regionsArray[i]).style("stroke", "#000000");
        var railRegionId = -1;
        for(var rrid in _param.selectedRailRegionIds)
        {
            if(_param.selectedRailRegionIds[rrid] == regionsArray[i])
            {
                railRegionId = rrid;
                break;
            }
        }
        if(railRegionId != -1)
        {
            d3.selectAll(".railRegion"+railRegionId).attr("stroke", "black");
        }

    }
}
function dehighlightRegions() {
    d3.selectAll(".regionsOnTimelineClass").attr("visibility", "hidden");
    d3.selectAll(".RegionRectanglesOnMap").style("stroke", "none");
    d3.selectAll(".aggregatedGraphNode").style("stroke", "grey");
    d3.selectAll(".railRegions").attr("stroke", "none");
}

function highlightStations(stationsArray)
{
    for(var i=0; i< stationsArray.length; i++)
    {
        var sid = stationsArray[i];
        d3.selectAll(".stationLabel"+sid).attr("font-weight","bold");
    }
}

function deHighlightStations()
{
    d3.selectAll(".stationLabel").attr("font-weight","normal");
}
function scrollDrag(d) {
  // d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  // console.log(d3.event.y);

  window.currentVerticalPosition += d3.event.y;
  if (
    window.currentVerticalPosition >= 0 &&
    window.currentVerticalPosition <= _param.differenceOfHeight
  ) {
    d3.select("#mainVisualizationGroup")
      .transition()
      .attr(
        "transform",
        "translate(0," + -window.currentVerticalPosition + ")"
      );
    d3.select("#scrollBar")
      .transition()
      .attr(
        "transform",
        "translate(0," +
          window.currentVerticalPosition * _param.scrollRatio +
          ")"
      );
  } else if (window.currentVerticalPosition < 0) {
    window.currentVerticalPosition = 0;
    d3.select("#mainVisualizationGroup")
      .transition()
      .attr(
        "transform",
        "translate(0," + -window.currentVerticalPosition + ")"
      );
    d3.select("#scrollBar")
      .transition()
      .attr(
        "transform",
        "translate(0," +
          window.currentVerticalPosition * _param.scrollRatio +
          ")"
      );
  } else if (window.currentVerticalPosition > _param.differenceOfHeight) {
    window.currentVerticalPosition = _param.differenceOfHeight;
    d3.select("#mainVisualizationGroup")
      .transition()
      .attr(
        "transform",
        "translate(0," + -window.currentVerticalPosition + ")"
      );
    d3.select("#scrollBar")
      .transition()
      .attr(
        "transform",
        "translate(0," +
          window.currentVerticalPosition * _param.scrollRatio +
          ")"
      );
  }
}

function scrollFunction(e) {
  window.currentVerticalPosition += e.deltaY;
  // console.log(_param.computedMinHeightOfTimeline, _param.svgHeight, _param.differenceOfHeight, window.currentVerticalPosition);
  if (
    window.currentVerticalPosition >= 0 &&
    window.currentVerticalPosition <= _param.differenceOfHeight
  ) {
    d3.select("#mainVisualizationGroup")
      .transition()
      .attr(
        "transform",
        "translate(0," + -window.currentVerticalPosition + ")"
      );
    d3.select("#scrollBar")
      .transition()
      .attr(
        "transform",
        "translate(0," +
          window.currentVerticalPosition * _param.scrollRatio +
          ")"
      );
  } else if (window.currentVerticalPosition < 0) {
    window.currentVerticalPosition = 0;
    d3.select("#mainVisualizationGroup")
      .transition()
      .attr(
        "transform",
        "translate(0," + -window.currentVerticalPosition + ")"
      );
    d3.select("#scrollBar")
      .transition()
      .attr(
        "transform",
        "translate(0," +
          window.currentVerticalPosition * _param.scrollRatio +
          ")"
      );
  } else if (window.currentVerticalPosition > _param.differenceOfHeight && _param.differenceOfHeight!=0) {
    window.currentVerticalPosition = _param.differenceOfHeight;
    d3.select("#mainVisualizationGroup")
      .transition()
      .attr(
        "transform",
        "translate(0," + -window.currentVerticalPosition + ")"
      );
    d3.select("#scrollBar")
      .transition()
      .attr(
        "transform",
        "translate(0," +
          window.currentVerticalPosition * _param.scrollRatio +
          ")"
      );
  }
  e.preventDefault();
}

function agentImage(agentIndex) {
  imageName = "";
  if (isTeamCompetition(window._dataForVisualization.gameName)) {
    switch (agentIndex) {
      case 0:
        imageName = "Agent0-number_ifteam.png";
        break;
      case 1:
        imageName = "Agent1-number_ifteam.png";
        break;
      case 2:
        imageName = "Agent2-number_ifteam.png";
        break;
      case 3:
        imageName = "Agent3-number_ifteam.png";
        break;
    }
  } else {
    switch (agentIndex) {
      case 0:
        imageName = "Agent0-number.png";
        break;
      case 1:
        imageName = "Agent1-number.png";
        break;
      case 2:
        imageName = "Agent2-number.png";
        break;
      case 3:
        imageName = "Agent3-number.png";
        break;
    }
  }
  return imageName;
}

function drawRailRegions(data)
{
    d3.select("#railRegionGroup").selectAll("*").remove();
  var railRegionGroup = d3.select("#railRegionGroup").append("g").attr("pointer-events", "none");
  var grid = data["environmentData"]["grid"];
  var numColumns = _param.numColumns;
  var numRows = _param.numRows;
    var continuousRail_id_pos_dict = data["continuousRail_id_pos_dict"];
_param.selectedRailRegionIds = {};

  for(var id in continuousRail_id_pos_dict)
  {
      var posArray = continuousRail_id_pos_dict[id];
      for(var x=0; x<posArray.length; x++)
      {

        var i = posArray[x][0], j = posArray[x][1];
        railRegionGroup.append("rect").attrs({
            width: window.svgWidthHeight / numColumns,
            height: window.svgWidthHeight / numRows,
            x: (j * window.svgWidthHeight) / numColumns,
            y: (i * window.svgWidthHeight) / numRows,
            "rowNum": i,
            "colNum":j,
            "fill-opacity": 0.3,
            "fill": "grey",
            "visibility":"hidden",
            "class": "railRegions selection railRegion"+id+" Rect"+id,
            "railRegionId": id,
            "cursor":"pointer",
            "stroke-width":"1px",
            "stroke":"none"

        }).on("mouseover",function(){
            var railRegionId = d3.select(this).attr("railRegionId");
            d3.selectAll(".railRegion"+railRegionId).attr("visibility", "visible");
            var selectedRegionId = _param.selectedRailRegionIds[railRegionId];

            if (selectedRegionId in _param.graph["nodes"]) {
                var trainsDict = _param.graph["nodes"][selectedRegionId]["trains"];
                var trainsArray = Object.keys(trainsDict);
                highlightRegions([selectedRegionId]);
                highlightTrains(trainsArray);
              }

        }).on("mouseout", function(){
            var railRegionId = d3.select(this).attr("railRegionId");
            if(!(railRegionId in _param.selectedRailRegionIds))
                d3.selectAll(".railRegion"+railRegionId).attr("visibility", "hidden");
            deHighlightTrains();
            dehighlightRegions();
        }).on("mousedown", function(){
            d3.event.stopPropagation();
        }).on("click", function(){
            var railRegionId = d3.select(this).attr("railRegionId");
            _param.selectedRailRegionIds[railRegionId] = true;
            var id = window.selectedRegionIdCounter;
            window.selectedRegionIdCounter += 1;
            window.selectedRegions.push({"type":"rail", "railId": railRegionId, "id": id});
            var rowNum = +d3.select(this).attr("rowNum");
            var colNum = +d3.select(this).attr("colNum");
            var labelPosition = findAvailablePosition([rowNum, colNum], new Set(), window.data)["pos"];
            d3.select("#playbackSvgGroup").append("text")
            .attrs({
                x: (labelPosition[1]* window.svgWidthHeight) / numColumns,
                y: (labelPosition[0]* window.svgWidthHeight) / numRows,
                class: "regionIdText",
                "font-size": "10px",
                "id": "TextRect" + id,
            })
            .text("R" + id);
            window.playClicked = false;
            $("#aggregatedRadio").prop("checked", true);
            $("#aggregatedRadio").click();
            
            if(!window.comparison)
                computeOccupyingCellsByRegions(d3.select("#transitionGraphSvg"), window.singleSelectedData);
            else
                computeOccupyingCellsByRegionsForBoth(d3.select("#transitionGraphSvg"), window.dataA, window.dataB);

            d3.selectAll(".railRegion"+railRegionId).append("title").text(function(){
                if(railRegionId in _param.selectedRailRegionIds)
                {
                    var selectedRegionId = _param.selectedRailRegionIds[railRegionId];
                    var trainsDict, numTrains=0;
                    if((window.comparison))
                    {
                        numTrains = Object.keys(_param.bothGraphs["A"]["nodes"][selectedRegionId]["trains"]).length;
                        numTrains += Object.keys(_param.bothGraphs["B"]["nodes"][selectedRegionId]["trains"]).length;
                    }
                     else
                        numTrains = Object.keys(_param.graph["nodes"][selectedRegionId]["trains"]).length;
                    return "R"+selectedRegionId+" : #trains = "+numTrains;
                }
            })
        });
      }
      
  }

}

function drawHeatmap(agentIds) {
  //BUG: trains target position is not logged, and hence appear as 0 in the heatmap
  var agentIndicesArray = [];
  var heatmapGrid = [];

  d3.select("#occupancyLabel").text("Occupancy Distribution");


  var grid = window.data["environmentData"]["grid"];
  var agentTrajectoryData = window.data["agentTrajectoryData"];
  if (agentIds == undefined) {
    for (var agent_index in agentTrajectoryData) {
      agentIndicesArray.push(agent_index);
    }
  }

  // Initialize heatmap grid
  heatmapGrid = new Array(grid.length);
  for (var i = 0; i < grid.length; i++) {
    heatmapGrid[i] = new Array(grid[i].length);
    for (var j = 0; j < grid[i].length; j++) {
      heatmapGrid[i][j] = 0;
    }
  }
  var max = -1,
    min = 0;
  for (var agent_index in agentTrajectoryData) {
    for (var step in agentTrajectoryData[agent_index]) {
      var gridNode = agentTrajectoryData[agent_index][step]["gridNode"];
      heatmapGrid[gridNode[0]][gridNode[1]] += 1;
      if (heatmapGrid[gridNode[0]][gridNode[1]] > max)
        max = heatmapGrid[gridNode[0]][gridNode[1]];
    }

    // if train reached, increment value in cell of destination
    var reachedTrainArray = _param.groupOfTrains["reached"]["agent_indices"];
    if (reachedTrainArray.indexOf(agent_index) >= 0) {
      var target = window.data["agentIndex_DestinationDictionary"][agent_index];
      heatmapGrid[target[0]][target[1]] += 1;
    }
  }

  // console.log(heatmapGrid, max, min);
  d3.select("#heatMap").selectAll("*").remove();
//   var playbackSvg = d3.select("#videoSVG g").append("g").attr("id", "heatMap");
  var playbackSvg = d3.select("#heatMap").append("g");
//   if (window.heatmapColorScale == undefined) {
    // window.heatmapColorScale = d3.scaleLinear().domain([0,max]).range([0,1]);
    // window.heatmapColorScale = d3.scaleLog().domain([1, max]).range([0.1, 0.7]);
    window.heatmapColorScale = d3.scaleSequential(d3.interpolateRgb("#ffffff", "red")).domain([0,max]);
//   }

  var numColumns = heatmapGrid.length;
  var numRows = heatmapGrid[0].length;
  for (var i = 0; i < heatmapGrid.length; i++) {
    for (var j = 0; j < heatmapGrid[i].length; j++) {
      playbackSvg
        .append("rect")
        .attrs({
          width: window.svgWidthHeight / numColumns,
          height: window.svgWidthHeight / numRows,
          x: (j * window.svgWidthHeight) / numColumns,
          y: (i * window.svgWidthHeight) / numRows,
          "stroke-width": "1px",
          stroke: "none",
          "stroke-opacity": 1,
          class: "heatmapTiles",
          fill: function(){
              return heatmapColorScale(heatmapGrid[i][j]);
          },
          isRail: function () {
            if (grid[i][j] != 0) return true;
            else return false;
          },
          "fill-opacity": 0.5
        //   function () {
        //     if (heatmapGrid[i][j] == 0) return 0;
        //     else return window.heatmapColorScale(heatmapGrid[i][j]);
        //   },
        })
        .on("mouseover", function () {
          if (d3.select(this).attr("isRail") == "true")
            d3.select(this).attr("stroke", "#000000").attr("stroke-opacity", 1);
        })
        .on("mouseout", function () {
          d3.select(this).attr("stroke", "none");
        })
        .append("title")
        .text(function () {
          if (grid[i][j] != 0)
            return "Occupied for " + heatmapGrid[i][j] + " timesteps";
        });
    }
  }

  colorScale = window.heatmapColorScale;
    const svg = d3.select("#videoSVG");
    const defs = svg.append("defs");
    var width = window.svgWidthHeight*2/3, height=window.svgWidthHeight;
    barHeight = 10;
    margin = ({top: window.svgWidthHeight - 1.5*barHeight, right: 5, bottom: 13, left: width/2})

    const linearGradient = defs.append("linearGradient")
        .attr("id", "linear-gradient");
    axisBottom = g => g
  .attr("class", `x-axis`)
  .attr("transform", `translate(${margin.left},${height - margin.bottom})`)
  .call(d3.axisBottom(axisScale)
    .ticks(width / 50)
    .tickSize(-barHeight))
    axisScale = d3.scaleLinear()
    .domain(colorScale.domain())
    .range([10,  width+10])
    
    
    linearGradient.selectAll("stop")
      .data(colorScale.ticks().map(function(t, i, n){ 
          return {offset: `${100*i/n.length}%`, color: colorScale(t)}; }))
      .enter().append("stop")
      .attr("offset", d => d.offset)
      .attr("stop-color", d => d.color);
    
    var legendGroup = svg.append('g');
      legendGroup.append("rect")
        // .attr('transform', `translate(${margin.left}, 0)`)
        .attr("width", width )
        .attr("height", barHeight)
        .style("fill", "url(#linear-gradient)")
        .style("fill-opacity", 0.5);
        svg.append("text").attrs({
            x: 10,
            y: margin.top-2,
            "font-size": "13px"
        }).text("Occupancy :");
        svg.append("text").attrs({
            x: 10,
            y: margin.top + 11,
            "font-size": "13px"
        }).text("(timesteps)");
    legendGroup.attr("transform", `translate(${margin.left + 10},${height - margin.bottom - barHeight})`);

    
    svg.append('g')
      .call(axisBottom);


  if (window.showHeatmap == false) {
    d3.select("#heatMap").attr("display", "none");
    document.getElementById("heatmapCheckbox").checked = false;
  } else {
    d3.select("#heatMap").attr("display", "visible");
    document.getElementById("heatmapCheckbox").checked = true;
  }
}

function makeAgentOrderCorrectInArray(array) {
  var resultArray = [];
  var orderArray = [1, 0, 3, 2];
  for (var i = 0; i < orderArray.length; i++) {
    if (Array.isArray(array[orderArray[i]])) {
      resultArray.push(Array.from(array[orderArray[i]]));
    } else if (typeof array[orderArray[i]] == "object") {
      if ("agent_id" in array[orderArray[i]]) {
        array[orderArray[i]]["agent_id"] = changeMappingOfAgentIndex(
          array[orderArray[i]]["agent_id"]
        );
      }
      resultArray.push(deepCopyDictionary(array[orderArray[i]]));
    } else {
      resultArray.push(array[orderArray[i]]);
    }
  }
  return resultArray;
}

function changeMappingOfAgentIndex(agentIndex) {
  var tempIndex = -1;
  switch (agentIndex) {
    case 0:
      tempIndex = 1;
      break;
    case 1:
      tempIndex = 0;
      break;
    case 2:
      tempIndex = 3;
      break;
    case 3:
      tempIndex = 2;
      break;
  }
  return tempIndex;
}

// agentNumber: 10 or 11 or 12 or 13
function changeMappingOfAgentBoardNumber(agentNumber) {
  var tempIndex = -1;
  switch (agentNumber) {
    case 10:
      tempIndex = 11;
      break;
    case 11:
      tempIndex = 10;
      break;
    case 12:
      tempIndex = 13;
      break;
    case 13:
      tempIndex = 12;
      break;
  }
  return tempIndex;
}

function changeAgentIndices(array) {
  var resultArray = [];
  for (var i = 0; i < array.length; i++) {
    resultArray.push(changeMappingOfAgentIndex(array[i]));
  }
  return resultArray;
}

function agentNameSimplify(agentName) {
  var index = agentName.lastIndexOf("/");
  var simpleName = agentName.substring(index + 1);

  index = simpleName.lastIndexOf("test::agents.");
  var simpleName2 = simpleName;
  if (index > -1) simpleName2 = simpleName.substring(index + 13);
  // return agentName;
  return simpleName2;
}

function deepCopyDictionary(object) {
  return JSON.parse(JSON.stringify(object));
}

function drawEventHistogram(eventType, entity, binSize, data, counter, root) {
  var y_Pos =
    window.endyPosOfMatrix + counter * (window.maxHeightOfHistogramBars + 5);
  var maximumNumberOfEventsInBin = d3.max(data);
  window.histogramYScale = d3
    .scaleLinear()
    .domain([0, maximumNumberOfEventsInBin])
    .range([0, window.maxHeightOfHistogramBars]);
  if (root == undefined) {
    root = d3
      .select("#mainVisualization")
      .append("g")
      .attr("id", "histogram");
  } else {
    root.selectAll("*").remove();
    root.remove();
    root = d3
      .select("#mainVisualization")
      .append("g")
      .attr("id", "histogram");
  }
  var maxCharacters = 22;
  var fullName = "All Trains";
  var shortName = "";

  if (fullName.length > maxCharacters) {
    shortName = fullName.substring(0, maxCharacters - 3) + "...";
  } else {
    shortName = fullName;
  }

  root.append("rect").attrs({
    x: 0,
    y: -maxHeightOfHistogramBars - 5,
    width: _param.mainVisualizationSvgWidth - 20,
    height: window.maxHeightOfHistogramBars + 25,
    fill:"white"
});

  root
    .append("text")
    .text(shortName + ":")
    .attrs({
      x: 15,
      y: -maxHeightOfHistogramBars,
      // "font-size":"12px",
      class: "info",
      "font-weight": "bold",
      "text-anchor": "start",
      "dominant-baseline": "hanging",
    })
    .append("title")
    .text(fullName);

  var gameMetricGroup = root.append("g").attrs({
    "data-toggle": "modal",
    "data-target": "#myModal",
  });
  gameMetricGroup
    .append("text")
    .text(" " + window.metric_labelDictionary[eventType])
    .attrs({
      x: _param.textEnd - 30,
      y: -maxHeightOfHistogramBars / 2,

      "text-anchor": "end",
      "dominant-baseline": "central",
      class: "info selectedMetric",
      "text-decoration": "underline",
      cursor: "pointer",
    });
  gameMetricGroup
    .append("text")
    .text("\ue019")
    .attrs({
      x: _param.textEnd - 25,
      y: -maxHeightOfHistogramBars / 2,
      "text-anchor": "start",
      "dominant-baseline": "central",
      class: "glyphicon",
      fill: "black",
      cursor: "pointer",
    });

  root
    .append("text")
    .text("(bar width = 10 steps)")
    .attrs({
      x: _param.textEnd - 15,
      y: 0,
      // "font-size":"12px",
      class: "info",
      "text-anchor": "end",
      "dominant-baseline": "central",
    });

  // var histogramXScale = d3.scaleLinear()
  //                     .domain([ 0, window._dataForVisualization.timespan])
  //                     .range([tableLocations[i+1]["start"], tableLocations[i+1]["end"]] );

  var widthOfOneBar = window.globalXScale(binSize) - window.globalXScale(0);
  // var numBins = Math.ceil(data.length / binSize);

  for (var i = 0; i < data.length; i++) {
    var bar = root.append("rect").attrs({
      x: window.globalXScale(binSize * i),
      y: 0 - window.histogramYScale(data[i]),
      width: widthOfOneBar,
      height: window.histogramYScale(data[i]),
      fill: _param.histogramBarColor,
      "fill-opacity": 0.8,
      stroke: "white",
      "stroke-width": "1px",
    });
    root.append("rect").attrs({
        x: window.globalXScale(binSize * i),
        y: -window.maxHeightOfHistogramBars,
        width: widthOfOneBar,
        height: window.maxHeightOfHistogramBars,
        fill: "none",
        "fill-opacity":0.1,
        "class":"histogramHoverBars",
        "pointer-events":"all",
        "cursor":"pointer",
        // "fill-opacity": 0.8,
        // stroke: "white",
        // "stroke-width": "1px",
      }).on("mouseover", function(){
          d3.select(this).attr("fill","grey");
      }).on("mouseout", function(){
          d3.select(this).attr("fill", "none");
      }).append("svg:title").text(function () {
      return data[i];
    });
  }
//   root.append("line").attrs({
//     x1: window.globalXScale(0),
//     y1: 0,
//     x2: window.globalXScale(binSize * data.length),
//     y2: 0,
//     stroke: "grey",
//     "stroke-width": "1px",
//     // "fill":"gray"
//   });
    root.attr("style", "transform: translate(0px," + (_param.svgHeight-10)  + "px);");
    //   root.attr("style", "transform: translate(0px," + y_Pos + "px);");
}

function countSetBits(n) {
  // base case
  if (n == 0) return 0;
  // if last bit set add 1 else add 0
  else return (n & 1) + countSetBits(n >> 1);
}

function checkJunction(previousDirection, currentStep, nextDirection, grid) {
  var cellValue = grid[currentStep[0]][currentStep[1]];
  // console.log(nextDirection);
  if (previousDirection == -1) {
    var numOfOnes = countSetBits(cellValue);
    if (numOfOnes > 2 && nextDirection > -1) return true;
    else return false;
  } else if (nextDirection == -1) {
    return false;
  } else {
    var binaryStr = cellValue.toString(2);
    while (binaryStr.length < 16) {
      binaryStr = "0" + binaryStr;
    }
    var startIndex = -1;
    switch (previousDirection) {
      case 0:
        startIndex = 0;
        break;
      case 1:
        startIndex = 4;
        break;
      case 2:
        startIndex = 8;
        break;
      case 3:
        startIndex = 12;
        break;
    }
    var substring = binaryStr.substr(startIndex, 4);
    var numOfOnes = substring.split("1").length - 1;
    if (numOfOnes > 1) return true;
    else return false;
  }
}

function calculateNextPosition(y, x, direction) {
  var direction_offset = [0, 0];
  switch (direction) {
    case -1:
      direction_offset = [0, 0];
      break;
    case 0:
      direction_offset = [-1, 0];
      break;
    case 1:
      direction_offset = [0, 1];
      break;
    case 2:
      direction_offset = [1, 0];
      break;
    case 3:
      direction_offset = [0, -1];
      break;
  }
  var new_position = [y + direction_offset[0], x + direction_offset[1]];
  return new_position;
}
function positionOffset(currentPosition, nextPosition) {
  var offset = [0, 0];
  offset[0] = nextPosition[0] - currentPosition[0];
  offset[1] = nextPosition[1] - currentPosition[1];
  return offset;
}
function calculateDirectionFromOffset(offset) {
  if (offset[0] == -1 && offset[1] == 0) return 0;
  else if (offset[0] == 0 && offset[1] == 1) return 1;
  else if (offset[0] == 1 && offset[1] == 0) return 2;
  else if (offset[0] == 0 && offset[1] == -1) return 3;
  else return -1;
}

function positionToString(pos) {
  return "[" + pos[0] + "," + pos[1] + "]";
}
function processData(data, submission) {
  var episodeData = data["environmentData"];

  var numTimesteps = episodeData["max_episode_steps"];
  var agentTimelineData = [];
  var agentInfoDictionary = {};
  var stationsDictionary = {};
  var stationIdCounter = 1;
  var agentIndex_DestinationDictionary = {};
  window._STATUS = { DONE: 3, INCOMPLETE: 2, READY: 1, INACTIVE: -1 };

  for (var i = 0; i < episodeData["agents"].length; i++) {
    agentIndex_DestinationDictionary[episodeData["agents"][i]["agent_index"]] =
      episodeData["agents"][i]["target"];
  }
  if(submission == "A")
    window.dataA[
        "agentIndex_DestinationDictionary"
    ] = agentIndex_DestinationDictionary;
   else if(submission == "B")
    window.dataB[
        "agentIndex_DestinationDictionary"
    ] = agentIndex_DestinationDictionary;
  // console.log("Before preprocessing: ", episodeData);

  for (var i = 0; i < episodeData["agents"].length; i++) {
    var temp_agent = episodeData["agents"][i];
    var agentDict = {
      movement: [0],
      junctions: [],
      malfunctions: [],
      startTimestep: -1,
      endTimestep: -1,
      status: [],
    };
    agentTimelineData[episodeData["agents"][i].agent_index] = agentDict;
    agentInfoDictionary[temp_agent.agent_index] = {
      target: temp_agent.target,
      initial_position: temp_agent.initial_position,
      status: temp_agent.status,
    };
    var targetString = positionToString(episodeData["agents"][i]["target"]);
    if (targetString in stationsDictionary) {
      stationsDictionary[targetString]["trains"].push(
        episodeData["agents"][i]["agent_index"]
      );
    } else {
      stationsDictionary[targetString] = {
        id: stationIdCounter++,
        pos: episodeData["agents"][i]["target"],
        trains: [episodeData["agents"][i]["agent_index"]],
      };
    }
  }

  if(submission == "A")
    window.dataA["stationsDictionary"] = stationsDictionary;
else if(submission == "B")
    window.dataB["stationsDictionary"] = stationsDictionary;
  // Store the malfunction of each trains

  for (var i = 0; i < episodeData["episode"].length; i++) {
    for (var j = 0; j < episodeData["episode"][i].length; j++) {
      agentTimelineData[j]["malfunctions"].push(
        episodeData["episode"][i][j][3]
      );
    }
  }
  //Correct the direction of trains in episode array
  for (var i = 0; i < episodeData["episode"].length - 1; i++) {
    for (var j = 0; j < episodeData["episode"][i].length; j++) {
      var nextStep = episodeData["episode"][i + 1][j];
      var currentStep = episodeData["episode"][i][j];
      var offset = positionOffset(
        [currentStep[0], currentStep[1]],
        [nextStep[0], nextStep[1]]
      );
      var direction = -1;
      // if(j==0 && currentStep[0] == 8 && currentStep[1] == 16)
      // {
      //     console.log(episodeData["episode"][i][j]);
      // }
      if (
        nextStep[0] == 0 &&
        nextStep[1] == 0 &&
        currentStep[0] != 0 &&
        currentStep[1] != 0 &&
        episodeData["grid"][0][0] == 0
      ) {
        var offset2 = positionOffset(
          [currentStep[0], currentStep[1]],
          [
            agentInfoDictionary[j]["target"][0],
            agentInfoDictionary[j]["target"][1],
          ]
        );
        var dist = Math.abs(offset2[0]) + Math.abs(offset2[1]);
        if (dist <= 2) {
          direction = calculateDirectionFromOffset(offset2);
        }
      } else {
        direction = calculateDirectionFromOffset(offset);
      }
      episodeData["episode"][i][j][2] = direction;
    }
  }
  var i = episodeData["episode"].length - 1;
  for (var j = 0; j < episodeData["episode"][i].length; j++) {
    episodeData["episode"][i][j][2] = -1;
  }

  // CORRECT THE STATUS OF TRAINS IN EPISODE ARRAY
  var agentStatus = {};
  for (var i = 0; i < episodeData["agents"].length; i++) {
    agentStatus[episodeData["agents"][i].agent_index] = _STATUS.INACTIVE;
  }
  for (var i = 0; i < episodeData["episode"].length; i++) {
    for (var j = 0; j < episodeData["episode"][i].length; j++) {
      var tempAgentEntry = episodeData["episode"][i][j];
      // if(tempAgentEntry[0] == 0 && tempAgentEntry[1] == 0 && episodeData["grid"][0][0] == 0 && agentStatus[j] != _STATUS.DONE && agentStatus[j] != _STATUS.INCOMPLETE && agentStatus[j] != _STATUS.DONE)
      // {
      //     agentStatus[j] = _STATUS.INACTIVE;
      // }
      var currentStep = episodeData["episode"][i][j];
      if (
        agentInfoDictionary[j]["initial_position"][0] == currentStep[0] &&
        agentInfoDictionary[j]["initial_position"][1] == currentStep[1] &&
        agentStatus[j] == _STATUS.INACTIVE
      ) {
        agentStatus[j] = _STATUS.READY;
      }
      if (i > 0) {
        var previousStep = episodeData["episode"][i - 1][j];

        if (
          previousStep[2] != -1 &&
          (agentStatus[j] == _STATUS.INACTIVE ||
            agentStatus[j] == _STATUS.READY)
        ) {
          agentStatus[j] = _STATUS.INCOMPLETE;
        }
      }
      if (agentStatus[j] != _STATUS.DONE) {
        var currentStep = episodeData["episode"][i][j];
        var nextPosition = calculateNextPosition(
          currentStep[0],
          currentStep[1],
          currentStep[2]
        );
        if (
          nextPosition[0] == agentInfoDictionary[j]["target"][0] &&
          nextPosition[1] == agentInfoDictionary[j]["target"][1]
        ) {
          agentStatus[j] = _STATUS.DONE;
        }
      }
      episodeData["episode"][i][j][3] = agentStatus[j];
    }
  }
  // console.log(episodeData);

  for (var i = 1; i < episodeData["episode"].length; i++) {
    for (var j = 0; j < episodeData["episode"][i].length; j++) {
      var previousStep = episodeData["episode"][i - 1][j];
      var currentStep = episodeData["episode"][i][j];

      var offset2 = positionOffset(
        [currentStep[0], currentStep[1]],
        [previousStep[0], previousStep[1]]
      );
      var dist = Math.abs(offset2[0]) + Math.abs(offset2[1]);

      var offset3 = positionOffset(
        [previousStep[0], previousStep[1]],
        [
          agentInfoDictionary[j]["target"][0],
          agentInfoDictionary[j]["target"][1],
        ]
      );
      var dist3 = Math.abs(offset3[0]) + Math.abs(offset3[1]);

      // if(j==1 && i==36)
      //     console.log(agentTimelineData[j]["movement"]);
      if (
        previousStep[0] == currentStep[0] &&
        previousStep[1] == currentStep[1]
      ) {
        agentTimelineData[j]["movement"].push(0);
      } else if (previousStep[3] == _STATUS.DONE && dist3 == 1) {
        agentTimelineData[j]["movement"].push(1);
      } else if (previousStep[3] != _STATUS.DONE && dist == 1) {
        agentTimelineData[j]["movement"].push(1);
      } else if (currentStep[3] == _STATUS.READY) {
        agentTimelineData[j]["movement"].push(0);
      } else if (currentStep[3] == _STATUS.DONE) {
        agentTimelineData[j]["movement"].push(0);
      }
    }
  }
  var agentStartEndStatus = {};
  for (var i = 0; i < episodeData["agents"].length; i++) {
    agentStartEndStatus[episodeData["agents"][i].agent_index] = {
      startTimestep: -1,
      endTimestep: -1,
    };
  }

  for (var i = 0; i < episodeData["episode"].length; i++) {
    for (var j = 0; j < episodeData["episode"][i].length; j++) {
      var nextDirection = episodeData["episode"][i][j][2];
      var currentStep = episodeData["episode"][i][j];
      var previousDirection;
      if (i == 0) previousDirection = -1;
      else previousDirection = episodeData["episode"][i - 1][j][2];

      if (
        checkJunction(
          previousDirection,
          currentStep,
          nextDirection,
          episodeData["grid"]
        )
      ) {
        agentTimelineData[j]["junctions"].push(1);
      } else {
        agentTimelineData[j]["junctions"].push(0);
      }

      if (
        agentStartEndStatus[j].startTimestep == -1 &&
        episodeData["episode"][i][j][3] != _STATUS.INACTIVE
      )
        agentStartEndStatus[j].startTimestep = i;

      if (
        agentStartEndStatus[j].endTimestep == -1 &&
        episodeData["episode"][i][j][3] == _STATUS.DONE
      )
        agentStartEndStatus[j].endTimestep = i + 1;

      agentTimelineData[j]["status"].push(episodeData["episode"][i][j][3]);
      agentTimelineData[j]["startTimestep"] =
        agentStartEndStatus[j].startTimestep;
      agentTimelineData[j]["endTimestep"] = agentStartEndStatus[j].endTimestep;
    }
  }

  // console.log(agentTimelineData);
  return agentTimelineData;
}

function computeOverallStatistics(agentTimelineData) {
  var totalNumTrains,
    totalNumTrainsReachedDestination = 0,
    totalNumTrainsInProgress = 0,
    totalNumTrainsYetToRun = 0;
  totalNumTrains = agentTimelineData.length;
  for (var i = 0; i < agentTimelineData.length; i++) {
    var agentStatusArray = agentTimelineData[i]["status"];
    var agentLastKnownStatus = agentStatusArray[agentStatusArray.length - 1];
    switch (agentLastKnownStatus) {
      case 3:
        totalNumTrainsReachedDestination++;
        break;
      case 2:
        totalNumTrainsInProgress++;
        break;
      case 1:
        totalNumTrainsInProgress++;
        break;
      case -1:
        totalNumTrainsYetToRun++;
        break;
    }
  }

  return {
    totalNumTrains: totalNumTrains,
    totalNumTrainsReachedDestination: totalNumTrainsReachedDestination,
    totalNumTrainsInProgress: totalNumTrainsInProgress,
    totalNumTrainsYetToRun: totalNumTrainsYetToRun,
  };
}

// Output: an perframe status 2d array. Each element is an array or three elements [done, in progres, yet to start]
function computePerFrameStatistics(agentTimelineData) {
  var currentNumTrainsReachedDestination = 0,
    currentNumTrainsInProgress = 0,
    currentNumTrainsYetToStart = 0;
  var perFrameStatsArray = [];

  for (var i = 0; i < agentTimelineData.length; i++) {
    var agentStatusArray = agentTimelineData[i]["status"];
    for (var j = 0; j < agentStatusArray.length; j++) {
      if (j >= perFrameStatsArray.length) {
        perFrameStatsArray.push([0, 0, 0]);
      }
      var agentStatus = agentStatusArray[j];
      switch (agentStatus) {
        case 3:
          perFrameStatsArray[j][0]++;
          break;
        case 2:
          perFrameStatsArray[j][1]++;
          break;
        case 1:
          perFrameStatsArray[j][1]++;
          break;
        case -1:
          perFrameStatsArray[j][2]++;
          break;
      }
    }
  }

  return perFrameStatsArray;
}

function drawOverallStatistics(overallStatisticsDict, boolA, boolB) {
  var percentDone =
    (overallStatisticsDict.totalNumTrainsReachedDestination /
      overallStatisticsDict.totalNumTrains) *
    100;
    if(boolA == true && boolB == false)
    {
        d3.select("#percentDoneA").text(percentDone.toFixed(2) + "%");
        d3.select("#totalNumTrainsA").text(overallStatisticsDict.totalNumTrains);
        d3.select("#totalNumTrainsReachedDestinationA").text(
            overallStatisticsDict.totalNumTrainsReachedDestination
        );
        d3.select("#totalNumTrainsYetToRunA").text(
            overallStatisticsDict.totalNumTrainsYetToRun
        );
        d3.select("#totalNumTrainsInProgressA").text(
            overallStatisticsDict.totalNumTrainsInProgress
        );
    }
    else if(boolA == false && boolB == true)
    {
        d3.select("#percentDoneB").text(percentDone.toFixed(2) + "%");
        d3.select("#totalNumTrainsB").text(overallStatisticsDict.totalNumTrains);
        d3.select("#totalNumTrainsReachedDestinationB").text(
            overallStatisticsDict.totalNumTrainsReachedDestination
        );
        d3.select("#totalNumTrainsYetToRunB").text(
            overallStatisticsDict.totalNumTrainsYetToRun
        );
        d3.select("#totalNumTrainsInProgressB").text(
            overallStatisticsDict.totalNumTrainsInProgress
        );
    }

}

function computeHistogramData(data, metric, binSize, episodeLength) {
  var numBins = Math.ceil(episodeLength / binSize);
  var outputData = [];

  for (var i = 0; i < numBins; i++) {
    var count = 0;
    var perAgentCount = {};
    for (var j = 0; j < binSize; j++) {
      var datumIndex = binSize * i + j;
      for (
        var k = 0;
        k < data.length;
        k++ //k is agent_index
      ) {
        if (!(k in perAgentCount)) perAgentCount[k] = 0;

        if (datumIndex >= episodeLength) {
          outputData.push(count);
          return outputData;
        }
        if (metric == "movement") {
          count += data[k][metric][datumIndex];
        } else if (metric == "junctions") {
          count += data[k][metric][datumIndex];
        } else if (metric == "malfunctions") {
          if (
            data[k][metric][datumIndex] > 0 &&
            perAgentCount[k] == 0 &&
            data[k]["startTimestep"] != -1 &&
            data[k]["startTimestep"] <= datumIndex
          ) {
            if (data[k]["endTimestep"] == -1) perAgentCount[k]++;
            else if (data[k]["endTimestep"] >= datumIndex) perAgentCount[k]++;
          }
        } else if (metric == "startTimestep" || metric == "endTimestep") {
          if (data[k][metric] != -1 && data[k][metric] == datumIndex)
            count += 1;
        }
      }
    }
    if (metric == "malfunctions") {
      var sum = 0;
      for (var agent_index in perAgentCount) {
        var v = perAgentCount[agent_index];
        if (v == 1) sum++;
      }
      outputData.push(sum);
    } else {
      outputData.push(count);
    }
  }
  // console.log(outputData);
  return outputData;
}

// Partly deprecated, made another function to make vertical lines for comparision mode makeSideVerticalLineForBoth()
function makeSideVerticalLine(y1, y2, groupType, svg, icon, boolCompare) {
  var x = 50,
    tickLength = 5,
    distToLine = 13;
  svg.append("line").attrs({
    x1: x,
    y1: y1,
    x2: x,
    y2: y2,
    "stroke-width": "1px",
    stroke: "#000000",
  });
  svg.append("line").attrs({
    x1: x,
    y1: y1,
    x2: x + tickLength,
    y2: y1,
    "stroke-width": "1px",
    stroke: "#000000",
  });
  svg.append("line").attrs({
    x1: x,
    y1: y2,
    x2: x + tickLength,
    y2: y2,
    "stroke-width": "1px",
    stroke: "#000000",
  });
  svg
    .append("text")
    .attrs({
      x: x - distToLine,
      y: y1 + (y2 - y1) / 2,
      "dominant-baseline": "central",
      "text-anchor": "middle",
      transform:
        "rotate(-90, " + (x - distToLine) + "," + (y1 + (y2 - y1) / 2) + ")",
    })
    .text(function () {
      if (groupType == "ontrack") 
      {
          if(boolCompare) 
            return "On-track (A & B)"
        else
            return "On-track";
      }
      else if (groupType == "reached")
      {
          if(boolCompare) 
            return "Reached (A & B)"
        else 
            return "Reached";
      }
      else if (groupType == "yettostart")
      {
          if(boolCompare) 
            return "Did not start (A & B)"
        else
           return "Did not start";
      }
    });
  if (icon != undefined) {
    svg
      .append("text")
      .attrs({
        // "class": "currentNumTrainsReachedDestination",
        x: x - distToLine - 10,
        y: y1 + (y2 - y1) / 2,
        class: "glyphicon",
        "text-anchor": "end",
        "dominant-baseline": "central",
        fill: "black",
        "font-size": 1.5 * _param.iconSize,
        cursor: "pointer",
      })
      .text(icon)
      .append("title")
      .text(function () {
        if (groupType == "ontrack") return "On-track";
        else if (groupType == "reached") return "Reached";
        else if (groupType == "yettostart") return "Did not start";
      });
  }
}

function drawDeadlockVis(svg, boolA, boolB) {
  var dlockGroup = svg.append("g");
  var data;
  if(boolA == true && boolB == false)
    data = window.dataA;
else if(boolA == false && boolB == true)
    data = window.dataB;
    
  var deadLockDictionary = data["deadlockData"];
  var lineHeightAboveDSquare = 3 + _param.radiusOfCircle;

  for (var dlockid in deadLockDictionary) 
  {
    var details = deadLockDictionary[dlockid];
    involvedAgents = details["finalset"];
    updatedInvolvedAgents = [];
    for(var i=0; i<involvedAgents.length; i++)
    {
        var agentstatus = data["environmentData"]["agents"][involvedAgents[i]]["status"];
        switch(agentstatus)
        {
            case 1: updatedInvolvedAgents.push(involvedAgents[i]);
                break;
        }
    }
    data["deadlockData"][dlockid]["finalset"] = updatedInvolvedAgents;
    

    initialAgents = details["originalset"];
    updatedInitialAgents = [];
    for(var i=0; i<initialAgents.length; i++)
    {
        var agentstatus = data["environmentData"]["agents"][initialAgents[i]]["status"];
        switch(agentstatus)
        {
            case 1: updatedInitialAgents.push(initialAgents[i]);
                break;
        }
    }
    data["deadlockData"][dlockid]["originalset"] = updatedInitialAgents;
    if(updatedInvolvedAgents.length == 0 || updatedInitialAgents.length == 0)
        delete data["deadlockData"][dlockid];

  }

  for (var dlockid in deadLockDictionary) {
    var details = deadLockDictionary[dlockid];
    initial_agents = details["originalset"];
    initial_step = details["createdStep"];

    var positionsOfInvolvedAgents = [];
    for (var i = 0; i < initial_agents.length; i++) {
      positionsOfInvolvedAgents.push(globalYScale(initial_agents[i]));
    }
    positionsOfInvolvedAgents.sort();
    var y1 = positionsOfInvolvedAgents[0],
      y2 = positionsOfInvolvedAgents[positionsOfInvolvedAgents.length - 1];
    var endYPosOfAgentsStartingDeadlock = y2,
      endXPosOfAgentsStartingDeadlock = globalXScale(initial_step);

    dlockGroup.append("line").attrs({
      x1: endXPosOfAgentsStartingDeadlock,
      y1: function(){
          var tempY =  y1;
          if(positionsOfInvolvedAgents.length>2)
            tempY = tempY - lineHeightAboveDSquare;
            if(window.comparison)
            {
                if(boolA)
                    tempY =  tempY - _param.heightOfRow/_param.rowFactor;
                else if(boolB)
                    tempY =  tempY + _param.heightOfRow/_param.rowFactor;
            }
            return tempY;
        },
      x2: endXPosOfAgentsStartingDeadlock,
      y2: function(){
        var tempY =  y2;
      if(window.comparison)
      {
          if(boolA)
              tempY =  tempY - _param.heightOfRow/_param.rowFactor;
          else if(boolB)
              tempY =  tempY + _param.heightOfRow/_param.rowFactor;
      }
      return tempY;
    },
      stroke: function(){
        if(boolA)
            return _param.colorA;
        else if(boolB)
            return _param.colorB;
    },
      // "stroke-dasharray":"5 5",
      "stroke-width": "1px",
      class: function(){
        var classes =   "deadlockShape timeLineVisComponent deadlock" + dlockid;
        if(boolA)
            classes +=" deadlockA";
        else if(boolB)
            classes += " deadlockB";
        return classes;
      }
        
    });

    trainsAddedToDeadlock = details["added"];

    var maxStep = -1;
    if(trainsAddedToDeadlock.length >0)
    {
        
        for (var i = 0; i < trainsAddedToDeadlock.length; i++) {
        var step = trainsAddedToDeadlock[i]["step"];
        if (step > maxStep) maxStep = step;
        }
        dlockGroup.append("line").attrs({
        x1: endXPosOfAgentsStartingDeadlock,
        y1: function(){
            var tempY =  y1- lineHeightAboveDSquare;
          if(window.comparison)
          {
              if(boolA)
                  tempY =  tempY - _param.heightOfRow/_param.rowFactor;
              else if(boolB)
                  tempY =  tempY + _param.heightOfRow/_param.rowFactor;
          }
          return tempY;
        },
        x2: globalXScale(maxStep),
        y2: function(){
            var tempY =  y1 - lineHeightAboveDSquare;
          if(window.comparison)
          {
              if(boolA)
                  tempY =  tempY - _param.heightOfRow/_param.rowFactor;
              else if(boolB)
                  tempY =  tempY + _param.heightOfRow/_param.rowFactor;
          }
          return tempY;
        },
        stroke: function(){
            if(boolA)
                return _param.colorA;
            else if(boolB)
                return _param.colorB;
        },
        // "stroke-dasharray":"5 5",
        "stroke-width": "1px",
        class:function(){
            var classes =   "deadlockShape timeLineVisComponent deadlock" + dlockid;
            if(boolA)
                classes +=" deadlockA";
            else if(boolB)
                classes += " deadlockB";
            return classes;
          }
        });
    }

    for (var i = 0; i < trainsAddedToDeadlock.length; i++) {
      var step = trainsAddedToDeadlock[i]["step"];
      var elements = trainsAddedToDeadlock[i]["elements"];
      for (var j = 0; j < elements.length; j++) {
        // var x1 = endXPosOfAgentsStartingDeadlock, y1 = endYPosOfAgentsStartingDeadlock;
        var p1x = endXPosOfAgentsStartingDeadlock,
          p1y = endYPosOfAgentsStartingDeadlock + _param.radiusOfCircle + 3;
        var x2 = globalXScale(step);
        var y2 = globalYScale(elements[j]);
        var p2x = x2,
          p2y = p1y;

        // dlockGroup.append("path").attrs({
        //     "d": "M " + x1 + " " + y1 + " L " + p1x + " " + p1y + ", " + p2x + " " + p2y + ", " + x2 + " " + y2,
        //     "stroke-width": "1px",
        //     "stroke":"#000000",
        //     "fill":"none",
        //     // "class": "deadlockCurve"
        //     "class": "deadlockShape timeLineVisComponent"
        // });

        dlockGroup.append("line").attrs({
          x1: globalXScale(step),
          y1: function(){
            var tempY =  y1 - lineHeightAboveDSquare;
          if(window.comparison)
          {
              if(boolA)
                  tempY =  tempY - _param.heightOfRow/_param.rowFactor;
              else if(boolB)
                  tempY =  tempY + _param.heightOfRow/_param.rowFactor;
          }
          return tempY;
        },
          x2: globalXScale(step),
          y2: function(){
            var tempY =  y2;
          if(window.comparison)
          {
              if(boolA)
                  tempY =  tempY - _param.heightOfRow/_param.rowFactor;
              else if(boolB)
                  tempY =  tempY + _param.heightOfRow/_param.rowFactor;
          }
          return tempY;
        },
          stroke: function(){
            if(boolA)
                return _param.colorA;
            else if(boolB)
                return _param.colorB;
        },
          // "stroke-dasharray":"5 5",
          "stroke-width": "1px",
          class: function(){
            var classes =   "deadlockShape timeLineVisComponent deadlock" + dlockid;
            if(boolA)
                classes +=" deadlockA";
            else if(boolB)
                classes += " deadlockB";
            return classes;
          }
        });

        dlockGroup
          .append("rect")
          .attrs({
            x: x2 - _param.radiusOfCircle,
            y: function(){
                var tempY =  y2 - _param.radiusOfCircle;
              if(window.comparison)
              {
                  if(boolA)
                      tempY =  tempY - _param.heightOfRow/_param.rowFactor;
                  else if(boolB)
                      tempY =  tempY + _param.heightOfRow/_param.rowFactor;
              }
              return tempY;
            },
            width: 2 * _param.radiusOfCircle,
            height: 2 * _param.radiusOfCircle,
            fill: function(){
                if(boolA)
                    return _param.colorA;
                else if(boolB)
                    return _param.colorB;
            },
            opacity: _param.glyphOPacity,
            stroke: _param.deadlockShapeBoundaryColor,
            "stroke-width": _param.deadlockShapeStrokeWidth,
            "stroke-opacity": 1,
            class:function(){
                var classes =   "deadlockShape timeLineVisComponent deadlock" + dlockid;
                if(boolA)
                    classes +=" deadlockA";
                else if(boolB)
                    classes += " deadlockB";
                return classes;
              },
            deadlockid: dlockid,
            cursor: "pointer",
            "pointer-events": "all",
          })
          .on("mouseover", function (d, i) {
            var dlockid = d3.select(this).attr("deadlockid");
            var trains = data["deadlockData"][dlockid]["finalset"];
            highlightTrains(trains);
          })
          .on("mouseout", function () {
            deHighlightTrains();
          })
          .append("title")
          .text(
            "Deadlock between trains " +
              data["deadlockData"][dlockid]["finalset"]
          );
      }
    }
    for (var i = 0; i < positionsOfInvolvedAgents.length; i++) {
      // dlockGroup.append("circle").attrs({
      //     "cx": endXPosOfAgentsStartingDeadlock,
      //     "cy": positionsOfInvolvedAgents[i],
      //     r: _param.radiusOfCircle,
      //     "fill": "red",
      //     "stroke":"black",
      //     "stroke-width": "2px",
      //     "class": "deadlockShape"
      // })

      dlockGroup
        .append("rect")
        .attrs({
          x: endXPosOfAgentsStartingDeadlock - _param.radiusOfCircle,
          y: function(){
            var tempY = positionsOfInvolvedAgents[i] - _param.radiusOfCircle;
          if(window.comparison)
          {
              if(boolA)
                  tempY =  tempY - _param.heightOfRow/_param.rowFactor;
              else if(boolB)
                  tempY =  tempY + _param.heightOfRow/_param.rowFactor;
          }
          return tempY;
        },
          width: 2 * _param.radiusOfCircle,
          height: 2 * _param.radiusOfCircle,
          fill: function(){
            if(boolA)
                return _param.colorA;
            else if(boolB)
                return _param.colorB;
        },
          opacity: _param.glyphOPacity,
          stroke: _param.deadlockShapeBoundaryColor,
          "stroke-width": _param.deadlockShapeStrokeWidth,
          "stroke-opacity": 1,
          class: function(){
            var classes =   "deadlockShape timeLineVisComponent deadlock" + dlockid;
            if(boolA)
                classes +=" deadlockA";
            else if(boolB)
                classes += " deadlockB";
            return classes;
          },
          deadlockid: dlockid,
          cursor: "pointer",
          "pointer-events": "all",
        })
        .on("mouseover", function (d, i) {
          var dlockid = d3.select(this).attr("deadlockid");
          var trains = data["deadlockData"][dlockid]["finalset"];
          highlightTrains(trains);
        })
        .on("mouseout", function () {
          deHighlightTrains();
        })
        .append("title")
        .text(
          "Deadlock between trains " +
            data["deadlockData"][dlockid]["finalset"]
        );
    }
  }
}

function highlightEventsFunc() {
  d3.selectAll(".timeLineVisComponent").attr("opacity", 0.1);

  var glyphOPacity = _param.glyphOPacity;

  for (var event in window.highlightEvents) {
    if (window.highlightEvents[event]) {
      if (event == "movement")
        d3.selectAll(".moved").attr("opacity", glyphOPacity);

      if (event == "startTrain") {
        d3.selectAll(".startTimestep").attr("opacity", glyphOPacity);
      }

      if (event == "endTrain") {
        d3.selectAll(".endTimestep").attr("opacity", glyphOPacity);
      }
      if (event == "junction") {
        d3.selectAll(".junction").attr("opacity", glyphOPacity);
      }
      if (event == "malfunction") {
        d3.selectAll(".malfunction").attr("opacity", glyphOPacity);
      }
      if (event == "deadlock") {
        d3.selectAll(".deadlockShape").attr("opacity", glyphOPacity);
      }
      d3.selectAll("." + event).attr("fill-opacity", 0.6);
    }
  }
}

function drawLegendOfEncodings(svg, boolA, boolB) {
  var eventLegendGroup = svg.append("g");
  var rectX,
    rectY,
    rectWidth = 0,
    rectHeight = 0;
  // var distanceBetweenCircles = (width - textEnd)/(eventNameArray.length + 1);
  var textEnd = _param.textEnd;
  var radiusOfCircle = _param.radiusOfCircle;
  var distanceBetweenCircles = 130;
  var eventNameArray = _param.events;

  var eventsDictionary;
    if(window.comparison)
        eventsDictionary = _param.eventsDictionaryComparison;
    else
        eventsDictionary = _param.eventsDictionary;
  var tableTop = 30;
  var topPadding = _param.topPadding;
  var glyphOPacity = _param.glyphOPacity;
  var colors = _param.colors;
  var nextStartingPosition = textEnd + 120;
  var size = _param.radiusOfCircleInLegend;
  for (var i = 0; i < eventNameArray.length; i++) {
    var eventKey = eventsDictionary[eventNameArray[i]];
    var eventGroup = eventLegendGroup
      .append("g")
      .attr("type", eventNameArray[i])
      .attr("cursor", "pointer")
      .attr("index", i)
      .attr("eventKey", eventKey);
    var checkboxwidth = 10;

    var checkboxXPos =
      nextStartingPosition - 2 * radiusOfCircle - 2 * checkboxwidth;
    var checkboxYPos = topPadding - tableTop - checkboxwidth / 2;
    eventGroup.append("rect").attrs({
      x: checkboxXPos,
      y: checkboxYPos,
      width: checkboxwidth,
      height: checkboxwidth,
      fill: "white",
      stroke: "black",
      "stroke-width": "1px",
      class: "checkBoxes",
      id: "checkbox" + i,
      index: i,
      checked: function () {
        var eventKey = eventsDictionary[eventNameArray[i]];
        if (window.highlightEvents[eventKey] == true) {
          return "true";
        } else return "false";
      },
    });

    eventGroup.append("path").attrs({
      d:
        "M " +
        checkboxXPos +
        " " +
        (topPadding - tableTop - 2) +
        " l " +
        checkboxwidth / 2 +
        " " +
        checkboxwidth / 2 +
        " l " +
        checkboxwidth +
        " -" +
        checkboxwidth,
      stroke: "black",
      "stroke-width": "2px",
      opacity: 1,
      visibility: function () {
        var eventKey = eventsDictionary[eventNameArray[i]];
        if (window.highlightEvents[eventKey] == true) {
          return "visible";
        } else return "hidden";
      },
      fill: "none",
      id: "checkMark" + i,
    });

    if (eventsDictionary[eventNameArray[i]] == "movement") {
      eventGroup.append("rect").attrs({
        // "x": textEnd + i*distanceBetweenCircles - radiusOfCircle,
        x: nextStartingPosition - radiusOfCircle,
        y: topPadding - tableTop - radiusOfCircle / 2,
        width: 3 * radiusOfCircle,
        height: radiusOfCircle,
        "fill-opacity": glyphOPacity,
        fill: function(){
            if(boolA)
                return _param.colorA;
            else if(boolB)
                return _param.colorB;
        },
      });
    } else if (eventsDictionary[eventNameArray[i]] == "startTrain") {
      eventGroup.append("circle").attrs({
        // cx: textEnd + i*distanceBetweenCircles,
        cx: nextStartingPosition,
        cy: topPadding - tableTop,
        r: size,
        fill: "none",
        stroke: "black",
        "stroke-width": "2px",
        // "class": "startTimestep"
      });
    } else if (eventsDictionary[eventNameArray[i]] == "endTrain") {
      eventGroup.append("circle").attrs({
        // cx: textEnd + i*distanceBetweenCircles,
        cx: nextStartingPosition,
        cy: topPadding - tableTop,
        r: size,
        fill: colors[4],
        "fill-opacity": glyphOPacity,
      });
    } else if (eventsDictionary[eventNameArray[i]] == "junction") {
      var t_width = 1.5 * size,
        t_height = t_width;
      x_Pos = nextStartingPosition - t_width / 2;
      y_Pos = topPadding - tableTop - t_width / 2;
      eventGroup.append("rect").attrs({
        x: x_Pos,
        y: y_Pos,
        rx: 0,
        ry: 0,
        width: t_width,
        height: t_height,
        // fill: colors[3],
        fill:"none",
        stroke: "black",
        "stroke-width": "1px",
        "stroke-opacity": glyphOPacity,
        "fill-opacity": glyphOPacity,
        transform:
          "rotate(-45," +
          (x_Pos + t_width / 2) +
          "," +
          (y_Pos + t_height / 2) +
          ")",
      });
    } else if (eventsDictionary[eventNameArray[i]] == "malfunction") {
      var t_width = size,
        t_height = t_width;
      x_Pos = nextStartingPosition;
      y_Pos = topPadding - tableTop;
      eventGroup
        .append("text")
        .attrs({
          x: x_Pos + t_width / 2,
          y: y_Pos,
          "font-size": 1.5 * t_height + "px",
          "dominant-baseline": "central",
          "text-anchor": "middle",
          "stroke": function(){
            if(boolA)
                return _param.colorA;
            else if(boolB)
                return _param.colorB;
        },
        })
        .text("X-----");
    } else if (eventsDictionary[eventNameArray[i]] == "deadlock") {
      var t_width = 1.5 * size,
        t_height = t_width;
      x_Pos = nextStartingPosition - t_width / 2;
      y_Pos = topPadding - tableTop - t_width / 2;
      eventGroup.append("rect").attrs({
        x: x_Pos,
        y: y_Pos,
        width: t_width,
        height: t_height,
        fill: function(){
            if(boolA)
                return _param.colorA;
            else if(boolB)
                return _param.colorB;
        },
        opacity: _param.glyphOPacity,
        stroke: _param.deadlockShapeBoundaryColor,
        "stroke-width": _param.deadlockShapeStrokeWidth,
        "stroke-opacity": 1,
      });
    } else {
      eventGroup.append("circle").attrs({
        // cx: textEnd + i*distanceBetweenCircles,
        cx: nextStartingPosition,
        cy: topPadding - tableTop,
        r: size,
        "fill-opacity": function () {
          // if(eventNameArray[i] == "Death")
          // {
          //     return 1;
          // }
          // else
          return glyphOPacity;
        },
        fill: function () {
          return colors[i];
        },
      });
    }

    var textElm = eventGroup
      .append("text")
      .attrs({
        // x: textEnd + i*distanceBetweenCircles + 2*radiusOfCircle + 5,
        x: function (d) {
          if (eventsDictionary[eventNameArray[i]] == "malfunction")
            return nextStartingPosition + 2 * radiusOfCircle + 25;
          else return nextStartingPosition + 2 * radiusOfCircle + 5;
        },
        y: topPadding - tableTop,
        "dominant-baseline": "central",
      })
      .text(function () {
        return eventNameArray[i];
      });

    var textRect = textElm.node().getBBox();
    nextStartingPosition = textRect.x + textRect.width + 50;

    if (i == eventNameArray.length - 1) {
      rectWidth = i * distanceBetweenCircles;
      rectHeight = 3 * size;
    }

    eventGroup.on("mousedown", function () {
      var index = d3.select(this).attr("index");
      var eventKey = d3.select(this).attr("eventKey");
      if (d3.select("#checkbox" + index).attr("checked") == "false") {
        d3.select("#checkMark" + index).attr("visibility", "visible");
        d3.select("#checkbox" + index).attr("checked", "true");
        window.highlightEvents[eventKey] = true;
      } else {
        d3.select("#checkMark" + index).attr("visibility", "hidden");
        d3.select("#checkbox" + index).attr("checked", "false");
        window.highlightEvents[eventKey] = false;
      }
      highlightEventsFunc();
    });
  }

  rectWidth += 70;
  rectX = textEnd + 60;
  rectY = topPadding - tableTop - rectHeight / 2;

  eventLegendGroup.append("rect").attrs({
    // "x": rectX + 120,
    x: rectX,
    y: rectY,
    width: rectWidth,
    height: rectHeight + 3,
    stroke: "black",
    fill: "none",
    "stroke-width": "1px",
  });

  highlightEventsFunc();
//   eventLegendGroup.attr("transform", "translate("+(-textEnd +40)+",0)");
  eventLegendGroup.attr("transform", `translate(0,${-rectY+10})`);

}
function putTrainsinGroups(agentTimelineData) {
  groupDict = {
    reached: { agent_indices: [] },
    ontrack: { agent_indices: [] },
    yettostart: { agent_indices: [] },
  };
  for (var i = 0; i < agentTimelineData.length; i++) {
    var agent_index = i;
    if (agentTimelineData[i]["startTimestep"] == -1) {
      groupDict["yettostart"]["agent_indices"].push(agent_index);
    } else if (agentTimelineData[i]["endTimestep"] == -1) {
      groupDict["ontrack"]["agent_indices"].push(agent_index);
    } else if (
      agentTimelineData[i]["endTimestep"] >= 0 &&
      agentTimelineData[i]["startTimestep"] >= 0
    ) {
      groupDict["reached"]["agent_indices"].push(agent_index);
    }
  }
  groupDict["reached"]["agent_indices"] = sortTrains(
    "startTimestep",
    "ascending",
    groupDict["reached"]["agent_indices"],
    agentTimelineData
  );
  groupDict["ontrack"]["agent_indices"] = sortTrains(
    "startTimestep",
    "ascending",
    groupDict["ontrack"]["agent_indices"],
    agentTimelineData
  );
  // groupDict["yettostart"]["agent_indices"] = sortTrains("startTimestep", "ascending", groupDict["reached"]["agent_indices"], agentTimelineData);
  return groupDict;
}

function sortTrains(sortCriteria, order, entitiesArray, agentTimelineData) {
  entitiesArray.sort(function (a, b) {
    if (sortCriteria == "startTimestep" || sortCriteria == "endTimestep") {
      aTime = agentTimelineData[a][sortCriteria];
      bTime = agentTimelineData[b][sortCriteria];

      if (aTime != -1 && bTime != -1) return aTime - bTime;
      else if (aTime == -1 && bTime != -1) return 1;
      else if (aTime != -1 && bTime == -1) return -1;
      else return 0;
    }
  });
  return entitiesArray;
}



function drawRightColumn(svg, topLegendGroup) {
  var columnRightPadding = 0;
  var paddingRightEnd = 0;
  var widthOfDestinationColumn = 40;
  var startX = _param.svgWidth - _param.rightPadding + widthOfDestinationColumn;
  var width =
    _param.rightPadding -
    columnRightPadding -
    paddingRightEnd -
    widthOfDestinationColumn;
  var distancesArray = [];
  var rightColumnGroup = svg.append("g");
  var topBottomPadding = 8;
  var paddingBetweenBars = 2;

  // Draw Destination Stations
  var destinationG = svg.append("g");
  var destinationX =
    _param.svgWidth - _param.rightPadding + widthOfDestinationColumn / 2;
  for (var i = 0; i < window.data["environmentData"]["agents"].length; i++) {
    var agent_index =
      window.data["environmentData"]["agents"][i]["agent_index"];
    var target = window.data["environmentData"]["agents"][i]["target"];
    var targetString = positionToString(target);
    var stationId = window.data["stationsDictionary"][targetString]["id"];
    // destinationG.attr("id", "StationGroup"+stationId).attr("class", "StationGroupClass");
    destinationG
      .append("text")
      .attrs({
        x: destinationX,
        y: globalYScale(agent_index),
        "dominant-baseline": "central",
        "text-anchor": "middle",
        "stationId": stationId,
        "cursor":"pointer",
        "class":"stationLabel stationLabel"+stationId,
        "pointer-events":"bounding-box"
      })
      .text(sameLengthStationId(stationId, window.data))
      .on("mouseover", function(d){
          var stationId = +d3.select(this).attr("stationId");
        var trainsArray = window.data["stationsIdDictionary"][stationId]["trains"];
        highlightStations([stationId]);
        highlightTrains(trainsArray);
    }).on("mouseout", function(){
      deHighlightStations();
      deHighlightTrains();
    });
  }

  var stationNumStartX = _param.svgWidth - _param.rightPadding,
    stationNumEndX = stationNumStartX + widthOfDestinationColumn;
  var stationNumStartY =
      globalYScale(_param.entitiesArray[0]) - _param.heightOfRow / 2,
    stationNumEndY =
      globalYScale(_param.entitiesArray[_param.entitiesArray.length - 1]) +
      _param.heightOfRow / 2;
  destinationG.append("line").attrs({
    x1: stationNumStartX,
    y1: stationNumStartY,
    x2: stationNumStartX,
    y2: stationNumEndY,
    stroke: "grey",
  });
  destinationG.append("line").attrs({
    x1: stationNumEndX,
    y1: stationNumStartY,
    x2: stationNumEndX,
    y2: stationNumEndY,
    stroke: "grey",
  });
  
  topLegendGroup
    .append("rect")
    .attrs({
      x: 0,
      y: 0,
      width: 100,
      height: 30,
      fill: "lightgrey",
      "fill-opacity": 0.2,
      transform:
        "rotate(45, " +
        stationNumStartX +
        "," +
        stationNumStartY +
        ") skewX(-45)" +
        "translate(" +
        (stationNumStartX + widthOfDestinationColumn - 55) +
        ", " +
        (stationNumStartY - 32) +
        ")",
    })
    .text("Destination");

    destinationG.append("rect").attrs({
    x: stationNumStartX,
    y: stationNumStartY,
    width: widthOfDestinationColumn,
    height: stationNumEndY - stationNumStartY,
    fill: "lightgrey",
    "fill-opacity": 0.2,
    "pointer-events":"none"
  });
  topLegendGroup
    .append("text")
    .attrs({
      x: stationNumStartX + widthOfDestinationColumn / 2,
      y: stationNumStartY - 10,
      "text-anchor": "end",
      "dominant-baseline": "central",
      transform:
        "translate(" +
        (stationNumStartX + widthOfDestinationColumn / 2) +
        ", " +
        (stationNumStartY - 10) +
        ") rotate(45) " +
        "translate(" +
        -(stationNumStartX + widthOfDestinationColumn / 2) +
        ", " +
        -(stationNumStartY - 10) +
        ")",
    })
    .text("Destination");

  for (var agent_index in window.data["agentPathsData"]) {
    distancesArray.push(
      window.data["agentPathsData"][agent_index]["shortest_path_length"]
    );
    distancesArray.push(
      window.data["agentPathsData"][agent_index]["actual_path_length"]
    );
  }
  var rightColumnXScale = d3
    .scaleLinear()
    .domain([0, d3.max(distancesArray)])
    .range([0, width]);
  for (var agent_index in window.data["agentPathsData"]) {
    var x = startX,
      y = globalYScale(agent_index) - _param.heightOfRow / 2;
      if(y <0) y=0;
    var heightOfBar =
      _param.heightOfRow / 2 - paddingBetweenBars / 2 - topBottomPadding / 2;
    var actual_path_length =
      window.data["agentPathsData"][agent_index]["actual_path_length"];
    var shortest_path_length =
      window.data["agentPathsData"][agent_index]["shortest_path_length"];
    rightColumnGroup
      .append("rect")
      .attrs({
        x: x,
        y: y + topBottomPadding / 2,
        width: rightColumnXScale(actual_path_length),
        height: heightOfBar,
        stroke: _param.actualPathLengthBarColor,
        fill: function () {
          var tt = +agent_index;
          if (_param.groupOfTrains["ontrack"]["agent_indices"].indexOf(tt) >= 0)
            return "none";
          else return _param.actualPathLengthBarColor;
        },
      })
      .append("title")
      .text("Actual Path Length: " + actual_path_length + " cells");
    rightColumnGroup
      .append("rect")
      .attrs({
        x: x,
        y: y + _param.heightOfRow / 2 + paddingBetweenBars / 2,
        width: rightColumnXScale(shortest_path_length),
        height: heightOfBar,
        fill: _param.shortestPathLengthBarColor,
        // "fill": "grey"
      })
      .append("title")
      .text("Shortest Path Length: " + shortest_path_length + " cells");
  }

  var limit = d3.max(distancesArray);
  var tempInterval = parseInt(d3.max(distancesArray) / 3);
  var remainder = tempInterval % 5;
  var tickInterval;
  if (remainder <= 2) tickInterval = tempInterval - remainder;
  else tickInterval = tempInterval + 5 - remainder;

  if (tickInterval == 0) tickInterval = 5;
  var tickY = globalYScale(_param.entitiesArray[0]) - _param.heightOfRow / 2;
  for (var z = 0; z < limit - tickInterval / 2; z = z + tickInterval) {
    var tickX = rightColumnXScale(z) + startX;

    topLegendGroup.append("line").attrs({
      x1: tickX,
      y1: tickY,
      x2: tickX,
      y2: tickY - _param.tickLength,
      "stroke-width": "1px",
      stroke: "#000000",
    });

    topLegendGroup
      .append("text")
      .attrs({
        x: tickX,
        y: tickY - _param.tickLength - 2,
        "font-size": _param.tickFontSize,
        "text-anchor": "middle",
        "dominant-baseline": "end",
      })
      .text(z);
  }
  // if(z<limit)
  {
    x = rightColumnXScale(limit) + startX;
    topLegendGroup.append("line").attrs({
      x1: x,
      y1: tickY,
      x2: x,
      y2: tickY - _param.tickLength,
      "stroke-width": "1px",
      stroke: "#000000",
    });

    topLegendGroup
      .append("text")
      .attrs({
        x: x,
        y: tickY - _param.tickLength - 2,
        "font-size": _param.tickFontSize,
        "text-anchor": "end",
        "dominant-baseline": "end",
      })
      .text(limit);
  }

  topLegendGroup.append("line").attrs({
    x1: startX,
    y1: tickY,
    x2: startX + rightColumnXScale(d3.max(distancesArray)),
    y2: tickY,
    "stroke-width": "1px",
    stroke: "#000000",
    class: "ticksupport",
  });

  var tempYPosOfLegend = _param.yPosGameTimelineLegend - 3 * _param.tickFontSize - 5;
  var ytranslateAmount = 12-tempYPosOfLegend;
//   d3.select("#mainVisualization").attr("transform", "translate(0,"+ytranslateAmount+")");
  d3.select("#mainVisualizationGroup").attr("transform", "translate(0,"+ytranslateAmount+")");
  d3.select("#topLegend").attr("transform", "translate(0,"+ytranslateAmount+")");

  topLegendGroup
    .append("text")
    .text("Path Lengths:")
    .attrs({
      x: startX,
      // "y": height-bottomPadding/2,
      y: _param.yPosGameTimelineLegend - 3 * _param.tickFontSize - 5,
      "dominant-baseline": "central",
      "text-anchor": "start",
      "font-size": _param.tickFontSize,
    });

  topLegendGroup
    .append("text")
    .text("Actual")
    .attrs({
      x: startX + 5,
      // "y": height-bottomPadding/2,
      y: _param.yPosGameTimelineLegend - 2 * _param.tickFontSize,
      "dominant-baseline": "central",
      "text-anchor": "start",
      "font-size": _param.tickFontSize,
    });
  topLegendGroup
    .append("text")
    .text(_param.reachedIcon)
    .attrs({
      x: startX + 60,
      class: "glyphicon",
      y: _param.yPosGameTimelineLegend - 2 * _param.tickFontSize,
      "dominant-baseline": "central",
      "text-anchor": "start",
      "font-size": _param.iconSize,
    });
  var tempBarHeight = _param.tickFontSize * 0.7;
  var tempBarxPos = startX + 80;
  topLegendGroup.append("rect").attrs({
    x: tempBarxPos,
    y:
      _param.yPosGameTimelineLegend -
      2 * _param.tickFontSize -
      tempBarHeight / 2,
    width: 60,
    height: tempBarHeight,
    fill: _param.actualPathLengthBarColor,
  });

  topLegendGroup
    .append("text")
    .text(_param.ontrackIcon)
    .attrs({
      x: startX + 60,
      class: "glyphicon",
      y: _param.yPosGameTimelineLegend - _param.tickFontSize,
      "dominant-baseline": "central",
      "text-anchor": "start",
      "font-size": _param.iconSize,
    });
  var tempBarHeight = _param.tickFontSize * 0.7;
  var tempBarxPos = startX + 80;
  topLegendGroup.append("rect").attrs({
    x: tempBarxPos,
    y: _param.yPosGameTimelineLegend - _param.tickFontSize - tempBarHeight / 2,
    width: 30,
    height: tempBarHeight,
    stroke: _param.actualPathLengthBarColor,
    fill: "none",
  });

  topLegendGroup
    .append("text")
    .text("Shortest")
    .attrs({
      x: startX + 5,
      // "y": height-bottomPadding/2,
      y: _param.yPosGameTimelineLegend + 2,
      "dominant-baseline": "central",
      "text-anchor": "start",
      "font-size": _param.tickFontSize,
    });
  topLegendGroup.append("rect").attrs({
    x: tempBarxPos,
    y: _param.yPosGameTimelineLegend - tempBarHeight / 2,
    width: 40,
    height: tempBarHeight,
    fill: _param.shortestPathLengthBarColor,
  });
}

function drawVisualization(boolA, boolB) {
    var data, submission; //submission is either "A" or "B"
    if(boolA == true && boolB == false)
    {
        data = window.dataA;
        submission = "A";
    }    
    else if(boolA == false && boolB == true)
    {
        data = window.dataB;
        submission = "B";
    }
    window.data = data;

  var agentTimelineData = processData(data, submission);
  _param.agentTimelineData = agentTimelineData;
  window.overallStatisticsDict = computeOverallStatistics(agentTimelineData);
  window.perFrameStatisticsArray = computePerFrameStatistics(agentTimelineData);

  d3.select("#transitionGraphSvg").remove();

  drawOverallStatistics(overallStatisticsDict, boolA, boolB);
  var episodeData = data["environmentData"];
  // var episodeLength = episodeData.max_episode_steps;
  var episodeLength = episodeData["episode"].length;
  window.selectedEpisodeLength = episodeLength;
  var numRows = episodeData["grid"].length;
  var numColumns = episodeData["grid"][0].length;
  // console.log(agentTimelineData);

  $("#slider").slider({
    value: 1,
    min: 0,
    max: episodeLength,
  });
  d3.select("#frame").text("0");

  d3.select("#mainVisualizationGroup").selectAll("*").remove();
  d3.select("#histogram").remove();
  d3.select("#scrollBar").remove();
  d3.select("#topLegend").remove();

  var leftPadding = _param.leftPadding,
    rightPadding = _param.rightPadding,
    topPadding = _param.topPadding,
    bottomPadding = _param.bottomPadding,
    width = _param.svgWidth,
    svgHeight = _param.svgHeight,
    height = _param.svgHeight,
    textEnd = _param.textEnd;

  var minHeightOfRow = _param.minHeightOfRow;



  window.visEndX = width - rightPadding - textEnd;
  window.visStartX = textEnd;
  window.maxHeightOfHistogramBars = 40;
  window.statusHeight = height + bottomPadding + maxHeightOfHistogramBars;
  var radiusOfSmallDots = 1.5;
  var radiusOfCircle = _param.radiusOfCircle;
  var glyphOPacity = _param.glyphOPacity;
  var marginTextBeforeMatrix = _param.marginTextBeforeMatrix;
//   var boundingRect = d3.select("#mainDiv").node().getBoundingClientRect();
  // console.log(boundingRect);
//   width = boundingRect.width;
//   width = 900 * window.zoomFactor;
  width = document.body.clientWidth * 0.7/window.zoomFactor;
  _param.mainVisualizationSvgWidth = width;
  d3.select("#item4").attr("style", "width:"+(width)+"px;");
  width = width - 10;
  d3.select("#rightColumn").attr("style", "width:"+((document.body.clientWidth * 0.3/window.zoomFactor) - 35)+"px;");
  _param.svgWidth = width;
  d3.select("#mainVisualization")
    .attr("width", width + "px")
    .attr("height", height + "px");
  var svg = d3.select("#mainVisualizationGroup");

  d3.select("#regionsOnTimeline").remove();
  d3
    .select("#mainVisualizationGroup")
    .append("g")
    .attr("id", "regionsOnTimeline");


  var topLegendGroup = d3
    .select("#mainVisualization")
    .append("g")
    .attr("id", "topLegend");

    

  var entitiesArray = [],
    entitiesNameArray = [];
  // for(var i=0; i<agentTimelineData.length; i++)
  // {
  //     entitiesArray.push(i);
  //     // entitiesNameArray.push("Train "+i);
  // }

  groupDict = putTrainsinGroups(agentTimelineData);
  _param.groupOfTrains = groupDict;
  // entitiesArray = sortTrains("endTimestep", "ascending", entitiesArray, agentTimelineData);
  entitiesArray = groupDict["reached"]["agent_indices"].concat(
    groupDict["ontrack"]["agent_indices"]
  );
  entitiesArray = entitiesArray.concat(
    groupDict["yettostart"]["agent_indices"]
  );

  _param.entitiesArray = entitiesArray;
  for (var i = 0; i < entitiesArray.length; i++) {
    entitiesNameArray.push("Train " + sameLengthAgentName(entitiesArray[i]));
  }

  var yscale = d3
    .scaleBand()
    .domain(entitiesArray)
    .rangeRound([topPadding, height - bottomPadding])
    .padding(5);

  var xscale = d3
    .scaleLinear()
    .domain([0, episodeLength])
    .range([textEnd, width - rightPadding]);
  window.globalXScale = xscale;

  window.statusHeight = height + bottomPadding + maxHeightOfHistogramBars;

  var heightOfRow = yscale(entitiesArray[1]) - yscale(entitiesArray[0]);
  if (entitiesArray.length == 1)
    heightOfRow = height - bottomPadding - topPadding;

  var currentHeightOfTimeline = _param.svgHeight - bottomPadding - topPadding;
  // _param.currentHeightOfTimeline = currentHeightOfTimeline;
  _param.computedMinHeightOfTimeline = currentHeightOfTimeline;
  var computedMinHeightOfTimeline = currentHeightOfTimeline;

  if (heightOfRow < minHeightOfRow) {
    var currentHeightOfTimeline = _param.svgHeight - bottomPadding - topPadding;
    var computedMinHeightOfTimeline = minHeightOfRow * entitiesArray.length;
    window.statusHeight =
      computedMinHeightOfTimeline + bottomPadding + maxHeightOfHistogramBars;
    _param.computedMinHeightOfTimeline = computedMinHeightOfTimeline;
    // d3.select("#mainVisualization").attr("height", svgHeight + (computedMinHeightOfTimeline - currentHeightOfTimeline));
    yscale = d3
      .scaleBand()
      .domain(entitiesArray)
    //   .rangeRound([topPadding, computedMinHeightOfTimeline - bottomPadding])
      .rangeRound([topPadding, computedMinHeightOfTimeline + topPadding])
      .padding(5);
    heightOfRow = minHeightOfRow;
  }
  _param.differenceOfHeight =
    computedMinHeightOfTimeline - currentHeightOfTimeline;

  _param.heightOfRow = heightOfRow;

  window.endyPosOfMatrix =
    yscale(entitiesArray[entitiesArray.length - 1]) + heightOfRow / 2;
  window.globalYScale = yscale;

  // drawing scrollbar rect
  if (computedMinHeightOfTimeline > currentHeightOfTimeline) {
    var scrollBarWidth = 10;
    var heightOfScrollBar =
      (currentHeightOfTimeline / computedMinHeightOfTimeline) *
      currentHeightOfTimeline;
    _param.scrollRatio = currentHeightOfTimeline / computedMinHeightOfTimeline;
    var scrollBar = d3
      .select("#mainVisualization")
      .append("rect")
      .attrs({
        id: "scrollBar",
        x: _param.svgWidth - scrollBarWidth,
        y: globalYScale(_param.entitiesArray[0]) - _param.heightOfRow / 2,
        width: scrollBarWidth,
        height: heightOfScrollBar,
        fill: "grey",
      });
    scrollBar.on("drag", scroll);
    var dragLink = d3
      .drag()
      // .subject(function (d) { return d; })
      .on("start", function (e) {
        d3.event.sourceEvent.stopPropagation();
      })
      .on("drag", scrollDrag);
    // .on("end", dragended);
    scrollBar.call(dragLink);
  }

  var colors = _param.colors;

  var doneAgents = groupDict["reached"]["agent_indices"];
  var ontrackAgents = groupDict["ontrack"]["agent_indices"];
  var yettostartAgents = groupDict["yettostart"]["agent_indices"];

  if (doneAgents.length > 0) {
    makeSideVerticalLine(
      globalYScale(doneAgents[0]),
      globalYScale(doneAgents[doneAgents.length - 1]),
      "reached",
      svg,
      _param.reachedIcon
    );
  }
  if (ontrackAgents.length > 0) {
    // var ttx = textEnd - _param.marginTextBeforeMatrix - 50;
    var ttx = textEnd;

    svg.append("line").attrs({
      x1: ttx,
      y1: globalYScale(ontrackAgents[0]) - heightOfRow / 2 + 2,
      x2: _param.svgWidth - _param.rightPadding,
      y2: globalYScale(ontrackAgents[0]) - heightOfRow / 2 + 2,
      "stroke-width": "1px",
      stroke: "lightgray",
    });
    makeSideVerticalLine(
      globalYScale(ontrackAgents[0]),
      globalYScale(ontrackAgents[ontrackAgents.length - 1]),
      "ontrack",
      svg,
      _param.ontrackIcon
    );
    if (yettostartAgents.length > 0) {
    svg.append("rect").attrs({
      x: ttx,
      y: globalYScale(yettostartAgents[0]) - heightOfRow / 2,
      width: _param.svgWidth - _param.rightPadding - ttx,
      height:
        globalYScale(yettostartAgents[yettostartAgents.length - 1]) -
        globalYScale(yettostartAgents[0]) +
        heightOfRow,
      fill: "red",
      opacity: 0.03,
    });
    }
  }
  //
  if (yettostartAgents.length > 0) {
    makeSideVerticalLine(
      globalYScale(yettostartAgents[0]),
      globalYScale(yettostartAgents[yettostartAgents.length - 1]),
      "yettostart",
      svg,
      _param.yettostartIcon
    );

    svg.append("line").attrs({
      x1: ttx,
      y1: globalYScale(yettostartAgents[0]) - heightOfRow / 2 + 2,
      x2: _param.svgWidth - _param.rightPadding,
      y2: globalYScale(yettostartAgents[0]) - heightOfRow / 2 + 2,
      "stroke-width": "1px",
      stroke: "lightgray",
    });
  }

    var alternateBackgroundGroup = svg.append("g");
    var yLegendGroup = svg.append("g");
  for (var i = 0; i < entitiesArray.length; i++) 
  {
    var index = entitiesArray.indexOf(i);
    if(index%2==0)
    {
        alternateBackgroundGroup.append("rect").attrs({
            x: textEnd - marginTextBeforeMatrix - 70,
            y: yscale(i) - heightOfRow/2,
            width: width - textEnd + marginTextBeforeMatrix + 70,
            height: heightOfRow,
            fill: "lightgrey",
            "opacity": 0.2,
            "class": "background",
            "pointer-events":"none"
        });
    }
    yLegendGroup
      .append("text")
      .attrs({
        x: function () {
          return textEnd - marginTextBeforeMatrix + 5;
        },
        // "x": 0,
        y: yscale(entitiesArray[i]),
        class: "TrainLabels yLegend " + entitiesArray[i],
        id: "TrainLabel" + entitiesArray[i],
      })
      .text(function () {
        var maxCharacters = 17;
        var temp = entitiesNameArray[i];
        temp = agentNameSimplify(temp);
        if (temp.length > maxCharacters)
          temp = temp.substring(0, maxCharacters - 3) + "...";
        // return temp;
        return temp;
      })
      .append("title")
      .text(function () {
        var temp = entitiesNameArray[i];
        temp = agentNameSimplify(temp);
        return temp;
      });
  }

  var lastRowBottomEdgeYLoacation =
    yscale(entitiesArray[entitiesArray.length - 1]) + heightOfRow / 2;
  yLegendGroup.append("line").attrs({
    x1: textEnd,
    y1: lastRowBottomEdgeYLoacation,
    x2: width,
    y2: lastRowBottomEdgeYLoacation,
    stroke: "black",
    // "stroke-dasharray":"5 5",
    "stroke-width": "1px",
  });

  // Highlighter rows hovering
  var highlighters = svg.append("g");
  var ttx = textEnd - _param.marginTextBeforeMatrix - 60;
  for (var i = 0; i < entitiesArray.length; i++) {
    var tty = yscale(entitiesArray[i]) - heightOfRow / 2;
    highlighters.append("rect").attrs({
      x: ttx,
      y: tty + 1,
      width: _param.svgWidth - ttx,
      height: heightOfRow - 4,
      fill: _param.highlightColor,
      opacity: 0,
      // "opacity":0.0,
      stroke: "black",
      "stroke-width": "1px",
      "stroke-opacity": 0,
      "cursor":"pointer",
      class: "highlighters",
      id: "highlighter" + entitiesArray[i],
      "trainid": entitiesArray[i],
      "pointer-events": "all"
      // "visibility":"hidden",
      // "cursor": "pointer"
    });
  }

  // Draw Timeline of each agent

  for (var i = 0; i < agentTimelineData.length; i++) {
    var agentTimeline = svg.append("g");
    var spaceBetweenTimesteps = xscale(2) - xscale(1);
    for (var j = 0; j < agentTimelineData[i]["movement"].length; j++) {
      var x_Pos;
      var y_Pos = yscale(i);

      var heightOfRectangle;
      // Movement
      if (j > 0) {
        if (agentTimelineData[i]["movement"][j] != 0) {
          x_Pos = xscale(j - 1);
          heightOfRectangle = radiusOfCircle / 2;
          agentTimeline.append("rect").attrs({
            x: x_Pos,
            y: y_Pos - heightOfRectangle / 2,
            rx: 0,
            ry: 0,
            width: spaceBetweenTimesteps,
            height: heightOfRectangle,
            fill: function(){
                if(boolA)
                    return _param.colorA;
                else if(boolB)
                    return _param.colorB;
            },
            "fill-opacity": glyphOPacity,
            class: "moved timeLineVisComponent",
            "pointer-events":"none"
          });
        }
      }

      // Junctions
      if (agentTimelineData[i]["junctions"][j] != 0) {
        var t_width = 1.5 * radiusOfCircle,
          t_height = t_width;
        x_Pos = xscale(j) - t_width / 2;
        y_Pos = yscale(i) - t_height / 2;
        agentTimeline.append("rect").attrs({
          x: x_Pos,
          y: y_Pos,
          rx: 0,
          ry: 0,
          width: t_width,
          height: t_height,
        //   fill: colors[3],
            fill:"none",
            stroke: "black",
            "stroke-width": "1px",
        "stroke-opacity": glyphOPacity,
          "fill-opacity": glyphOPacity,
          transform:
            "rotate(-45," +
            (x_Pos + t_width / 2) +
            "," +
            (y_Pos + t_height / 2) +
            ")",
          class: "junction timeLineVisComponent",
          "pointer-events":"none"
        });
      }

      // Malfunctions
      if (
        j > 1 &&
        agentTimelineData[i]["malfunctions"][j] > 0 &&
        agentTimelineData[i]["malfunctions"][j - 1] == 0
      ) {
        if (
          agentTimelineData[i]["status"][j] == window._STATUS.READY ||
          agentTimelineData[i]["status"][j] == window._STATUS.INCOMPLETE
        ) {
          var t_width = 2 * radiusOfCircle,
            t_height = t_width;
          x_Pos = xscale(j);
          y_Pos = yscale(i);
          agentTimeline
            .append("text")
            .attrs({
              x: x_Pos,
              y: y_Pos,
              "font-size": t_height + "px",
              class: "malfunction timeLineVisComponent",
              "dominant-baseline": "central",
              "text-anchor": "middle",
              "pointer-events":"none",
              "stroke": function(){
                if(boolA)
                    return _param.colorA;
                else if(boolB)
                    return _param.colorB;
            }
            })
            .text("X");

          var malfunctionDuration = agentTimelineData[i]["malfunctions"][j];
          var malfunctionBeginning = j;
          var malfunctionEnd = malfunctionBeginning + malfunctionDuration;
          if (malfunctionEnd > episodeLength) malfunctionEnd = episodeLength;

          agentTimeline.append("line").attrs({
            x1: x_Pos,
            y1: y_Pos,
            x2: globalXScale(malfunctionEnd),
            y2: y_Pos,
            stroke: function(){
                if(boolA)
                    return _param.colorA;
                else if(boolB)
                    return _param.colorB;
            },
            "stroke-opacity": glyphOPacity,
            // "stroke-dasharray":"5 5",
            "stroke-width": "1px",
            class: "malfunction timeLineVisComponent",
            "pointer-events":"none"
          });

          // agentTimeline.append("rect").attrs({
          //     x: x_Pos,
          //     y: y_Pos,
          //     rx: 0,
          //     ry: 0,
          //     width: t_width,
          //     height: t_height,
          //     "fill": colors[4],
          //     "fill-opacity":glyphOPacity,
          //     // "transform": "rotate(-45," + (x_Pos + t_width/2) +","+ (y_Pos + t_height/2)+")",
          //     "class": "malfunctions"
          // });
        }
      }
    }
    //Start Timestep
    if (agentTimelineData[i]["startTimestep"] >= 0) {
      x_Pos = xscale(agentTimelineData[i]["startTimestep"]);
      y_Pos = yscale(i);
      agentTimeline.append("circle").attrs({
        cx: x_Pos,
        cy: y_Pos,
        r: radiusOfCircle,
        fill: "none",
        stroke: "black",
        "stroke-width": "2px",
        class: "startTimestep timeLineVisComponent",
        "pointer-events":"none"
      });
    }

    //End Timestep
    if (agentTimelineData[i]["endTimestep"] >= 0) {
      x_Pos = xscale(agentTimelineData[i]["endTimestep"]);
      y_Pos = yscale(i);
      agentTimeline.append("circle").attrs({
        cx: x_Pos,
        cy: y_Pos,
        r: radiusOfCircle,
        fill: colors[4],
        "fill-opacity": glyphOPacity,
        class: "endTimestep timeLineVisComponent",
        "pointer-events":"none"
      });
    }
  }
  

  highlighters.selectAll(".highlighters").on("mouseover", function (d, i) {
    d3.select(this).attr("opacity", _param.highlightOpacity);
    var agent_index = _param.entitiesArray[i];
    highlightTrainLabel(agent_index);
    highlightTrains([agent_index]);
  });
  highlighters.selectAll(".highlighters").on("mouseout", function (d) {
    d3.selectAll(".highlighters").attr("opacity", 0);
    deHighlightTrains();
  });

  document
    .getElementById("mainVisualization")
    .addEventListener("wheel", scrollFunction);

  topLegendGroup.append("rect").attrs({
    x: 0,
    y: 0,
    width: _param.svgWidth,
    height: yscale(entitiesArray[0]) - heightOfRow / 2,
    fill: "white",
  });

  topLegendGroup.append("line").attrs({
    x1: textEnd,
    y1: yscale(entitiesArray[0]) - heightOfRow / 2,
    x2: width - rightPadding,
    y2: yscale(entitiesArray[0]) - heightOfRow / 2,
    stroke: "black",
    // "stroke-dasharray":"5 5",
    "stroke-width": "1px",
  });

  // Draw Ticks at some interval

  var limit = episodeLength;
  var tempInterval = parseInt(episodeLength / 10);
  var remainder = tempInterval % 5;
  var tickInterval;
  if (remainder <= 2) tickInterval = tempInterval - remainder;
  else tickInterval = tempInterval + 5 - remainder;

  if (tickInterval == 0) tickInterval = 5;

  var tickLength = _param.tickLength;
  var tickFontSize = _param.tickFontSize;

  for (var z = 0; z <= limit - tickInterval / 2; z = z + tickInterval) {
    var tickX = xscale(z);
    var tickY = yscale(entitiesArray[0]) - heightOfRow / 2;

    topLegendGroup.append("line").attrs({
      x1: tickX,
      y1: tickY,
      x2: tickX,
      y2: tickY - tickLength,
      stroke: "black",
      // "stroke-dasharray":"5 5",
      "stroke-width": "1px",
    });
    topLegendGroup
      .append("text")
      .attrs({
        x: tickX,
        y: tickY - tickLength - 2,
        "font-size": tickFontSize,
        "class": "tickLabel",
        "text-anchor": "middle",
        "dominant-baseline": "end",
      })
      .text(z);
  }

  var tickX = xscale(limit);
  var tickY = yscale(entitiesArray[0]) - heightOfRow / 2;

  topLegendGroup.append("line").attrs({
    x1: tickX,
    y1: tickY,
    x2: tickX,
    y2: tickY - tickLength,
    stroke: "black",
    // "stroke-dasharray":"5 5",
    "stroke-width": "1px",
  });
  topLegendGroup
    .append("text")
    .attrs({
      x: tickX - 10,
      y: tickY - tickLength,
      "font-size": tickFontSize,
      "text-anchor": "end",
      "dominant-baseline": "end",
    })
    .text(limit);

  //    X-Axis Label
  var yPosGameTimelineLegend =
    yscale(entitiesArray[0]) - heightOfRow / 2 - tickLength - 2 * tickFontSize;

  _param.yPosGameTimelineLegend = yPosGameTimelineLegend;
  topLegendGroup.append("path").attrs({
    // "marker-end": 'url(#head)',
    "stroke-width": "1px",
    fill: "black",
    stroke: "black",
    d: function () {
      var halfWidth = 125;
      var centreX = (width - textEnd) / 2 + textEnd;
      var yloc = yPosGameTimelineLegend;
      var st =
        "M " +
        (centreX - halfWidth) +
        ", " +
        yloc +
        " H " +
        (centreX + halfWidth) +
        " l 0 -3 l 3 3 l -3 3 l 0 -3";
      return st;
    },
  });

  var textElm = topLegendGroup
    .append("text")
    .text("Episode Timeline (Steps)")
    .attrs({
      x: (width - textEnd) / 2 + textEnd,
      // "y": height-bottomPadding/2,
      y: yPosGameTimelineLegend,
      "dominant-baseline": "central",
      "text-anchor": "middle",
      visibility: "hidden",
    });

  var backRect = textElm.node().getBBox();
  topLegendGroup.append("rect").attrs({
    x: backRect.x,
    y: backRect.y,
    width: backRect.width,
    height: backRect.height,
    fill: "white",
  });
  topLegendGroup
    .append("text")
    .text("Episode Timeline (Steps)")
    .attrs({
      x: (width - textEnd) / 2 + textEnd,
      // "y": height-bottomPadding/2,
      y: yPosGameTimelineLegend,
      "dominant-baseline": "central",
      "text-anchor": "middle",
    });

  drawLegendOfEncodings(topLegendGroup, boolA, boolB);
  drawRightColumn(svg, topLegendGroup);
  drawDeadlockVis(svg, boolA, boolB);

  var histogramData = computeHistogramData(
    agentTimelineData,
    window.selectedMetric,
    10, window.selectedEpisodeLength
  );

  drawEventHistogram(window.selectedMetric, "trains", 10, histogramData, 1);

  var statusBar = topLegendGroup.append("g").attr("id", "status");
  var widthOfstatusBarRectangle = 60,
    heightOfStatusBarRect = 44;
  // var yBeginLocationOfStatusBar =  yscale(entitiesArray[0]) - heightOfRow/2 - tickLength - tickFontSize - heightOfStatusBarRect;
  var yBeginLocationOfStatusBar = 2;

  var drag = d3
    .drag()
    // .subject(function (d) { return d; })
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);

  function dragstarted(d) {
    d3.event.sourceEvent.stopPropagation();
    // d3.select(this).classed("dragging", true);
    // console.log(d3.event.x);
  }

  function dragged(d) {
    // d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    var t = d3.select("#status").node().transform.baseVal[0].matrix;
    var currentX = t["e"];
    var xPosOnDrag = d3.event.sourceEvent.offsetX * (1 / window.zoomFactor);
    var visEndX = globalXScale(episodeLength);
    var visStartX = globalXScale(0);
    if (xPosOnDrag >= visStartX && xPosOnDrag <= visEndX) {
      d3.select("#status").attr("transform", "translate(" + xPosOnDrag + ",0)");
      var alpha = (visEndX - visStartX) / episodeLength;
      var sliderValue = Math.floor((xPosOnDrag - visStartX) / alpha);
      d3.select("#frame").text(sliderValue + 1);
      $("#slider").slider({
        value: sliderValue,
      });
      // var stateArray = window.pommermanData["blob"]["state"];

      var video = d3.select("#videoSVG");

      renderNextFrame(episodeData, sliderValue, numRows, numColumns);

      // console.log(d3.event.x, xPosOnDrag, visStartX);
    }
    // console.log(d3.event.x, d3.event.sourceEvent.offsetX);
  }

  function dragended(d) {
    // d3.select(this).classed("dragging", false);
    // console.log(d3.event.x);
  }

  statusBar.append("rect").attrs({
    x: 0 - widthOfstatusBarRectangle / 2,
    y: yBeginLocationOfStatusBar,
    rx: 2,
    ry: 2,
    width: widthOfstatusBarRectangle,
    height: heightOfStatusBarRect,
    stroke: _param.currentFrameColor,
    fill: "#F6F4F1",
    "fill-opacity": 0.8,
    "stroke-width": "2px",
    "stroke-opacity": 1,
    // "pointer-events":"visible",
    cursor: "pointer",
    // "style":"opacity:0;"
  });

  var statsLineTextFontSize = 11;
  var leftPadding = 3;
  var sizeOfGlyph = 5;

  var statusBarRectGroup = statusBar.append("g");
  var stats = statusBarRectGroup.append("text").attrs({
    x: 0,
    y: yBeginLocationOfStatusBar,
    id: "statusBarText",
    "dominant-baseline": "central",
    "text-anchor": "start",
    "font-size": statsLineTextFontSize,
  });

  stats.append("tspan").attrs({
    class: "currentNumTrainsReachedDestination",
    x: 4 * leftPadding + 2 * sizeOfGlyph - widthOfstatusBarRectangle / 2,
    y: statsLineTextFontSize / 2 + 2,
    "text-anchor": "start",
  });

  stats.append("tspan").attrs({
    class: "currentNumTrainsInProgress",
    x: 4 * leftPadding + 2 * sizeOfGlyph - widthOfstatusBarRectangle / 2,
    y: statsLineTextFontSize / 2 + 2 + statsLineTextFontSize + 2,
    "text-anchor": "start",
  });
  stats.append("tspan").attrs({
    class: "currentNumTrainsYetToStart",
    x: 4 * leftPadding + 2 * sizeOfGlyph - widthOfstatusBarRectangle / 2,
    y: statsLineTextFontSize / 2 + 2 + 2 * (statsLineTextFontSize + 2),
    "text-anchor": "start",
  });

  //Glyph Icons
  statusBarRectGroup
    .append("text")
    .attrs({
      // "class": "currentNumTrainsReachedDestination",
      x: 2 * leftPadding + sizeOfGlyph - widthOfstatusBarRectangle / 2,
      y: statsLineTextFontSize / 2 + 2,
      class: "glyphicon",
      "text-anchor": "middle",
      "dominant-baseline": "central",
      fill: "black",
      "font-size": _param.iconSize,
      cursor: "pointer",
    })
    .text(_param.reachedIcon)
    .append("title")
    .text("#Trains reached destination");

  statusBarRectGroup
    .append("text")
    .attrs({
      x: 2 * leftPadding + sizeOfGlyph - widthOfstatusBarRectangle / 2,
      y: statsLineTextFontSize / 2 + 2 + statsLineTextFontSize + 2,
      class: "glyphicon",
      "text-anchor": "middle",
      "dominant-baseline": "central",
      fill: "black",
      "font-size": _param.iconSize,
      cursor: "pointer",
    })
    .text(_param.ontrackIcon)
    .append("title")
    .text("#Trains on-track");

  // statusBarRectGroup.append("circle").attrs({
  //     "cx": 2*leftPadding + sizeOfGlyph -widthOfstatusBarRectangle/2,
  //     "cy": (statsLineTextFontSize/2 + 2) + statsLineTextFontSize + 2,
  //     "fill": "#42fd04",
  //     "r": sizeOfGlyph
  // });

  statusBarRectGroup
    .append("text")
    .attrs({
      x: 2 * leftPadding + sizeOfGlyph - widthOfstatusBarRectangle / 2,
      y: statsLineTextFontSize / 2 + 2 + 2 * (statsLineTextFontSize + 2),
      class: "glyphicon",
      "text-anchor": "middle",
      "dominant-baseline": "central",
      fill: "black",
      "font-size": _param.iconSize,
      cursor: "pointer",
    })
    .text(_param.yettostartIcon)
    .append("title")
    .text("#Trains did not start");

  // statusBarRectGroup.append("circle").attrs({
  //     "cx": 2*leftPadding + sizeOfGlyph -widthOfstatusBarRectangle/2,
  //     "cy": (statsLineTextFontSize/2 + 2) + 2*(statsLineTextFontSize + 2),
  //     "fill": "#ffbf00",
  //     "r": sizeOfGlyph,
  //     // "class": "yetToStartDot"
  // });
  statusBarRectGroup.attr("transform", "translate(0,4)");

  statusBar.append("rect").attrs({
    x: 0,
    y: yBeginLocationOfStatusBar + heightOfStatusBarRect,
    width: 1.5,
    height: window.statusHeight,
    stroke: "none",
    fill: _param.currentFrameColor,
    id: "statusBarVerticalLine",
    // "stroke-width":"1px"
    // "style":"opacity:0;"
  });

  statusBar.call(drag);
  
  statusBar.attr("transform", "translate(" + xscale(0) + ",0)");
  
  preparePlayback(data);

  var height = window.svgWidthHeight;
  var width = d3.select("#transitionGraphDiv").node().getBoundingClientRect()
    .width;
  var transitionGraphSvg = d3.select("#transitionGraphDiv")
    .append("svg")
    .attr("id", "transitionGraphSvg")
    // .attr("class", "solidBorder")
    .attr("width", width)
    .attr("height", window.svgWidthHeight);
    appendSampleGraphText();
    
        // transitionGraphSvg.append("g").attr("id", "transitionGraphGroup");
  // var transitionGraph = document.querySelector("#transitionGraphSvg");
  // svgPanZoom(transitionGraph, { controlIconsEnabled: true });
  drawRailRegions(window.data);
  drawHeatmap();
}

function appendSampleGraphText()
{
    var height = window.svgWidthHeight;
    var width = d3.select("#transitionGraphDiv").node().getBoundingClientRect()
      .width;
      var group = d3.select("#transitionGraphSvg").append("g").attrs({
        "id": "graphDefaultText",
        "visibility": "visible"}); 
        group.append("text").attrs({
            "x":width/2,
            "y": window.svgWidthHeight/2,
            "text-anchor":"middle",
        }).text("[Select a region from the map...]");
        group.append("text").attrs({
            "x":width/2,
            "y": window.svgWidthHeight/2 + 20,
            "text-anchor":"middle",
        }).text("[Selected Region -> Node, Movement -> Edge]");
}

function seeking1() {
  d3.select("#status").interrupt();

  var index = window.videoIndexBeingPlayed;
  var myVideo = document.getElementById("video1");
  var currentTime = myVideo.currentTime;

  var alpha =
    (tableLocations[index]["end"] - tableLocations[index]["start"]) /
    durationDict[index]["duration"];
  var posdash = alpha * currentTime + tableLocations[index]["start"];

  d3.select("#status").attr("x", posdash);
  // console.log(currentTime, currentX, posdash);
}

function seeking2() {
  var index = window.videoIndexBeingPlayed;
  var sbar = d3.select("#status");
  var currentX = sbar.attr("x");
  // if(sbar.attr("x") >= tableLocations[index]["start"] && sbar.attr("x") <= tableLocations[index]["end"])
  {
    var alpha =
      (tableLocations[index]["end"] - tableLocations[index]["start"]) /
      durationDict[index]["duration"];
    var dur = (currentX - tableLocations[index]["start"]) / alpha;

    d3.select("#status")
      .attr("x", currentX)
      .transition()
      .duration((durationDict[index]["duration"] - dur) * 1000)
      .ease(d3.easeLinear)
      .attr("x", tableLocations[index]["end"]);
  }
}

function countEventsInBin(
  startBinTimestep,
  endBinTimestep,
  binForDensity,
  eventDataArray,
  tempDictPerBin
) {
  for (var i = 0; i < eventDataArray.length; i++) {
    if (
      eventDataArray[i]["start"] >= startBinTimestep &&
      eventDataArray[i]["start"] < endBinTimestep
    )
      if (eventDataArray[i]["type"] != undefined)
        tempDictPerBin["events"][eventDataArray[i]["type"]] += 1;
  }
  return tempDictPerBin;
}
function playPause(id) {
  var myVideo = document.getElementById(id);
  if (myVideo.paused) myVideo.play();
  else myVideo.pause();
}
