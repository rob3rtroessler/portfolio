class Vis {

    // constructor method to initialize Timeline object
    constructor(parentElement) {
        this.parentElement = parentElement;

        // call initVis method
        this.initVis()
    }

    initVis(){
        let vis = this;

        vis.margin = {top: 0, right: 0, bottom: 0, left: 0};
        vis.width = $("#" + vis.parentElement).width()- vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;


        console.log($("#" + vis.parentElement).width(), document.querySelector("#" + vis.parentElement).getBoundingClientRect(), document.querySelector("#" + vis.parentElement).getClientRects())


        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // add title
        // vis.svg.append('g')
        //     .attr('class', 'title bar-title')
        //     .append('text')
        //     .text('most frequent words')
        //     .attr('transform', `translate(${vis.width / 2}, -15)`)
        //     .attr('text-anchor', 'middle');

        vis.allRect = vis.svg.append("rect")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .style('fill', 'red')

        console.log('232')

        // tooltip
        // vis.tooltip = d3.select("body").append('div')
        //     .attr('class', "tooltip")
        //     .attr('id', 'distributionTooltip')

        // axis groups
        // vis.xAxisGroup = vis.svg.append('g')
        //     .attr('class', 'axis x-axis')
        //     .attr('transform', `translate (0,${vis.height})`);
        //
        // vis.yAxisGroup = vis.svg.append('g')
        //     .attr('class', 'axis y-axis');

        // having initialized the map, move on to wrangle data
        // this.wrangleData();
    }

    wrangleData(){
        let vis = this

        vis.updateVis()
    }

    updateVis(){
        let vis = this;


        vis.rectanglesAway.enter().append('rect')
            .merge(vis.rectanglesAway)
            .attr('class', 'away-rect top-word-rect')
            .transition()
            .duration(500)
            .attr('x', (d,i) => vis.width - vis.rectWidthScaleHome(d.count)) // adjust for right side
            .attr('y', (d,i) => i*25)
            .attr('width', d => vis.rectWidthScaleHome(d.count))
            .attr('height', 20)
            .style('fill', d => {
                if (twitterSwitch) {
                    return 'rgba(53,151,143,0.3)'
                } else {
                    return 'rgba(53,151,143,1)'
                }
            })
            .style('stroke', d =>{
                if (twitterSwitch) {
                    return 'rgba(1,102,94,0.3)'
                } else {
                    return 'rgba(1,102,94,1)'
                }
            })

        vis.rectanglesAway.exit().remove()

    }


}