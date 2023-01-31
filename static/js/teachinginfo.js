
function digitalMary(){

    console.log('mary is running')

    document.getElementById("text-box-inner").innerHTML =
        `<div class="row" style="border: thin solid black; background: #e7e7e7">
       Mary
        </div>`

    d3.select('#text-box').style('opacity',1)
}


