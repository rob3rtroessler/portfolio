class Vis {

    // constructor method to initialize Timeline object
    constructor(parentElement) {
        this.parentElement = parentElement;

        this.colors = ["#006D77", "#83C5BE", "#EDF6F9", "#FFDDD2", "#E29578"]
        // d3 methods
        this.parseDate = d3.timeParse("%m/%d/%Y");

        this.fixed = {
            phdCircle: false,
            mscCircle: false,
        }
        this.expanded = {
            "arthist": false,
            "design": false,
            "ethics": false,
            "js": false,
            "linguistics": false,
            "ml": false,
            "python": false,
            "tf": false,
            "pytorch": false,
            "html": false,
            "css": false,
            "medieval": false,
            "modernism": false,
            "nlp": false,
            "nodejs": false,
            "history": false,
            "lithist": false,
            "histsci": false,
            "discourse": false,
            "dighum": false,
            "pandas": false,
            "datavis": false,
            "stats": false,
            "react": false,
            "sklearn": false,
            "philosophy": false,
            "theory": false
        }

        this.switches = {
            teaching_sorted: 0,
            awards_sorted: 0
        }

        // call initVis method
        this.initVis()
    }

    initVis() {
        let vis = this;

        // relative margins
        vis.margin =
            {
                top: $("#" + vis.parentElement).height() / 55,
                right: $("#" + vis.parentElement).width() / 50,
                bottom: $("#" + vis.parentElement).height() / 50,
                left: $("#" + vis.parentElement).width() / 50
            };

        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // calculations
        vis.visHeight = vis.height * 0.75
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
            .attr('transform', `translate (${0}, ${vis.margin.top})`)
            .attr('opacity', 0);

        vis.ma_group = vis.svg
            .append('g')
            .attr('id', 'ma-group')
            .attr('transform', `translate (${vis.ma_start}, ${vis.margin.top})`)
            .attr('opacity', 0);


        vis.phd_group = vis.svg
            .append('g')
            .attr('id', 'phd-group')
            .attr('transform', `translate (${vis.phd_start}, ${vis.margin.top})`)
            .attr('opacity', 0);

        // create tmp group that can contains various temporary subgroups such as connections
        vis.tmp_group = vis.svg.append('g')

        // tooltip
        vis.tooltip = d3.select("#wrapper").append('div')
            .attr('class', "tooltip")
            .attr('id', 'barTooltip')
            .style("opacity", 0)
            .style("left", 0 + "px")
            .style("top", 0 + "px")

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

        vis.drawSeparators()
    }

    drawSeparators(){
        let vis = this;

        // add line above teaching
        vis.phd_group.append("line")
            .attr("x1", 0)
            .attr("y1", vis.visHeight*0.35)
            .attr("x2", vis.phd_width*vis.width)
            .attr("y2", vis.visHeight*0.35)
            .style('stroke', "#707070")
            .style('stroke-width', '0.5')
            .style('stroke-dasharray', 5)

        // add line under teaching row
        vis.phd_group.append("line")
            .attr("x1", 0)
            .attr("y1", vis.visHeight*0.45)
            .attr("x2", vis.phd_width*vis.width)
            .attr("y2", vis.visHeight*0.45)
            .style('stroke', "#707070")
            .style('stroke-width', '0.5')
            .style('stroke-dasharray', 5)

        // add line under awards
        vis.phd_group.append("line")
            .attr("x1", 0)
            .attr("y1", vis.visHeight*0.55)
            .attr("x2", vis.phd_width*vis.width)
            .attr("y2", vis.visHeight*0.55)
            .style('stroke', "#707070")
            .style('stroke-width', '0.5')
            .style('stroke-dasharray', 5)

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

                if(!vis.fixed.mscCircle){
                    vis.fixed.mscCircle = true
                    d3.select(`#msccircle`).style("stroke", vis.colors[0])
                    d3.selectAll(`.classline.msc`).style("stroke", vis.colors[0])
                    d3.selectAll(`.course.msc`).style("fill", vis.colors[0])

                } else {
                    vis.fixed.mscCircle = false
                }

            })
            .on('mouseover', function (event, d){
                d3.select(`#msccircle`).style("stroke", vis.colors[0])
                d3.selectAll(`.classline.msc`).style("stroke", vis.colors[0])
                d3.selectAll(`.course.msc`).style("fill", vis.colors[0])

            })
            .on('mouseout', function (event, d){
                if (!vis.fixed.mscCircle){
                    d3.select(`#msccircle`)
                        .style("stroke", "black")
                    d3.selectAll(`.classline.msc`)
                        .style('stroke', 'rgba(171,171,171,0.4)')
                    d3.selectAll(`.course.msc`).style("fill", `rgb(200, 200, 200)`)

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
                    d3.selectAll(`.course.phd`).style("fill", `rgb(200, 200, 200)`)

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


        vis.drawCourseWork()

    }

    drawCourseWork(){
        let vis = this;

        vis.phdCourseWorkGroup = vis.phd_group.append('g')
            .attr('id', 'phd-courses')


        // define descriptive text shown when hovering
        vis.courseWorkText = vis.phdCourseWorkGroup.append('text')
            .attr('x', vis.phd_width*vis.width/2)
            .attr("y", vis.visHeight*0.66 - vis.visHeight*0.085)
            .style('font-style','italic')
            .style('text-anchor','middle')
            .style('opacity', 0)
            .text('course work')

        // draw overlay rect showing descriptive text
        vis.phdCourseWorkGroup.append('rect')
            .attr("id", "teachingrect")
            .attr("x", 0)
            .attr("y", vis.visHeight*0.66 - vis.visHeight*0.11)
            .attr("width", vis.phd_width*vis.width)
            .attr("height", vis.visHeight*0.11)
            .style("fill", 'transparent')
            .on('mouseover', function (event,d){
                d3.select(this)
                    .style("fill", "rgba(255,255,255,0.36)")
                vis.courseWorkText
                    .style('opacity', 1)
            })
            .on('mouseout', function (event,d){
                d3.select(this)
                    .style("fill", "transparent")
                vis.courseWorkText
                    .style('opacity', 0)
            })

        // draw all course work rectangles
        vis.phd_courses = vis.phdCourseWorkGroup.selectAll().data(courses)

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
                return diff
            })
            .attr("height", 10)
            .style('fill', `rgb(200, 200, 200)`)
            .style('stroke', 'black')
            .style('stroke-width', '0.5px')
            .on('mouseover', function (event, d) {

                d3.select(this)
                    .style('opacity', 0.8)
                    .style('stroke-width', '1.5px')

                console.log(d)

                // CONNECTIONS

                // create tmp group that can be deleted on mouseout
                let tmp_group = vis.tmp_group.append('g')
                    .attr('id', `course-skills-lines-group`)


                // grab taught skills
                d.skills.forEach(d => {

                    // grab skill card location
                    console.log(d)
                    // grab positions of start and ending elements of each individual skill card

                    // start is the current rect
                    let x_start = +d3.select(this).attr("x") + +d3.select(this).attr("width") / 2
                    let y_start = +d3.select(this).attr("y") + vis.margin.top + 10
                    let x_end = +d3.select(`#${d}-card`).attr("x") + +d3.select(`#${d}-card`).attr("width") / 2
                    let y_end = +d3.select(`#${d}-card`).attr("y")

                    // grab info
                    let degree = d3.select(this).data()[0].degree
                    let name = d3.select(this).data()[0].name
                    let paradigm = d3.select(this).data()[0].paradigm


                    // make x position adjustments based on the degree group element was in
                    if (degree === 'phd' || degree === 'msc' || paradigm === 'cs' || paradigm === 'humanities') {
                        x_start += vis.phd_start
                    }

                    // init path generator
                    const link = d3.link(d3.curveBumpY);

                    // draw path
                    tmp_group.append("path")
                        .attr('class', `el`)
                        .attr('d', d => {
                            return link({
                                source: [x_start, y_start],
                                target: [x_end, y_end]
                            })
                        })
                        .style('fill', 'transparent')
                        .style('stroke', colorCourseLookupTable[d])

                    // color skill card
                    d3.select(`#${d}-card`)
                        .style('fill', colorCourseLookupTable[d])

                })

                // TOOLTIP

                // generate html string with all courses
                let courses_string = ''
                d.skills.forEach( (d,i) => {

                    courses_string += `<span style="border: thin solid black; border-radius: 2px; background: ${colorCourseLookupTable[d]}; padding: 2px; margin:2px">${shortTolongSkill[d]}</span>`
                    if(i==1 || i==3 || i == 5){
                        courses_string += `<br>`
                    }
                })

                vis.tooltip
                    .style("opacity", 0.9)
                    .style("left", event.pageX - 20 - $(".tooltip").width() + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                        <div class="row" style="border: thin solid grey; border-radius: 5px; background: #ececec; padding: 8px; overflow-wrap: break-word; word-break: break-word; ">
                            <h3>${d.name}<h3>
                            <h4>grade:</h4>
                            <h4><span style="border: thin solid black; border-radius: 2px; background: lightgrey; padding: 2px; margin:2px">${d.grade}</span></h4>
                            <h4>skills learned: </h4>
                            <h4 style="overflow-wrap: break-word; word-break: break-word; line-height: 3vh;">${courses_string} </h4>
                            <h4>weekly hours invested: </h4>
                            <div id="tooltipHours" style="width=100%; height: 7vh;"></div>
                        </div>`);

                let w_tooltip = $("#tooltipHours").width() - 16
                let h_tooltip = $("#tooltipHours").height()

                let margins = {left: 10, right: 10, top: 15, bottom:20}
                let height = h_tooltip - margins.top - margins.bottom
                let width = w_tooltip - margins.left - margins.right

                let q_group = d3.select("#tooltipQScore").append('svg')
                    .attr('width', width +  margins.left + margins.right)
                    .attr('height', height +  margins.top + margins.bottom)
                    .append('g')
                    .attr('transform', `translate(${margins.left},${margins.top})`)

                let qScale = d3.scaleLinear()
                    .range([0,width])
                    .domain([0,5])

                let qAxisGroup = q_group.append('g')
                    .attr('class', 'axis x-axis')
                    .attr('transform', `translate (0,${height})`);

                let qAxis = d3.axisBottom(qScale)
                    .tickValues([0,1,2,3,4,5])

                qAxisGroup.call(qAxis)

                q_group.append('rect')
                    .attr("x", function(){
                        if(d.q_avg === 'N/A'){
                            return qScale(2.5)-2
                        } else {
                            return qScale(d.hours)-2
                        }
                    })
                    .attr("y", 0)
                    .attr("width", 5)
                    .attr("height", height)
                    .style("fill", vis.colors[1])
                    .style('stroke', '#000000')

                q_group.append('rect')
                    .attr("x", function(){
                        if(d.q_avg === 'N/A'){
                            return qScale(2.5)-2
                        } else {
                            return qScale(d.hours_avg)-2
                        }
                    })
                    .attr("y", 0)
                    .attr("width", 5)
                    .attr("height", height)
                    .style("fill", "transparent")
                    .style('stroke', 'grey')

                q_group.append('text')
                    .attr("x", function(){
                        if(d.hours_avg === 'N/A'){
                            return qScale(2.5)-2
                        } else {
                            return qScale(d.hours_avg)-2
                        }
                    })
                    .attr("y", -5)
                    .text(function(){
                        if(d.hours_avg === 'N/A'){
                            return 'N/A'
                        } else {
                            return 'avg'
                        }
                    })
                    .style("fill", 'darkgrey')
                    .style("text-anchor", 'middle')

            })
            .on('mouseout', function (event, d) {
                d3.select(this)
                    .style('opacity', 1)
                    .style('stroke-width', '0.5px')

                // update tooltip
                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0 + "px")
                    .style("top", 0 + "px")

                // delete tooltip group
                d3.select('#course-skills-lines-group').remove()
                d3.selectAll('.skill-card')
                    .style('fill', 'rgba(218,218,218,0.38)')


            })

        vis.drawAwards()
    }

    drawAwards(){
        let vis = this;

        // awards group
        vis.phdAwardsGroup = vis.phd_group.append('g')
            .attr('id', 'phd-awards')

        // awards text
        vis.awardsText = vis.phdAwardsGroup.append('text')
            .attr('x', vis.phd_width*vis.width/2)
            .attr("y", vis.visHeight*0.55 - vis.visHeight*0.075)
            .style('font-style','italic')
            .style('text-anchor','middle')

        // interactive overlay award rect
        vis.phdAwardsGroup.append('rect')
            .attr("id", "awardsrect")
            .attr("x", 0)
            .attr("y", vis.visHeight*0.55 - vis.visHeight*0.10)
            .attr("width", vis.phd_width*vis.width)
            .attr("height", vis.visHeight*0.10)
            .style("fill", 'transparent')
            .on('mouseover', function (event,d){
                d3.select(this)
                    .style("fill", "rgba(255,255,255,0.36)")
                vis.awardsText
                    .style('opacity', 1)
                    .text('Awards, Stipends, Fellowships')
            })
            .on('mouseout', function (event,d){
                d3.select(this)
                    .style("fill", "transparent")
                vis.awardsText
                    .style('opacity', 0)
            })
            .on('click', function (event,d){
                vis.iterateThroughAwardsViews()
             })

        // awards circles
        vis.phdAwards = vis.phdAwardsGroup.selectAll().data(phd_awards);
        vis.awardsCircles = vis.phdAwards.enter().append('circle')
            .attr('class', d=> `el`)
            .attr("cx", d => vis.phd_x(vis.parseDate(d.year)))
            .attr("cy", d => vis.visHeight * 0.50)
            .attr('r', 7)
            .style('fill', `rgb(205,205,205)`)
            .style('stroke', 'black')
            .style('stroke-width', '0.5px')
            .on("mouseover", function (event,d){

                d3.select(this)
                    .style('opacity', 0.8)
                    .style('stroke-width', '1.5px')

                vis.tooltip
                    .style("opacity", 0.9)
                    .style("left", event.pageX - 20 - $(".tooltip").width() + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                        <div class="row" style="border: thin solid grey; border-radius: 5px; background: #ececec; padding: 8px; overflow-wrap: break-word; word-break: break-word; ">
                            <h3>${d.name}<h3>
                            <h4>Type:</h4>
                            <h4><span style="border: thin solid black; border-radius: 2px; background: ${awardTypeColorLookup[d.type]}; padding: 2px; margin:2px">${d.type}</span></h4>
                            <h4>Amount:</h4>
                            <h4><span style="border: thin solid black; border-radius: 2px; background: lightgrey; padding: 2px; margin:2px">${d.value}$</span></h4>
                            
                        </div>`);
            })
            .on("mouseout", function (d,i){

                d3.select(this)
                    .style('opacity', 1)
                    .style('stroke-width', '0.5px')

                // update tooltip
                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0 + "px")
                    .style("top", 0 + "px")
            })
        vis.drawTeaching()
    }

    drawTeaching(){
        let vis = this;

        vis.phd_teaching_group = vis.phd_group.append('g')
            .attr('id', 'phd-teaching')

        vis.teaching_text = vis.phd_teaching_group.append('text')
            .attr('x', vis.phd_width*vis.width/2)
            .attr("y", vis.visHeight*0.45 - vis.visHeight*0.075)
            .style('font-style','italic')
            .style('text-anchor','middle')
            .style('opacity', 0)
            .text('teaching experience')

        vis.teachingAxisGroup = vis.phd_teaching_group.append('g')

        // add interactive rect that triggers sorting of all courses by q scores or enrollment
        vis.phd_teaching_group.append('rect')
            .attr("id", "teachingrect")
            .attr("x", 0)
            .attr("y", vis.visHeight*0.45 - vis.visHeight*0.10)
            .attr("width", vis.phd_width*vis.width)
            .attr("height", vis.visHeight*0.10)
            .style("fill", 'transparent')
            .on('mouseover', function (event,d){
                d3.select(this)
                    .style("fill", "rgba(255,255,255,0.36)")

                vis.teaching_text
                    .style('opacity', 1)

                // show div
                d3.select('#teaching').style("display", "block")

                // draw vis #1
                showTextBox()
            })
            .on('mouseout', function (event,d){

                d3.select(this)
                    .style("fill", "transparent")
                vis.teaching_text
                    .style('opacity', 0)

                hideTextBox()
            })
            .on('click', function (event,d){

                vis.iterateThroughTeachingViews()

            })

        vis.phd_teaching = vis.phd_teaching_group.selectAll().data(teaching)

        vis.teaching_rects = vis.phd_teaching.enter().append("rect")
            .attr('class', d => {
                let class_string = ``
                d.taught_skills.forEach(d =>{
                    class_string += `${d} `
                })
                return `teaching el ${class_string}`
            })
            .attr("x", d => vis.phd_x(vis.parseDate(d.year[0])))
            .attr("y", d => vis.visHeight * 0.445 - 11 - 15*d.z)
            .attr("width", d => {
                let diff = vis.phd_x(vis.parseDate(d.year[1])) - vis.phd_x(vis.parseDate(d.year[0]))
                return diff
            })
            .attr("height", 10)
            .style('fill', 'transparent')
            .style('stroke', 'black')
            .style('stroke-width', '0.5px')
            .style('opacity', 0.7)
            .on('mouseover', function (event, d) {

                // check if d.text is a function that generates addition text
                if (typeof(d.text) === "function"){

                    // if so, run it
                    d.text()
                }

                d3.select(this)
                    .style('stroke-width', '1.5px')
                    .style('fill', d => paradigmColorLookUpTable[d.paradigm])
                    .style('opacity', 0.7)


                // CONNECTIONS

                // create tmp group that can be deleted on mouseout
                let tmp_group = vis.tmp_group.append('g')
                    .attr('id', `course-skills-lines-group`)


                // grab taught skills
                d.taught_skills.forEach(d =>{

                    // grab skill card location
                    console.log(d)
                    // grab positions of start and ending elements of each individual skill card

                    // start is the current rect
                    let x_start = +d3.select(this).attr("x") + +d3.select(this).attr("width") / 2
                    let y_start = +d3.select(this).attr("y") + vis.margin.top + 10
                    let x_end = +d3.select(`#${d}-card`).attr("x") + +d3.select(`#${d}-card`).attr("width") / 2
                    let y_end = +d3.select(`#${d}-card`).attr("y")

                    // grab info
                    let degree = d3.select(this).data()[0].degree
                    let name = d3.select(this).data()[0].name
                    let paradigm = d3.select(this).data()[0].paradigm


                    // make x position adjustments based on the degree group element was in
                    if (degree === 'phd' || degree === 'msc' || paradigm === 'cs' || paradigm === 'humanities') {
                        x_start += vis.phd_start
                    }

                    // init path generator
                    const link = d3.link(d3.curveBumpY);

                    // draw path
                    tmp_group.append("path")
                        .attr('class', `el`)
                        .attr('d', d => {
                            return link({
                                source: [x_start, y_start],
                                target: [x_end, y_end]
                            })
                        })
                        .style('fill', 'transparent')
                        .style('stroke', colorCourseLookupTable[d])

                    // color skill card
                    d3.select(`#${d}-card`)
                        .style('fill', colorCourseLookupTable[d])

                })

                // TOOLTIP

                // generate html string with all courses
                let courses_string = ''
                d.taught_skills.forEach( (d,i) => {

                    courses_string += `<span style="border: thin solid black; border-radius: 2px; background: ${colorCourseLookupTable[d]}; padding: 2px; margin:2px">${shortTolongSkill[d]}</span>`
                    if(i==1 || i==3 || i == 5){
                        courses_string += `<br>`
                    }
                })

                vis.tooltip
                    .style("opacity", 0.9)
                    .style("left", event.pageX - 20 - $(".tooltip").width() + "px")
                    .style("top", event.pageY + "px")
                    .html(`
                        <div class="row" style="border: thin solid grey; border-radius: 5px; background: #ececec; padding: 8px; overflow-wrap: break-word; word-break: break-word; ">
                            <h3>${d.name}<h3>
                            <h4>semester:</h4>
                            <h4><span style="border: thin solid black; border-radius: 2px; background: lightgrey; padding: 2px; margin:2px">${d.semester}</span></h4>
                            <h4>students:</h4>
                            <h4><span style="border: thin solid black; border-radius: 2px; background: lightgrey; padding: 2px; margin:2px">${d.students}</span></h4>
                            <h4>skills taught: </h4>
                            <h4 style="overflow-wrap: break-word; word-break: break-word; line-height: 3vh;">${courses_string} </h4>
                            <h4>q-score: </h4>
                            <div id="tooltipQScore" style="width=100%; height: 7vh;"></div>
                        </div>`);


                let w_tooltip = $("#tooltipQScore").width() - 16
                let h_tooltip = $("#tooltipQScore").height()

                let margins = {left: 10, right: 10, top: 15, bottom:20}
                let height = h_tooltip - margins.top - margins.bottom
                let width = w_tooltip - margins.left - margins.right

                let q_group = d3.select("#tooltipQScore").append('svg')
                    .attr('width', width +  margins.left + margins.right)
                    .attr('height', height +  margins.top + margins.bottom)
                    .append('g')
                    .attr('transform', `translate(${margins.left},${margins.top})`)

                let qScale = d3.scaleLinear()
                    .range([0,width])
                    .domain([0,5])

                let qAxisGroup = q_group.append('g')
                    .attr('class', 'axis x-axis')
                    .attr('transform', `translate (0,${height})`);

                let qAxis = d3.axisBottom(qScale)
                    .tickValues([0,1,2,3,4,5])

                qAxisGroup.call(qAxis)

                q_group.append('rect')
                    .attr("x", function(){
                        if(d.q_avg === 'N/A'){
                            return qScale(2.5)-2
                        } else {
                            return qScale(d.q_score)-2
                        }
                    })
                    .attr("y", 0)
                    .attr("width", 5)
                    .attr("height", height)
                    .style("fill", vis.colors[1])
                    .style('stroke', '#000000')


                q_group.append('rect')
                    .attr("x", function(){
                        if(d.q_avg === 'N/A'){
                            return qScale(2.5)-2
                        } else {
                            return qScale(d.q_avg)-2
                        }
                    })
                    .attr("y", 0)
                    .attr("width", 5)
                    .attr("height", height)
                    .style("fill", "transparent")
                    .style('stroke', 'grey')

                q_group.append('text')
                    .attr("x", function(){
                    if(d.q_avg === 'N/A'){
                        return qScale(2.5)-2
                    } else {
                        return qScale(d.q_avg)-2
                    }
                })
                    .attr("y", -5)
                    .text(function(){
                        if(d.q_avg === 'N/A'){
                            return 'N/A'
                        } else {
                            return 'avg'
                        }
                    })
                    .style("fill", 'darkgrey')
                    .style("text-anchor", 'middle')

            })
            .on('mouseout', function (event, d) {

                hideTextBox()
                d3.select(this)
                    .style('stroke-width', '0.5px')
                    .style('fill', d => {
                        if(vis.switches.teaching_sorted %4 !== 0){
                            return paradigmColorLookUpTable[d.paradigm]
                        } else {
                            return 'transparent'
                        }
                    })


                // update tooltip
                vis.tooltip
                    .style("opacity", 0)
                    .style("left", 0 + "px")
                    .style("top", 0 + "px")

                // delete tooltip group
                d3.select('#course-skills-lines-group').remove()
                d3.selectAll('.skill-card')
                    .style('fill', 'rgba(218,218,218,0.38)')


            })


        vis.drawPresentations()
    }

    drawPresentations(){

        let vis = this;

        vis.diss_y = d3.scaleLinear()
            .domain([0,200])
            .range([20,0])

        vis.disspath = d3.line()
            .curve(d3.curveCatmullRom.alpha(0.5))
            .x((d) => vis.phd_x(vis.parseDate(d.date)))
            .y((d) => vis.diss_y(d.pages))


        vis.phd_diss_progress_group = vis.phd_group.append('g')
            .attr('transform', `translate(${0}, ${vis.visHeight*0.23})`)
            .attr('id', 'diss-progress')
            .style('fill', 'transparent')
            .style('stroke', 'grey')
            .style('stroke-width', 2)


        // diss progress path
        vis.phd_diss_progress = vis.phd_diss_progress_group.append('path')
            .datum(dissertationProgress)
            .attr('id', 'disspath')
            .attr('d', vis.disspath)


        //console.log(d3.select('#disspath').getPointAtLength())

        // p rect
        vis.phd_projects_and_papers = vis.phd_group.selectAll("p-rect").data(presentations)

        vis.phd_projects_and_papers.enter().append("rect")
            .attr('class', d => 'p-rect')
            .attr("x", d => vis.phd_x(vis.parseDate(d.date)))
            .attr("y", d => vis.visHeight * 0.35 - 20)
            .attr("width", 21)
            .attr("height", 10)
            //.style('fill', d => "#83C5BE")
            .style('fill', d => "transparent")
            .style('stroke', 'grey')
            .style('stroke-width', '1px')

        vis.phd_projects_and_papers.enter().append("rect")
            .attr('class', d => 'p-rect')
            .attr("x", d => vis.phd_x(vis.parseDate(d.date)) + 10)
            .attr("y", d => vis.visHeight * 0.35 - 60)
            .attr("width", 1)
            .attr("height", 40)
            //.style('fill', d => "#83C5BE")
            .style('fill', d => "grey")
            .style('stroke', 'grey')
            .style('stroke-width', '0.5px')



        // pp circle
        vis.phd_projects_and_papers = vis.phd_group.selectAll("pp-circle").data(projectsAndPapers)

        vis.phd_projects_and_papers.enter().append("circle")
            .attr('class', d => 'pp-circle')
            .attr("cx", d => vis.phd_x(vis.parseDate(d.date)))
            .attr("cy", d => vis.visHeight * 0.20)
            .attr("r", 12)
            //.style('fill', d => "#83C5BE")
            .style('fill', d => "transparent")
            .style('stroke', 'grey')
            .style('stroke-width', '1px')

        vis.phd_projects_and_papers.enter().append("rect")
            .attr('class', d => 'pp-circle-line')
            .attr("x", d => vis.phd_x(vis.parseDate(d.date)) )
            .attr("y", d => vis.visHeight * 0.20 + 12)
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

        vis.skillgroup = vis.svg.append('g')
            .attr('id', 'skill-group')
            .attr('opacity', 0)

        vis.skillRects = vis.skillgroup.selectAll().data(skills)

        vis.skillRects.enter().append('rect')
            .attr('class', 'clickable skill-card')
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
                // when you click on it, you actually should have triggered the hover event first,
                // so the only thing you need to do is to lock the selection
                if (vis.expanded[d.skill_abbreviation] === false){
                    vis.expanded[d.skill_abbreviation] = true
                } else {
                    vis.expanded[d.skill_abbreviation] = false
                }
            })
            .on('mouseover', function (event, d){

                // check whether current skill is locked.
                // if the skill is not locked, that means it's the first time hovering over it
                if (vis.expanded[d.skill_abbreviation] === false) {

                    // generate a tmp group for the connecting lines
                    // (multiple skill cards can be selected and expanded at same time!)
                    let tmp_group = vis.tmp_group.append('g')
                        .attr('id', `${d.skill_abbreviation}-lines-group`)


                    // first, color card
                    d3.select(`#${d.skill_abbreviation}-card`)
                        .style('fill', d => colorCourseLookupTable[d.skill_abbreviation])

                    // loop over all selected elements
                    d3.selectAll(`.course.${d.skill_abbreviation}, .teaching.${d.skill_abbreviation}`).each(function () {

                        // color all elements
                        d3.selectAll(`.course.${d.skill_abbreviation}, .teaching.${d.skill_abbreviation}`).style('fill', colorCourseLookupTable[d.skill_abbreviation])

                        // grab positions of start and ending elements
                        let x_end = +d3.select(this).attr("x") + +d3.select(this).attr("width") / 2
                        let y_end = +d3.select(this).attr("y") + vis.margin.top + 10
                        let x_start = +d3.select(`#${d.skill_abbreviation}-card`).attr("x") + +d3.select(`#${d.skill_abbreviation}-card`).attr("width") / 2
                        let y_start = +d3.select(`#${d.skill_abbreviation}-card`).attr("y")

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
                        tmp_group.append("path")
                            .attr('class', `el ${name} ${d.skill_abbreviation}`)
                            .attr('d', d => {
                                return link({
                                    source: [x_start, y_start],
                                    target: [x_end, y_end]
                                })
                            })
                            .style('fill', 'transparent')
                            .style('stroke', colorCourseLookupTable[d.skill_abbreviation])
                    })


                }
            })
            .on('mouseout', function (event, d) {

                // check whether current skill is locked.
                // if skill is not locked, then you were just hovering over it but have not clicked it
                if (vis.expanded[d.skill_abbreviation] === false) {

                    // set card to transparent
                    d3.select(`#${d.skill_abbreviation}-card`).style('fill', 'rgba(218,218,218,0.38)')

                    // set courses and other elements to transparent
                    d3.selectAll(`.course.${d.skill_abbreviation}, .teaching.${d.skill_abbreviation}`).style('fill', 'transparent')

                    // remove the current group with all lines
                    d3.select(`#${d.skill_abbreviation}-lines-group`).remove()

                }
            })

        vis.skillRects.enter().append('text')
            .attr('id', d => `${d.skill_abbreviation}-card-text`)
            .attr('class', 'clickable')
            .attr('width', d => d.rel_end_x * vis.width - d.rel_start_x * vis.width)
            .attr('height', 40)
            .attr('x', d => d.rel_start_x * vis.width + (d.rel_end_x * vis.width - d.rel_start_x * vis.width)/2)
            .attr('y', d => vis.visHeight + vis.margin.top + vis.margin.bottom + d.row*50 + 24)
            .text(d=> d.skill_long)
            .style('text-anchor', 'middle')
            .on('click', function (event, d){
                // when you click on it, you actually should have triggered the hover event first,
                // so the only thing you need to do is to lock the selection
                if (vis.expanded[d.skill_abbreviation] === false){
                    vis.expanded[d.skill_abbreviation] = true
                } else {
                    vis.expanded[d.skill_abbreviation] = false
                }
            })
            .on('mouseover', function (event, d){

                // check whether current skill is locked.
                // if the skill is not locked, that means it's the first time hovering over it
                if (vis.expanded[d.skill_abbreviation] === false) {

                    // generate a tmp group for the connecting lines
                    // (multiple skill cards can be selected and expanded at same time!)
                    let tmp_group = vis.tmp_group.append('g')
                        .attr('id', `${d.skill_abbreviation}-lines-group`)


                    // first, color card
                    d3.select(`#${d.skill_abbreviation}-card`)
                        .style('fill', d => colorCourseLookupTable[d.skill_abbreviation])

                    // loop over all selected elements
                    d3.selectAll(`.course.${d.skill_abbreviation}, .teaching.${d.skill_abbreviation}`).each(function () {

                        // color all elements
                        d3.selectAll(`.course.${d.skill_abbreviation}, .teaching.${d.skill_abbreviation}`).style('fill', colorCourseLookupTable[d.skill_abbreviation])

                        // grab positions of start and ending elements
                        let x_end = +d3.select(this).attr("x") + +d3.select(this).attr("width") / 2
                        let y_end = +d3.select(this).attr("y") + vis.margin.top + 10
                        let x_start = +d3.select(`#${d.skill_abbreviation}-card`).attr("x") + +d3.select(`#${d.skill_abbreviation}-card`).attr("width") / 2
                        let y_start = +d3.select(`#${d.skill_abbreviation}-card`).attr("y")

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
                        tmp_group.append("path")
                            .attr('class', `el ${name} ${d.skill_abbreviation}`)
                            .attr('d', d => {
                                return link({
                                    source: [x_start, y_start],
                                    target: [x_end, y_end]
                                })
                            })
                            .style('fill', 'transparent')
                            .style('stroke', colorCourseLookupTable[d.skill_abbreviation])
                    })


                }
            })
            .on('mouseout', function (event, d) {

                // check whether current skill is locked.
                // if skill is not locked, then you were just hovering over it but have not clicked it
                if (vis.expanded[d.skill_abbreviation] === false) {

                    // set card to transparent
                    d3.select(`#${d.skill_abbreviation}-card`).style('fill', 'rgba(218,218,218,0.38)')

                    // set courses and other elements to transparent
                    d3.selectAll(`.course.${d.skill_abbreviation}, .teaching.${d.skill_abbreviation}`).style('fill', 'transparent')

                    // remove the current group with all lines
                    d3.select(`#${d.skill_abbreviation}-lines-group`).remove()

                }
            })
    }

    iterateThroughAwardsViews(){

        console.log('i',vis.switches.awards_sorted)

        vis.switches.awards_sorted += 1

        // if the switch currently says sorted, then reset to base view if on click
        if(vis.switches.awards_sorted % 3 === 0) {

            vis.awardsText
                .text('Awards, Stipends, Fellowships')

            vis.awardsCircles
                .transition()
                .duration(500)
                .attr("cx", d => vis.phd_x(vis.parseDate(d.year)))
                .attr("cy", d => vis.visHeight * 0.50)
                .attr('r', 7)
                .style('fill', `rgb(205,205,205)`)
                .style('stroke', 'black')
                .style('stroke-width', '0.5px')

        } else if(vis.switches.awards_sorted % 3 === 1){

            // update text
            vis.awardsText.text('colored by award type')

            // recolor circles
            vis.awardsCircles
                .style('fill', d => awardTypeColorLookup[d.type])
        }

        // 3rd view - sorted by enrollment
        else if(vis.switches.awards_sorted % 3 === 2){

            console.log('eigt jetzt', vis.awardsCircles)
            // update text
            vis.awardsText.text('sorted by award amount')

            // create a scale
            vis.awardAmountScale = d3.scaleLinear()
                .range([0, vis.phd_width * vis.width])
                .domain([-1000, 36000])

            // grab all awards
            vis.awardsCircles
                .transition()
                .duration(500)
                .attr("cx", d => vis.awardAmountScale(d.value))
                .attr("cy", d => vis.visHeight * 0.50 + 3*d.z)
                .attr('r', 7)
        }
    }

    iterateThroughTeachingViews(){
        vis.switches.teaching_sorted += 1

        // if the switch currently says sorted, then reset to base view if on click
        if(vis.switches.teaching_sorted % 4 === 0) {

            vis.teaching_text
                .text('teaching experience')

            vis.teaching_rects
                .transition()
                .duration(500)
                .attr("x", d => vis.phd_x(vis.parseDate(d.year[0])))
                .attr("y", d => vis.visHeight * 0.445 - 11 - 15*d.z)
                .attr("width", d => {
                    let diff = vis.phd_x(vis.parseDate(d.year[1])) - vis.phd_x(vis.parseDate(d.year[0]))
                    return diff
                })
                .attr("height", 10)
                .style('fill',  'transparent')

        }

        else if(vis.switches.teaching_sorted % 4 === 1){

            vis.teaching_text
                .text('colored by subject')

            vis.teaching_rects
                .style('fill', d => paradigmColorLookUpTable[d.paradigm])
                .style('opacity', 0.7)

        } else if(vis.switches.teaching_sorted % 4 === 2){

            vis.teaching_text.text('sorted by enrolled students')
            vis.sortTeachingByStudents()

        } else if(vis.switches.teaching_sorted % 4 === 3) {
            vis.teaching_text.text('sorted by q score')
            vis.sortTeachingByScore()

        }
    }

    sortTeachingByStudents(){

        // create a scale
        vis.teaching_scale = d3.scaleLinear()
            .range([0, vis.phd_width * vis.width])
            .domain([0, 150])

        // grab all course
        let taught_courses = vis.teaching_rects
            .transition()
            .duration(500)
            .attr("x", d => vis.teaching_scale(d.students))
            .attr("y", d => vis.visHeight * 0.445 - 21)
            .attr("width", 5)
            .attr("height", 20)
            .style('fill', d =>{
                let color = vis.colors[3]
                if(d.paradigm === 'cs'){
                    color = vis.colors[1]
                }
                return color
            })
    }

    sortTeachingByScore(){

        // create a scale
        vis.teaching_scale = d3.scaleLinear()
            .range([0, vis.phd_width * vis.width])
            .domain([0, 5.5])

        // grab all course
        let taught_courses = vis.teaching_rects
            .transition()
            .duration(500)
            .attr("x", d => vis.teaching_scale(d.q_score))
            .attr("y", d => vis.visHeight * 0.445 - 21)
            .attr("width", 5)
            .attr("height", 20)
            .style('fill', d =>{
                let color = vis.colors[3]
                if(d.paradigm === 'cs'){
                    color = vis.colors[1]
                }
                return color
            })
    }

    resetColors(){

        // courses
        d3.selectAll('.course').each(function (){
            d3.select(this)
                .style('fill', d =>{
                    let color = vis.colors[4]
                    if(d.degree === 'msc'){
                        color = vis.colors[0]
                    }
                    return 'transparent'
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
                    return 'transparent'
                })
        })
    }
}


