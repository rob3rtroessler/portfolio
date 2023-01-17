//



function explore(){
    console.log('clicked')
    d3.select("#logo-container")
        .style("left","39vw")
        .style("top", "39vh")

        .transition()
        .duration(500)
        .style("left", "0vw")

        .transition()
        .duration(1000)
        .style("top", "0vh")


        .transition()
        .duration(500)
        .style("height", "calc(98vh - 2px)")

        .style("border-top", "0px")
        .style("border-bottom", "0px")
        .style("border-left", "0px")

}