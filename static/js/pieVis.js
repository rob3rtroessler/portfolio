function drawStudentCircle(parentElement){

    // relative margins
    let margin =
        {
            top: $("#" + parentElement).height() / 40,
            right: $("#" + parentElement).width() / 50,
            bottom: $("#" + parentElement).height() / 30,
            left: $("#" + parentElement).width() / 50
        };

    let width = $("#" + parentElement).width() - margin.left - margin.right;
    let height = $("#" + parentElement).height() - margin.top - margin.bottom;

    // init drawing area
    let svg = d3.select("#" + parentElement).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate (${margin.left}, ${margin.top})`);

    svg.append('rect')
        .attr('height', height)
        .attr('width', width)
}

function drawCourseCircle(parentElement){

    // relative margins
    let margin =
        {
            top: $("#" + parentElement).height() / 40,
            right: $("#" + parentElement).width() / 50,
            bottom: $("#" + parentElement).height() / 30,
            left: $("#" + parentElement).width() / 50
        };

    let width = $("#" + parentElement).width() - margin.left - margin.right;
    let height = $("#" + parentElement).height() - margin.top - margin.bottom;

    // init drawing area
    let svg = d3.select("#" + parentElement).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate (${margin.left}, ${margin.top})`);

    svg.append('rect')
        .attr('height', height)
        .attr('width', width)
}













class PieVis {

    // constructor method to initialize Timeline object
    constructor(parentElement) {
        this.parentElement = parentElement;

        this.colors = ["#006D77", "#83C5BE", "#EDF6F9", "#FFDDD2", "#E29578"]


        // call initVis method
        this.initVis()
    }

    initVis() {
        let vis = this;

        // relative margins
        vis.margin =
            {
                top: $("#" + vis.parentElement).height() / 40,
                right: $("#" + vis.parentElement).width() / 50,
                bottom: $("#" + vis.parentElement).height() / 30,
                left: $("#" + vis.parentElement).width() / 50
            };

        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.svg.append('rect')
            .attr('height', this.height)
            .attr('width', this.width)

        console.log('test',vis.width, vis.height)
    }
}