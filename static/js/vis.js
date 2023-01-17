class Vis {

    // constructor method to initialize Timeline object
    constructor(parentElement) {
        this.parentElement = parentElement;

        // call initVis method
        this.initVis()
    }

    initVis(){
        let vis = this;

        // relative margins
        vis.margin =
            {
            top: $("#" + vis.parentElement).height()/50,
            right: $("#" + vis.parentElement).width()/50,
            bottom: $("#" + vis.parentElement).height()/50,
            left: $("#" + vis.parentElement).width()/50
            };

        vis.width = $("#" + vis.parentElement).width()- vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // calculations
        vis.visHeight =  vis.height * 0.66
        vis.semesters = {bs: 7, ma: 4, phd: 16}
        vis.totalElements = vis.semesters.bs + 1 + vis.semesters.ma + 1 + vis.semesters.phd

        vis.bs_width = vis.semesters.bs/vis.totalElements
        vis.ma_width = vis.semesters.ma/vis.totalElements
        vis.phd_width = vis.semesters.phd/vis.totalElements

        vis.ma_start = (vis.semesters.bs + 1)/vis.totalElements * vis.width
        vis.phd_start = (vis.semesters.bs + 1 + vis.semesters.ma + 1)/ vis.totalElements * vis.width

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);


        // groups
        vis.bs_group = vis.svg
            .append('g')
            .attr('transform', `translate (${0}, ${vis.margin.top})`);

        vis.ma_group = vis.svg
            .append('g')
            .attr('transform', `translate (${vis.ma_start}, ${vis.margin.top})`);

        vis.phd_group = vis.svg
            .append('g')
            .attr('transform', `translate (${vis.phd_start}, ${vis.margin.top})`);


        // rects
        vis.bs_group.append('rect')
            .attr("width", vis.bs_width * vis.width)
            .attr("height", vis.visHeight)
            .attr("rx", "5")
            .style('fill', 'rgba(218,218,218,0.76)')
            .style('stroke', 'black')
            .style('stroke-width', '0.5px')

        vis.ma_group.append('rect')
            .attr("width", vis.ma_width * vis.width)
            .attr("height", vis.visHeight)
            .attr("rx", "5")
            .style('fill', 'rgba(218,218,218,0.76)')
            .style('stroke', 'black')
            .style('stroke-width', '0.5px')

        vis.phd_group.append('rect')
            .attr("width", vis.phd_width * vis.width)
            .attr("height", vis.visHeight)
            .attr("rx", "5")
            .style('fill', 'rgba(218,218,218,0.76)')
            .style('stroke', 'black')
            .style('stroke-width', '0.5px')



        // axis

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