

function showLockedTextBox(lockedItem){
    if (lockedItem === 'legend'){
        showIntroTextBox()
    } else if (lockedItem === 'teaching'){
        showTeachingTextBox()
    }
}

function showIntroTextBox(){

    document.getElementById("text-box-inner").innerHTML =
        `<div class="row" style="border: thin solid black; background: #e7e7e7">
            <div class="col">
                <div class="row" style="padding: 5px">
                    <h1 style="text-align: center; font-size: 1.5em">Legend & Usage</h1>
                </div>
                <div class="row" style="height: 30vh" id="exp-container">
                </div>
                <div class="row" style="font-style: italic; font-size: 1em; padding: 5px">
                    <span style="text-align: center; ">
                        Hover over elements to explore connections and tooltips
                    </span>
                </div>
                <div class="row" style="font-style: italic; font-size: 1em; text-align: center; padding: 5px">
                     <span style="text-align: center;">
                        Click on elements to lock the current view and access additional information and context
                    </span>
                </div>
                <div class="row" style="font-style: italic; font-size: 1em; text-align: center; padding: 5px">
                    Right click on unique groups of elements, for advanced interactions such as sorting and filtering
                </div>
            </div>
        </div>`

    d3.select('#text-box').style('opacity',1)

    // first, empty the container
    document.getElementById("exp-container").innerHTML = '';

    //then, draw the circles again
    explanationVis("exp-container")
}

function showTeachingTextBox(){

    document.getElementById("text-box-inner").innerHTML =
        `<div class="row" style="border: thin solid black; background: #e7e7e7">
            <div class="col">
                <div class="row" style="height: 15vh">
                    <div class="col-6">
                        <div class="row" id="cc-container" style="height: 15vh"></div>
                    </div>
                    <div class="col-6">
                        <div class="row" id="sc-container" style="height: 15vh"></div>
                    </div>
                </div>
                <div class="row" style="font-style: italic; font-size: 1em; text-align: center; padding: 5px">
                    Taught a total of 18 classes to 600+ students, both in data science and the humanities; remote and in
                    person
                </div>
                <div class="row" style="font-style: italic; font-size: 1em; text-align: center; padding: 5px">
                    Received an 'Excellent in Teaching Award' for all classes taught (awarded to ~15% of Harvard's
                    instructors)
                </div>
                <div class="row" style="font-style: italic; font-size: 1em; text-align: center; padding: 5px">
                    Led teams of 10+ teaching fellows; organized weekly meetings; optimized learning environments;
                </div>
                <div class="row" style="font-style: italic; font-size: 1em; text-align: center; padding: 5px">
                    Advised 25+ data science projects in 5+ domains - 3 award winners;
                </div>
            </div>
        </div>`

    d3.select('#text-box').style('opacity',1)

    // first, empty the container
    document.getElementById("cc-container").innerHTML = '';
    document.getElementById("sc-container").innerHTML = '';

    //then, draw the circles again
    drawCourseCircle("cc-container")
    drawStudentCircle("sc-container")
}

function hideTeachingTextBox() {

    d3.select('#text-box').style('opacity', 0)

}

function explanationVis(parentElement){
    let margin = {top: 10, right: $("#" + parentElement).width()/2, bottom: 10, left: 10},
        width = $("#" + parentElement).width() - margin.left - margin.right,
        height = $("#" + parentElement).height() - margin.top - margin.bottom;

    let svg = d3.select(`#${parentElement}`).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('y', 0)
        .attr("x",0)
        .attr("rx", "5")
        .style('fill', 'rgba(218,218,218,0.76)')
        .style('stroke', 'black')
        .style('stroke-width', '0.5px')

    let lines = [0.7, 0.55, 0.4, 0.25]
    svg.selectAll().data(lines)
        .enter()
        .append("line")
        .attr("x1", 0)
        .attr("y1", d=> d*height)
        .attr("x2", width)
        .attr("y2", d=> d*height)
        .style('stroke', "#707070")
        .style('stroke-width', '0.5')
        .style('stroke-dasharray', 5)

    let connections = [
        {
            start:0.85,
            end: 0.9,
            text: 'degree'
        },
        {
            start:0.625,
            end: 0.675,
            text: 'course work'
        },
        {
            start: 0.475,
            end: 0.475,
            text: 'awards & fellowships'
        },
        {
            start: 0.325,
            end: 0.275,
            text: 'teaching'
        },
        {
            start: 0.125,
            end: 0.075,
            text: 'publications & projects'
        }]
    svg.selectAll().data(connections)
        .enter()
        .append("line")
        .attr("x1", width/1.2)
        .attr("y1", d=> d.start*height)
        .attr("x2", width + $("#" + parentElement).width()/10)
        .attr("y2", d=> d.end*height)
        .style('stroke', "#262626")
        .style('stroke-width', '0.5')

    svg.selectAll().data(connections)
        .enter()
        .append("text")
        .attr('x', width + $("#" + parentElement).width()/10 + 2)
        .attr("y", d=> d.end*height + 3)
        .style('font-size', 12)
        .style('font-style','italic')
        .text(d=>d.text)

}

function drawStudentCircle(parentElement){

    // relative margins
    let width = $("#" + parentElement).width()
    let height = $("#" + parentElement).height()

    // init drawing area
    let svg = d3.select("#" + parentElement).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");


    let students = 0
    let cs_students = 0
    let hum_students = 0
    teaching.forEach(course =>{
        students += course.students
        if (course.paradigm === 'humanities'){
            hum_students += course.students
        } else {
            cs_students += course.students
        }
    })

    let dataset = [cs_students, hum_students];


    let color = d3.scaleOrdinal()
        .range(["#006D77", "#E29578"]);



    let arc = d3.arc()
        .outerRadius(height/2 - 15)
        .innerRadius(height/4);

    let pie = d3.pie()
        .sort(null)
        .value(function(d) { return d; });

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('allSlices')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .style("fill", function(d) { return color(d.data); })
        .style("stroke", 'black')
        .style("stroke-width", "2px")
        .style("opacity", 0.7)


    svg.append("text")
        .style("text-anchor","middle")
        .attr('y', 5)
        .text(students);

    svg.append("text")
        .style("text-anchor","middle")
        .attr('y', -height/2 + 10)
        .text("Students");


}

function drawCourseCircle(parentElement){

    // relative margins
    let width = $("#" + parentElement).width()
    let height = $("#" + parentElement).height()

    // init drawing area
    let svg = d3.select("#" + parentElement).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");


    let dataset = [9, 9];


    let color = d3.scaleOrdinal()
        .range(["#006D77", "#E29578"]);


    let arc = d3.arc()
        .outerRadius(height/2 - 15)
        .innerRadius(height/4);

    let pie = d3.pie()
        .sort(null)
        .value(function(d) { return d; });

    console.log(pie)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('allSlices')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .style("fill", function(d,i) { return color(i); })
        .style("stroke", 'black')
        .style("stroke-width", "2px")
        .style("opacity", 0.7)


    svg.append("text")
        .style("text-anchor","middle")
        .attr('y', 5)
        .text("18");

    svg.append("text")
        .style("text-anchor","middle")
        .attr('y', -height/2 + 10)
        .text("Courses");
}





