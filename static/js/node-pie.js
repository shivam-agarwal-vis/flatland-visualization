
var DEFAULT_OPTIONS = {
    radius: 20,
    outerStrokeWidth: 10,
    parentNodeColor: 'grey',
    showPieChartBorder: true,
    pieChartBorderColor: 'white',
    pieChartBorderWidth: '0',
    showLabelText: false,
    labelText: 'text',
    labelColor: 'blue',
    title:"",
    mouseover: ""
};

function getOptionOrDefault(key, options, defaultOptions) {
    defaultOptions = defaultOptions || DEFAULT_OPTIONS;
    if (options && key in options) {
        return options[key];
    }
    return defaultOptions[key];
}

function drawParentCircle(nodeElement, options) {
    var outerStrokeWidth = getOptionOrDefault('outerStrokeWidth', options);
    

    var radius = getOptionOrDefault('radius', options);
    var parentNodeColor = getOptionOrDefault('parentNodeColor', options);

    nodeElement.insert("circle")
        .attr("id", "parent-pie")
        .attr("r", radius)
        .attr("fill", function (d) {
            return parentNodeColor;
        })
        .attr("stroke", function (d) {
            return parentNodeColor;
        })
        .attr("stroke-width", outerStrokeWidth)
        ;
}

function drawPieChartBorder(nodeElement, options) {
    // var radius = getOptionOrDefault('radius', options);
    var radius = options.radius;
    var title = getOptionOrDefault('title', options);
    var pieChartBorderColor = getOptionOrDefault('pieChartBorderColor', options);
    var pieChartBorderWidth = getOptionOrDefault('pieChartBorderWidth', options);
    var mouseover = getOptionOrDefault('mouseover', options);

    nodeElement.insert("circle")
        .attr("r", radius)
        .attr("fill", 'transparent')
        .attr("stroke", pieChartBorderColor)
        .attr("stroke-width", pieChartBorderWidth)
        .attr("cursor","pointer")
        .append("title").text(title)
        .attr("pointer-events", "all")
        ;
}

function drawPieChart(nodeElement, percentages, options) {
    // var radius = getOptionOrDefault('radius', options);
    var radius = options.radius;
    var halfRadius = radius / 2;
    var halfCircumference = 2 * Math.PI * halfRadius;

    var percentToDraw = 0;
    for (var p in percentages) {
        percentToDraw += percentages[p].percent;

        nodeElement.insert('circle', '#parent-pie + *')
            .attr("r", halfRadius)
            .attr("fill", 'transparent')
            .style('stroke', percentages[p].color)
            .style('stroke-width', radius)
            .style('stroke-dasharray',
                    halfCircumference * percentToDraw / 100
                    + ' '
                    + halfCircumference)
                    ;
    }
}

function drawTitleText(nodeElement, options) {
    // var radius = getOptionOrDefault('radius', options);
    var radius = options.radius;
    var text = getOptionOrDefault('labelText', options);
    var color = getOptionOrDefault('labelColor', options);

    nodeElement.append("text")
        .text(String(text))
        .attr("fill", color)
        .attr("dy", radius * 2)
        .attr("font-size", function(){
            if(window.figureForTeaser)
                return "20px";
            else
                return "12px";
        });
}

var NodePieBuilder = {
    drawNodePie: function (nodeElement, percentages, options) {
        drawParentCircle(nodeElement, options);

        if (!percentages) return;
        drawPieChart(nodeElement, percentages, options);

        var showPieChartBorder = getOptionOrDefault('showPieChartBorder', options);
        if (showPieChartBorder) {
            drawPieChartBorder(nodeElement, options);
        }

        var showLabelText = getOptionOrDefault('showLabelText', options);
        if (showLabelText) {
            drawTitleText(nodeElement, options);
        }
    }
};