//

function explore(){
    console.log('clicked')

    d3.select("#logo-container")
        .transition()
        .delay(1000)


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
        .on("start", function() {
            document.getElementById("intro-button-container").innerHTML = '';
        })

        .transition()
        .duration(500)
        .style("height", "calc(98vh - 2px)")
        .style("border-top", "0px")
        .style("border-bottom", "0px")
        .style("border-left", "0px")
        .on("start", function(){
            startNarration()
        })



    // vis.phd_group.attr("opacity", 1).transition().duration(1000).attr("opacity", 0).transition().duration(1000).attr("opacity", 1)

}



let vis = new Vis("vis-container")



// NARRATIVE CV
function startNarration(){

    // show all rects
    vis.ba_group.transition().duration(500).attr('opacity',1)
    vis.ma_group.transition().duration(500).attr('opacity',1)
    vis.phd_group.transition().duration(500).attr('opacity',1)

}