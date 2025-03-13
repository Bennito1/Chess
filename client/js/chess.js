var map
var devSqare = '<div id = "s$cord"  class="sqare $color" ></div>';
var devFigure = '<div id = "F$cord"  class="figure">$figure</div>';

$(function() {
    start()

}) 
function start(){
    map = new Array(64)
    addSqare();
    showFigur('LHSQKSHLPPPPPPPP11111111111111111111111111111111pppppppplhsqkshl');
}
function addSqare(){
    console.log('addSqare')
    $('.board').html('')
    
    for (var cord = 0; cord<64; cord++)
        $('.board').append(devSqare
            .replace('$cord', cord)
            .replace('$color', isBlackSqareAt(cord) ? 'black' : 'white'));

    setDropable();   
}
function dvigFig(){
    $('.figure').draggable();
}
function setDropable(){
    $('.sqare').droppable({
        drop:   function (event, ui){
            var frCord = ui.draggable.attr('id').substring(1)
            var toCord = this.id.substring(1)
            console.log(frCord, toCord)
            moveFigure(frCord, toCord)
        }
    });
}
function moveFigure(frCord, toCord){
    figure = map[frCord]
    addFigureAt(frCord, '1')
    addFigureAt(toCord , figure)
    dvigFig()

}
function showFigur(figures){
    for (var cord = 0; cord<64; cord++)
        addFigureAt(cord, figures.charAt(cord))

    setDropable();
    dvigFig()
}

function addFigureAt(cord, figure){
    map[cord] = figure
    $('#s' + cord).html(devFigure
        .replace('$cord', cord)
        .replace('$figure', vidFigure(figure)));

}
function vidFigure(figure){
    switch (figure){
        case 's' : return '<img src="images/sb.jpg" height = 60px alt="">'
        case 'S' : return '<img src="images/sw.jpg" height = 60px alt="">'
        case 'l' : return '&#9820'
        case 'L' : return '&#9814'
        case 'k' : return '&#9818'
        case 'K' : return '&#9812'
        case 'q' : return '&#9819'
        case 'Q' : return '&#9813'
        case 'p' : return '&#9823'
        case 'P' : return '&#9817'
        case 'h' : return '&#9822'
        case 'H' : return '&#9816'
        default : return ''
    }

}
function isBlackSqareAt(cord){
    return(cord % 8 + Math.floor(cord / 8))%2;


}