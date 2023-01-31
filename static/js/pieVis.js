function showTextBox(){

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

    //drawSkillsTaughtBars("skill-bars-container")

}

function hideTextBox() {

    d3.select('#text-box').style('opacity', 0)

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





