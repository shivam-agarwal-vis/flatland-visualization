function enableSelectioninplaybackSVG() {
  var offset = { x: -400, y: -100 };
//   if(window.mapwasChanged || _param.selectionRectanglesArray == undefined)
    _param.selectionRectanglesArray = [];
    window.selectedRegions = [];
    window.selectedRegionIdCounter = 1;

  var selectionRect = {
    element: null,
    previousElement: null,
    currentY: 0,
    currentX: 0,
    originX: 0,
    originY: 0,
    height: 0,
    id: -1,
    setElement: function (ele) {
      this.previousElement = this.element;
      this.element = ele;
    },
    getNewAttributes: function () {
      var x = this.currentX < this.originX ? this.currentX : this.originX;
      var y = this.currentY < this.originY ? this.currentY : this.originY;
      var width = Math.abs(this.currentX - this.originX);
      var height = Math.abs(this.currentY - this.originY);
      return {
        x: x,
        y: y,
        width: width,
        height: height,
      };
    },
    getCurrentAttributes: function () {
      // use plus sign to convert string into number
      var x = +this.element.attr("x");
      var y = +this.element.attr("y");
      var width = +this.element.attr("width");
      var height = +this.element.attr("height");
      return {
        x1: x,
        y1: y,
        x2: x + width,
        y2: y + height,
      };
    },
    getCurrentAttributesAsText: function () {
      var attrs = this.getCurrentAttributes();
      return (
        "x1: " +
        attrs.x1 +
        " x2: " +
        attrs.x2 +
        " y1: " +
        attrs.y1 +
        " y2: " +
        attrs.y2
      );
    },
    init: function (newX, newY) {
        if(window.areaSelection == "rect")
        {
            var  id = window.selectedRegionIdCounter;
            window.selectedRegionIdCounter+=1;
        var rectElement = zoomPanGroup
            .append("rect")
            .attrs({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            "fill-opacity": 0.15,
            "id": "Rect" + (id),
            class: "RegionRectanglesOnMap",
            plainId: id,
            cursor: "pointer",
            "stroke-width":"1px"
            })
            .classed("selection", true)
            .on("mouseover", function (d) {
            var regionId = +d3.select(this).attr("plainId");
            if (regionId in _param.graph["nodes"]) {
                var trainsDict = _param.graph["nodes"][regionId]["trains"];
                var trainsArray = Object.keys(trainsDict);
                if(window.comparison)
                {
                    trainsDictB = _param.bothGraphs["A"]["nodes"][regionId]["trains"];
                    trainsArray = trainsArray.concat(Object.keys(trainsDictB));
                }
                highlightRegions([regionId]);
                highlightTrains(trainsArray);
            }
            })
            .on("mouseout", function () {
            deHighlightTrains();
            var regionId = d3.select(this).attr("plainId");
            dehighlightRegions();
            });
        this.setElement(rectElement);
        // var grid = window.data["environmentData"]["grid"];
        var numColumns = _param.numColumns;
        var numRows = _param.numRows;
        
        var xPos = Math.floor(newX*numRows/window.svgWidthHeight);
        var yPos = Math.floor(newY*numColumns/window.svgWidthHeight);
    var labelPosition = findAvailablePosition([yPos, xPos], new Set(), null)["pos"];
            
        this.originX = newX;
        this.originY = newY;
        this.id = id;
        this.update(newX, newY);
        var selectionText = zoomPanGroup
            .append("text")
            .attrs({
            x: Math.ceil((labelPosition[1]*window.svgWidthHeight)/numRows),
            y: Math.ceil((labelPosition[0]*window.svgWidthHeight)/numColumns),
            class: "regionIdText",
            "font-size": "10px",
            "id": "TextRect" + id,
            "dominant-baseline": "hanging",
            "text-anchor": "start"
            })
            .text("R" + id);
        _param.selectionRectanglesArray.push(rectElement);
        window.selectedRegions.push({"type":"rect","index": _param.selectionRectanglesArray.length-1, "id": id });
        }
    },
    update: function (newX, newY) {
      this.currentX = newX;
      this.currentY = newY;
      this.height = this.currentY - this.originY;
      this.element.attrs(this.getNewAttributes());
      d3.select("#TextRect" + this.id).attrs({
        x: newX,
        y: newY - 5,
      });
    //   console.log(this.height);
    },
    focus: function () {
    //   this.element.style("stroke", "#000000").style("stroke-width", "1px");
    },
    remove: function () {
      this.element.remove();
      this.element = null;
    },
    removePrevious: function () {
      if (this.previousElement) {
        this.previousElement.remove();
      }
    },
  };

  function htmlToSvgcoordinate(p) {
    var videoSVG = document.getElementById("videoSVG");

    let domPt = videoSVG.createSVGPoint();
    // let domPt =new DOMPoint();

    domPt.x = p[0] * (1 / window.zoomFactor);
    domPt.y = p[1] * (1 / window.zoomFactor);
    let svgPt = domPt.matrixTransform(videoSVG.getScreenCTM().inverse());
    var tViewport = document.querySelector("g.svg-pan-zoom_viewport");
    var tMatrix = tViewport.transform.baseVal.getItem(0).matrix;
    let svgPt2 = svgPt.matrixTransform(tMatrix.inverse());
    return [svgPt2.x, svgPt2.y];
  }


  function dragStart(e) {
    if(window.areaSelection == "rect")
    {
        var p = [d3.event.sourceEvent.clientX, d3.event.sourceEvent.clientY];
        updated_p = htmlToSvgcoordinate(p);
        selectionRect.init(updated_p[0], updated_p[1]);
    }
}

  function dragMove() {
    if(window.areaSelection == "rect")
    {
        var p = [d3.event.sourceEvent.clientX, d3.event.sourceEvent.clientY];
        updated_p = htmlToSvgcoordinate(p);
        selectionRect.update(updated_p[0], updated_p[1]);
    }
  }

  function dragEnd() {
      if(window.areaSelection == "rect")
      {
          
        selectionRect.focus();
        window.playClicked = false;
        if(!window.comparison)
            computeGraphForEachTimestep();
        $("#aggregatedRadio").prop("checked", true);
        $("#aggregatedRadio").click();
        if(!window.comparison)
            computeOccupyingCellsByRegions(d3.select("#transitionGraphSvg"), window.singleSelectedData);
        else
            computeOccupyingCellsByRegionsForBoth(d3.select("#transitionGraphSvg"), window.dataA, window.dataB);

        var thisRect = d3.select("#Rect" + _param.selectionRectanglesArray.length);
        
        var height = +thisRect.attr("height");
        var rectEle = d3.select("#TextRect"+thisRect.attr("plainId"));
        var oldYPos = +rectEle.attr("y");
        if(height > _param.numRows/window.svgWidthHeight)
            rectEle.attr("y", oldYPos-height/2);

        var regionId = +thisRect.attr("plainId");

        if(!window.comparison)
        {
            var trainsDict = _param.graph["nodes"][regionId]["trains"];
            var trainsArray = Object.keys(trainsDict);
            thisRect.append("title").text( "R"+regionId +": #trains = " + trainsArray.length);
        }
        else
        {
            var trainsDictA = _param.bothGraphs["A"]["nodes"][regionId]["trains"];
            var trainsArrayA = Object.keys(trainsDictA);
            var trainsDictB = _param.bothGraphs["B"]["nodes"][regionId]["trains"];
            var trainsArrayB = Object.keys(trainsDictB);

            thisRect.append("title").text( "R"+regionId +": #trains: A=" + trainsArrayA.length + " B="+trainsArrayB.length);
        }
      }
  }

  var dragBehavior = d3
    .drag()
    .on("drag", dragMove)
    .on("start", dragStart)
    .on("end", dragEnd);

  var svg = d3.select("#videoSVG");
  var zoomPanGroup = d3.select("#playbackSvgGroup");
  svg.call(dragBehavior);

//   d3.select("#video")
//     .append("button")
//     .style("display", "block")
//     .on("click", function () {
//       for (var i = 0; i < _param.selectionRectanglesArray.length; i++)
//         _param.selectionRectanglesArray[i].remove();
//       _param.selectionRectanglesArray = [];
//       _param.selectedRailRegionIds = {};
//       d3.selectAll(".railRegions").attr("visibility", "hidden");

//       d3.selectAll(".regionIdText").remove();

//       d3.select("#transitionGraphSvg").selectAll("*").remove();
//       //   d3.select("#dynamicGraphGroup").remove();
//       appendSampleGraphText();
//     })
//     .text("Clear Selection")
//     .attr("style", "position:absolute;");
}
