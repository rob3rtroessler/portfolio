class Vis {

    // constructor method to initialize Timeline object
    constructor(parentElement) {
        this.parentElement = parentElement;

        this.colors = ["#006D77", "#83C5BE", "#EDF6F9", "#FFDDD2", "#E29578"]
        // d3 methods
        this.parseDate = d3.timeParse("%m/%d/%Y");

        this.fixed = {
            phdCircle: false,
            mscCircle: false
        }
        this.expanded = {
            "js": false,
            "ml": false,
            "python": false,
            "tf": false,
            "pytorch": false,
            "html": false,
            "css": false,
            "nlp": false,
            "history": false,
            "lit": false,
            "histsci": false,
            "discourse": false,
            "dighum": false,
            "pandas": false,
            "datavis": false,
            "statistics": false,
            "react": false
        }

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
                bottom: $("#" + vis.parentElement).height() / 10,
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
            .attr('id', 'ba-group')
            .attr('transform', `translate (${0}, ${vis.margin.top})`);

        vis.ma_group = vis.svg
            .append('g')
            .attr('id', 'ma-group')
            .attr('transform', `translate (${vis.ma_start}, ${vis.margin.top})`);

        vis.phd_group = vis.svg
            .append('g')
            .attr('id', 'phd-group')
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

        // BA
        vis.ba_circle_group = vis.ba_group
            .append('g')
            .attr('id', 'ba-circle')

        // ba circle
        vis.ba_circle_group
            .append('circle')
            .attr("cx", vis.ba_width * vis.width / 2)
            .attr("cy", vis.visHeight * 0.8)
            .attr("r", vis.circle_radius)
            .style("fill", "#ffffff")
            .style("stroke", "black")

        // ba seal
        vis.ba_circle_group.append('image')
            .attr('xlink:href', '/static/img/ViennaSeal.png/')
            .attr("x", vis.ba_width * vis.width / 2 - vis.circle_radius )
            .attr("y", vis.visHeight * 0.8 - vis.circle_radius)
            .attr("width", vis.circle_radius * 2)
            .style("opacity", 0.3)

        // ba title
        vis.ba_circle_group.append('text')
            .attr("class", "degree-title")
            .attr("x", vis.ba_width * vis.width / 2)
            .attr("y", vis.visHeight * 0.8)
            .style("text-anchor", "middle")
            .text('B.A.')

        // MA
        vis.ma_circle_group = vis.ma_group
            .append('g')
            .attr('id', 'ma-circle')

        // ma circle
        vis.ma_circle_group.append('circle')
            .attr("cx", vis.ma_width * vis.width / 2)
            .attr("cy", vis.visHeight * 0.8)
            .attr("r", vis.circle_radius)
            .style("fill", "#ffffff")
            .style("stroke", "black")

        // ma seal
        vis.ma_circle_group.append('image')
            .attr('xlink:href', '/static/img/ViennaSeal.png/')
            .attr("x", vis.ma_width * vis.width / 2 - vis.circle_radius )
            .attr("y", vis.visHeight * 0.8 - vis.circle_radius)
            .attr("width", vis.circle_radius * 2)
            .style("opacity", 0.3)

        // ma title
        vis.ma_circle_group.append('text')
            .attr("class", "degree-title")
            .attr("x", vis.ma_width *vis.width/2)
            .attr("y", vis.visHeight * 0.8)
            .style("text-anchor", "middle")
            .text('M.A.')



        vis.phd_circle_group = vis.phd_group
            .append('g')
            .attr('id', 'phd-circle')

        // msc circle
        vis.phd_circle_group.append('circle')
            .attr('id', 'msccircle')
            .attr('class', 'clickable')
            .attr("cx", vis.phd_width * vis.width / 2 - vis.circle_radius * 3 / 2)
            .attr("cy", vis.visHeight * 0.88)
            .attr("r", vis.circle_radius)
            .style("fill", "#ffffff")
            .style("stroke", "black")
            .style("stroke-width", 1.5)

        // phd circle
        vis.phd_circle_group.append('circle')
            .attr('id', 'phdcircle')
            .attr('class', 'clickable')
            .attr("cx", vis.phd_width * vis.width / 2 + vis.circle_radius * 3 / 2)
            .attr("cy", vis.visHeight * 0.88)
            .attr("r", vis.circle_radius)
            .style("fill", "#ffffff")
            .style("stroke", "black")
            .style("stroke-width", 1.5)


        // msc seal
        vis.phd_circle_group.append('image')
            .attr('class', 'clickable')
            .attr('xlink:href', '/static/img/HarvardSeal.png/')
            .attr("x", vis.phd_width * vis.width / 2 - vis.circle_radius * 3 / 2 - vis.circle_radius)
            .attr("y", vis.visHeight * 0.88 - vis.circle_radius)
            .attr("width", vis.circle_radius * 2)
            .style("opacity", 0.3)
            .on('click', function (event, d){

                if(!vis.fixed.phdCircle){
                    vis.fixed.phdCircle = true
                    d3.select(`#msccircle`).style("stroke", vis.colors[0])
                    d3.selectAll(`.classline.msc`).style("stroke", vis.colors[0])
                    d3.selectAll(`.course.msc`).style("fill", vis.colors[0])

                } else {
                    vis.fixed.phdCircle = false
                }

            })
            .on('mouseover', function (event, d){
                d3.select(`#msccircle`).style("stroke", vis.colors[0])
                d3.selectAll(`.classline.msc`).style("stroke", vis.colors[0])
                d3.selectAll(`.course.msc`).style("fill", vis.colors[0])

            })
            .on('mouseout', function (event, d){
                if (!vis.fixed.phdCircle){
                    d3.select(`#msccircle`)
                        .style("stroke", "black")
                    d3.selectAll(`.classline.msc`)
                        .style('stroke', 'rgba(171,171,171,0.4)')
                    d3.selectAll(`.course.msc`).style("fill", 'transparent')

                }
            })

        // phd seal
        vis.phd_circle_group.append('image')
            .attr('class', 'clickable')
            .attr('xlink:href', '/static/img/HarvardSeal.png/')
            .attr("x", vis.phd_width * vis.width / 2 + vis.circle_radius * 3 / 2 - vis.circle_radius)
            .attr("y", vis.visHeight * 0.88 - vis.circle_radius)
            .attr("width", vis.circle_radius * 2)
            .style("opacity", 0.3)
            .on('click', function (event, d){

                if(!vis.fixed.phdCircle){
                    vis.fixed.phdCircle = true
                    d3.select(`#phdcircle`).style("stroke", vis.colors[4])
                    d3.selectAll(`.classline.phd`).style("stroke", vis.colors[4])
                    d3.selectAll(`.course.phd`).style("fill", vis.colors[4])

                } else {
                    vis.fixed.phdCircle = false
                }

            })
            .on('mouseover', function (event, d){
                d3.select(`#phdcircle`).style("stroke", vis.colors[4])
                d3.selectAll(`.classline.phd`).style("stroke", vis.colors[4])
                d3.selectAll(`.course.phd`).style("fill", vis.colors[4])
            })
            .on('mouseout', function (event, d){
                if (!vis.fixed.phdCircle){
                    d3.select(`#phdcircle`)
                        .style("stroke", "black")
                    d3.selectAll(`.classline.phd`)
                        .style('stroke', 'rgba(171,171,171,0.4)')
                    d3.selectAll(`.course.phd`).style("fill", `transparent`)

                }
            })

        // msc title
        vis.phd_circle_group.append('text')
            .attr("class", "degree-title")
            .attr("x", vis.phd_width *vis.width/2 - vis.circle_radius*3/2 )
            .attr("y", vis.visHeight * 0.88)
            .style("text-anchor", "middle")
            .text('M.Sc.')

        // phd title
        vis.phd_circle_group.append('text')
            .attr("class", "degree-title")
            .attr("x", vis.phd_width *vis.width/2 + vis.circle_radius*3/2 )
            .attr("y", vis.visHeight * 0.88)
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

        vis.drawPhdLines()

    }

    drawPhdLines(){

        let vis = this;

        const link = d3.link(d3.curveBumpY);

        vis.phd_lines_group = vis.phd_group.append('g')
            .attr('id', 'phd-lines')

        vis.phd_lines = vis.phd_lines_group.selectAll().data(courses)

        vis.phd_lines.enter().append("path")
            .attr('class', d=> `classline ${d.degree}`)
            .attr('d', d => {
                let x_start = vis.phd_x(vis.parseDate(d.year[0])) +
                    (vis.phd_x( vis.parseDate(d.year[1]) ) - vis.phd_x(vis.parseDate(d.year[0])))/  2;
                let y_start = vis.visHeight * 0.66 - 11 - 15*d.z;
                let x_end = 0;
                if (d.degree === 'msc'){
                    x_end =  vis.phd_width * vis.width / 2 - vis.circle_radius * 3 / 2

                } else {
                    x_end =  vis.phd_width * vis.width / 2 + vis.circle_radius * 3 / 2

                }

                let y_end = vis.visHeight * 0.88 - vis.circle_radius;

                return link({
                    source: [x_start, y_start],
                    target: [x_end, y_end]
                })
            })
            .style('fill', 'transparent')
            .style('stroke', 'rgba(171,171,171,0.4)')
            // .style('stroke', d =>{
            //     let color = 'rgba(226,149,120,0.5)'
            //     if(d.degree === 'msc'){
            //         color = 'rgba(0,109,119,0.5)'
            //     }
            //     return color
            // })


        vis.drawCourses()

    }

    drawCourses(){
        let vis = this;

        vis.phd_courses_group = vis.phd_group.append('g')
            .attr('id', 'phd-courses')

        vis.phd_courses = vis.phd_courses_group.selectAll().data(courses)

        vis.phd_courses.enter().append("rect")
            .attr('class', d => {
                let class_string = ``
                d.skills.forEach(d =>{
                    class_string += `${d} `
                })
                return `course el ${d.degree} ${class_string}`
            })
            .attr("x", d => vis.phd_x(vis.parseDate(d.year[0])))
            .attr("y", d => vis.visHeight * 0.66 - 11 - 15*d.z)
            .attr("width", d => {
                let diff = vis.phd_x(vis.parseDate(d.year[1])) - vis.phd_x(vis.parseDate(d.year[0]))
                console.log(d, diff)
                return diff
            })
            .attr("height", 10)
            .style('fill', 'transparent')
            // .style('fill', d =>{
            //     let color = '#E29578'
            //     if(d.degree === 'msc'){
            //         color = '#006D77'
            //     }
            //     return color
            // })
            .style('stroke', 'black')
            .style('stroke-width', '0.5px')

        vis.drawAwards()
    }

    drawAwards(){
        let vis = this;

        // add line before awards
        vis.phd_group.append("line")
            .attr("x1", 0)
            .attr("y1", vis.visHeight*0.55)
            .attr("x2", vis.phd_width*vis.width)
            .attr("y2", vis.visHeight*0.55)
            .style('stroke', "#707070")
            .style('stroke-width', '0.5')
            .style('stroke-dasharray', 5)

        vis.phd_awards_group = vis.phd_group.append('g').attr('id', 'phd-awards')

        vis.phd_awards = vis.phd_awards_group.selectAll().data(phd_awards);

        vis.phd_awards.enter().append('circle')
            .attr('class', d=> `el`)
            .attr("cx", d => vis.phd_x(vis.parseDate(d.year)))
            .attr("cy", d => vis.visHeight * 0.51)
            .attr('r', 5)
                .style('fill', d => "#83C5BE")
            .style('stroke', 'black')
            .style('stroke-width', '0.5px')
        vis.drawTeaching()
    }

    drawTeaching(){
        let vis = this;

        vis.phd_teaching_group = vis.phd_group.append('g').attr('id', 'phd-teaching')
        // add line before teaching
        vis.phd_group.append("line")
            .attr("x1", 0)
            .attr("y1", vis.visHeight*0.47)
            .attr("x2", vis.phd_width*vis.width)
            .attr("y2", vis.visHeight*0.47)
            .style('stroke', "#707070")
            .style('stroke-width', '0.5')
            .style('stroke-dasharray', 5)

        vis.phd_teaching = vis.phd_teaching_group.selectAll().data(teaching)

        vis.phd_teaching.enter().append("rect")
            .attr('class', d => {
                let class_string = ``
                d.taught_skills.forEach(d =>{
                    class_string += `${d} `
                })
                return `teaching el ${class_string}`
            })
            .attr("x", d => vis.phd_x(vis.parseDate(d.year[0])))
            .attr("y", d => vis.visHeight * 0.46 - 11 - 15*d.z)
            .attr("width", d => {
                let diff = vis.phd_x(vis.parseDate(d.year[1])) - vis.phd_x(vis.parseDate(d.year[0]))
                console.log(d, diff)
                return diff
            })
            .attr("height", 10)
            .style('fill', d =>{
                let color = vis.colors[3]
                if(d.paradigm === 'cs'){
                    color = vis.colors[1]
                }
                return color
            })

            .style('stroke', 'black')
            .style('stroke-width', '0.5px')

        vis.drawPapers()
    }

    drawPapers(){

        let vis = this;

        // add line before teaching
        vis.phd_group.append("line")
            .attr("x1", 0)
            .attr("y1", vis.visHeight*0.38)
            .attr("x2", vis.phd_width*vis.width)
            .attr("y2", vis.visHeight*0.38)
            .style('stroke', "#707070")
            .style('stroke-width', '0.5')
            .style('stroke-dasharray', 5)


        vis.diss_y = d3.scaleLinear()
            .domain([0,200])
            .range([20,0])

        vis.disspath = d3.line()
            .curve(d3.curveCatmullRom.alpha(0.5))
            .x((d) => vis.phd_x(vis.parseDate(d.date)))
            .y((d) => vis.diss_y(d.pages))


        vis.phd_diss_progress_group = vis.phd_group.append('g')
            .attr('transform', `translate(${0}, ${vis.visHeight*0.29})`)
            .attr('id', 'diss-progress')
            .style('fill', 'transparent')
            .style('stroke', 'grey')
            .style('stroke-width', 2)



        vis.phd_diss_progress = vis.phd_diss_progress_group.append('path')
            .datum(dissertationProgress)
            .attr('id', 'disspath')
            .attr('d', vis.disspath)


        vis.phd_projects_and_papers = vis.phd_group.selectAll("pp-rect").data(projectsAndPapers)

        vis.phd_projects_and_papers.enter().append("rect")
            .attr('class', d => 'pp-rect')
            .attr("x", d => vis.phd_x(vis.parseDate(d.date)))
            .attr("y", d => vis.visHeight * 0.38 - 20)
            .attr("width", 21)
            .attr("height", 10)
            //.style('fill', d => "#83C5BE")
            .style('fill', d => "transparent")
            .style('stroke', 'grey')
            .style('stroke-width', '1px')

        // vis.phd_projects_and_papers.enter().append("rect")
        //     .attr('class', d => 'pp-rect')
        //     .attr("x", d => vis.phd_x(vis.parseDate(d.date)) -  (vis.phd_x(vis.parseDate(d.timeframe[1])) - vis.phd_x(vis.parseDate(d.timeframe[0]))) )
        //     .attr("y", d => vis.visHeight * 0.38 - 15)
        //     .attr("width", d=> (vis.phd_x(vis.parseDate(d.timeframe[1])) - vis.phd_x(vis.parseDate(d.timeframe[0]))))
        //     .attr("height", 1)
        //     //.style('fill', d => "#83C5BE")
        //     .style('fill', d => "transparent")
        //     .style('stroke', 'black')
        //     .style('stroke-width', '0.5px')

        vis.phd_projects_and_papers.enter().append("rect")
            .attr('class', d => 'pp-rect')
            .attr("x", d => vis.phd_x(vis.parseDate(d.date)) + 10)
            .attr("y", d => vis.visHeight * 0.38 - 60)
            .attr("width", 1)
            .attr("height", 40)
            //.style('fill', d => "#83C5BE")
            .style('fill', d => "grey")
            .style('stroke', 'grey')
            .style('stroke-width', '0.5px')

        vis.drawSkills()

    }

    drawSkills(){
        let vis = this;

        vis.skillRects = vis.svg.selectAll().data(skills)


        vis.skillRects.enter().append('rect')
            .attr('id', d => `${d.skill_abbreviation}-card`)
            .attr('width', d => d.rel_end_x * vis.width - d.rel_start_x * vis.width)
            .attr('height', 40)
            .attr('x', d => d.rel_start_x*vis.width)
            .attr('y', d => vis.visHeight + vis.margin.top + vis.margin.bottom + d.row*50)
            .attr('rx', 5)
            .style('fill', 'rgba(218,218,218,0.38)')
            .style('stroke', 'black')
            .style('stroke-width', '0.5px')

            .on('click', function (event, d){
                vis.clickOnJS(d.skill_abbreviation)
            })
            .on('mouseover', function (event, d){
                vis.clickOnJS(d.skill_abbreviation)
            })
            .on('mouseout', function (event, d){
                vis.clickOnJS(d.skill_abbreviation)
            })

        // TEST RECT
        // vis.svg.append('rect')
        //     .attr('width', vis.width)
        //     .attr('height', 40)
        //     .attr('x', 0)
        //     .attr('y', vis.visHeight + vis.margin.top)
        //     .attr('rx', 5)
        //     .style('fill', 'red')
        //     .style('stroke', 'black')


        vis.skillRects.enter().append('text')
            .attr('id', d => `${d.skill_abbreviation}-card-text`)
            .attr('width', d => d.rel_end_x * vis.width - d.rel_start_x * vis.width)
            .attr('height', 40)
            .attr('x', d => d.rel_start_x * vis.width + (d.rel_end_x * vis.width - d.rel_start_x * vis.width)/2)
            .attr('y', d => vis.visHeight + vis.margin.top + vis.margin.bottom + d.row*50 + 24)
            .text(d=> d.skill_long)
            .style('text-anchor', 'middle')
    }



    clickOnJS(selection){
        let vis = this;


        // uncolor all other elements
        d3.selectAll(`.el`).style('fill', 'transparent')


        if (vis.expanded[selection] === false) {

            console.log('in', vis.expanded[selection])

            // color card
            d3.select(`#${selection}-card`).style('fill', "#006D77")


            // if false, then set to true and draw all connections
            vis.expanded[selection] = true

            // create tmp group that can be removed once clicked again
            vis.tmp_group = vis.svg.append('g')
                .attr('id', `${selection}-lines-group`)


            // loop over all selected elements
            d3.selectAll(`.course.${selection}, .teaching.${selection}`).each(function () {

                // color all elements
                d3.selectAll(`.course.${selection}, .teaching.${selection}`).style('fill', '#006D77')

                // grab positions of start and ending elements
                let x_end = +d3.select(this).attr("x") + +d3.select(this).attr("width") / 2
                let y_end = +d3.select(this).attr("y") + vis.margin.top + 10
                let x_start = +d3.select(`#${selection}-card`).attr("x") + +d3.select(`#${selection}-card`).attr("width") / 2
                let y_start = +d3.select(`#${selection}-card`).attr("y")

                // grab info
                let degree = d3.select(this).data()[0].degree
                let name = d3.select(this).data()[0].name
                let paradigm = d3.select(this).data()[0].paradigm


                // make x position adjustments based on the degree group element was in
                if (degree === 'phd' || degree === 'msc' || paradigm === 'cs' || paradigm === 'humanities') {
                    x_end += vis.phd_start
                }

                // init path generator
                const link = d3.link(d3.curveBumpY);

                // draw path
                vis.tmp_group.append("path")
                    .attr('class', `el ${name} ${selection}`)
                    .attr('d', d => {
                        return link({
                            source: [x_start, y_start],
                            target: [x_end, y_end]
                        })
                    })
                    .style('fill', 'transparent')
                    .style('stroke', '#006D77')
            })
        }

        // else, if clicked a second time, remove
        else {

            // set to false and remove all contents
            vis.expanded[selection] = false
            d3.select(`#${selection}-lines-group`).remove()

            // reset colors
            vis.resetColors()
            d3.select(`#${selection}-card`).style('fill', "transparent")

        }
    }

    resetColors(){

        console.log('reset')

        // courses
        d3.selectAll('.course').each(function (){
            d3.select(this)
                .style('fill', d =>{
                    let color = vis.colors[4]
                    if(d.degree === 'msc'){
                        color = vis.colors[0]
                    }
                    return color
                })
        })

        // teaching
        d3.selectAll('.teaching').each(function (){
            d3.select(this)
                .style('fill', d =>{
                    let color = vis.colors[3]
                    if(d.paradigm === 'cs'){
                        color = vis.colors[1]
                    }
                    return color
                })
        })

    }

}


