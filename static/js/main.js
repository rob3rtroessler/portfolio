//

function explore(){
    console.log('clicked')
    d3.select("#logo-container")
        .style("left","39vw")
        .style("top", "39vh")
        .style("height", "20vh")


        .transition()
        .duration(1000)
        .style("left", "0vw")

        .transition()
        .duration(500)
        .style("top", "0vh")


        .transition()
        .duration(500)
        .style("height", "calc(98vh - 2px)")

        .style("border-top", "0px")
        .style("border-bottom", "0px")
        .style("border-left", "0px")

    // vis.phd_group.attr("opacity", 1).transition().duration(1000).attr("opacity", 0).transition().duration(1000).attr("opacity", 1)

}



let vis = new Vis("vis-container")

