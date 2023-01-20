class Vis {

    // constructor method to initialize Timeline object
    constructor(parentElement) {
        this.parentElement = parentElement;

        // d3 methods
        this.parseDate = d3.timeParse("%m/%d/%Y");

        // call initVis method
        this.initVis()
    }

    initVis() {
        let vis = this;

        // relative margins
        vis.margin =
            {
                top: $("#" + vis.parentElement).height() / 50,
                right: $("#" + vis.parentElement).width() / 50,
                bottom: $("#" + vis.parentElement).height() / 50,
                left: $("#" + vis.parentElement).width() / 50
            };

        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // calculations
        vis.visHeight = vis.height * 0.66
        vis.semesters = {ba: 7, ma: 4, phd: 16}
        vis.totalElements = vis.semesters.ba + 1 + vis.semesters.ma + 1 + vis.semesters.phd

        vis.ba_width = vis.semesters.ba / vis.totalElements
        vis.ma_width = vis.semesters.ma / vis.totalElements
        vis.phd_width = vis.semesters.phd / vis.totalElements

        vis.ma_start = (vis.semesters.ba + 1) / vis.totalElements * vis.width
        vis.phd_start = (vis.semesters.ba + 1 + vis.semesters.ma + 1) / vis.totalElements * vis.width

        vis.circle_radius = vis.ma_width * vis.width / 3

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);


        // groups
        vis.ba_group = vis.svg
            .append('g')
            .attr('transform', `translate (${0}, ${vis.margin.top})`);

        vis.ma_group = vis.svg
            .append('g')
            .attr('transform', `translate (${vis.ma_start}, ${vis.margin.top})`);

        vis.phd_group = vis.svg
            .append('g')
            .attr('transform', `translate (${vis.phd_start}, ${vis.margin.top})`);


        // rects
        vis.ba_group.append('rect')
            .attr("width", vis.ba_width * vis.width)
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


        vis.drawDegreeCircles()
    }

    drawDegreeCircles() {

        let vis = this;

        // ba circle
        vis.ba_group.append('circle')
            .attr("cx", vis.ba_width * vis.width / 2)
            .attr("cy", vis.visHeight * 0.8)
            .attr("r", vis.circle_radius)
            .style("fill", "#ffffff")
            .style("stroke", "black")

        // ma circle
        vis.ma_group.append('circle')
            .attr("cx", vis.ma_width * vis.width / 2)
            .attr("cy", vis.visHeight * 0.8)
            .attr("r", vis.circle_radius)
            .style("fill", "#ffffff")
            .style("stroke", "black")

        // phd circle #1
        vis.phd_group.append('circle')
            .attr("cx", vis.phd_width * vis.width / 2 - vis.circle_radius * 3 / 2)
            .attr("cy", vis.visHeight * 0.8)
            .attr("r", vis.circle_radius)
            .style("fill", "#ffffff")
            .style("stroke", "black")

        // phd circle #2
        vis.phd_group.append('circle')
            .attr("cx", vis.phd_width * vis.width / 2 + vis.circle_radius * 3 / 2)
            .attr("cy", vis.visHeight * 0.8)
            .attr("r", vis.circle_radius)
            .style("fill", "#ffffff")
            .style("stroke", "black")

        // ba seal
        vis.ba_group.append('image')
            .attr('xlink:href', '/static/img/ViennaSeal.png/')
            .attr("x", vis.ba_width * vis.width / 2 - vis.circle_radius )
            .attr("y", vis.visHeight * 0.8 - vis.circle_radius)
            .attr("width", vis.circle_radius * 2)
            .style("opacity", 0.3)

        // ma seal
        vis.ma_group.append('image')
            .attr('xlink:href', '/static/img/ViennaSeal.png/')
            .attr("x", vis.ma_width * vis.width / 2 - vis.circle_radius )
            .attr("y", vis.visHeight * 0.8 - vis.circle_radius)
            .attr("width", vis.circle_radius * 2)
            .style("opacity", 0.3)

        // phd circle #1
        vis.phd_group.append('image')
            .attr('xlink:href', '/static/img/HarvardSeal.png/')
            .attr("x", vis.phd_width * vis.width / 2 - vis.circle_radius * 3 / 2 - vis.circle_radius)
            .attr("y", vis.visHeight * 0.8 - vis.circle_radius)
            .attr("width", vis.circle_radius * 2)
            .style("opacity", 0.3)



        // phd circle #2
        vis.phd_group.append('image')
            .attr('xlink:href', '/static/img/HarvardSeal.png/')
            .attr("x", vis.phd_width * vis.width / 2 + vis.circle_radius * 3 / 2 - vis.circle_radius)
            .attr("y", vis.visHeight * 0.8 - vis.circle_radius)
            .attr("width", vis.circle_radius * 2)
            .style("opacity", 0.3)



        // ba title
        vis.ba_group.append('text')
            .attr("class", "degree-title")
            .attr("x", vis.ba_width * vis.width / 2)
            .attr("y", vis.visHeight * 0.8)
            .style("text-anchor", "middle")
            .text('B.A.')

        // ma title
        vis.ma_group.append('text')
            .attr("class", "degree-title")
            .attr("x", vis.ma_width *vis.width/2)
            .attr("y", vis.visHeight * 0.8)
            .style("text-anchor", "middle")
            .text('M.A.')

        // phd titles
        vis.phd_group.append('text')
            .attr("class", "degree-title")
            .attr("x", vis.phd_width *vis.width/2 - vis.circle_radius*3/2 )
            .attr("y", vis.visHeight * 0.8)
            .style("text-anchor", "middle")
            .text('M.Sc.')

        // msc titles
        vis.phd_group.append('text')
            .attr("class", "degree-title")
            .attr("x", vis.phd_width *vis.width/2 + vis.circle_radius*3/2 )
            .attr("y", vis.visHeight * 0.8)
            .style("text-anchor", "middle")
            .text('Ph.D.')

        vis.drawAxis()


    }

    drawAxis(){
        let vis = this

        // ba scale & axis
        vis.ba_x = d3.scaleTime()
            .range([0, vis.ba_width * vis.width])
            .domain([vis.parseDate("03/01/2010"), vis.parseDate("09/01/2013")])

        vis.ba_xAxisGroup = vis.ba_group.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate (0,${vis.visHeight*0.66})`);

        vis.ba_axis = d3.axisBottom(vis.ba_x)
            .tickValues([vis.parseDate("01/01/2011"), vis.parseDate("01/01/2012"), vis.parseDate("01/01/2013")])
            .tickSizeOuter(0)

        vis.ba_xAxisGroup.call(vis.ba_axis);


        // ma scale & axis
        vis.ma_x = d3.scaleTime()
            .range([0, vis.ma_width * vis.width])
            .domain([vis.parseDate("10/01/2013"), vis.parseDate("08/01/2015")])

        vis.ma_xAxisGroup = vis.ma_group.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate (0,${vis.visHeight*0.66})`);

        vis.ma_axis = d3.axisBottom(vis.ma_x)
            .tickValues([vis.parseDate("01/01/2014"), vis.parseDate("01/01/2015")])
            .tickSizeOuter(0)

        vis.ma_xAxisGroup.call(vis.ma_axis);


        // msc & phd scale & axis
        vis.phd_x = d3.scaleTime()
            .range([0, vis.phd_width * vis.width])
            .domain([vis.parseDate("09/01/2015"), vis.parseDate("06/01/2023")])

        vis.phd_xAxisGroup = vis.phd_group.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate (0,${vis.visHeight*0.66})`);

        vis.phd_axis = d3.axisBottom(vis.phd_x)
            .tickValues([
                vis.parseDate("01/01/2016"), vis.parseDate("01/01/2017"),vis.parseDate("01/01/2018"),
                vis.parseDate("01/01/2019"),vis.parseDate("01/01/2020"), vis.parseDate("01/01/2021"),
                vis.parseDate("01/01/2022"), vis.parseDate("01/01/2023")
            ])
            .tickSizeOuter(0)

        vis.phd_xAxisGroup.call(vis.phd_axis);

        vis.drawCourses()
    }

    drawCourses(){
        let vis = this;

        vis.phd_courses = vis.phd_group.selectAll().data(courses)

        vis.phd_courses.enter().append("circle")
            .attr("cx", vis.phd_x(vis.parseDate("03/03/2022")))
            .attr("cy", d => vis.visHeight * 0.66 - 5 - 15*d.z)
            .attr("r", "7")
            .style('fill', 'rgba(185,50,50,0.76)')
            .style('stroke', 'black')
            .style('stroke-width', '0.5px')

        vis.phd_courses.enter().append("rect")
            .attr("x", vis.phd_x(vis.parseDate("03/03/2022")))
            .attr("y", d => vis.visHeight * 0.66 - 5 - 15*d.z)
            .attr("width", 20)
            .attr("height", 5)
            .style('fill', 'rgba(185,50,50,0.76)')
            .style('stroke', 'black')
            .style('stroke-width', '0.5px')
    }
}


