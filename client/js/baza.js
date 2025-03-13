var getSqare = '<div id = "s$cord" class="sqare $color"></div>'
var getFigure = '<button id = "$cord" onclick ="$fGo(id,name)" class="figure chose $figure $rotate" name = "$color" ><img class = "size_figure" src="../client/images/$f$c.png" alt=""></button>'
var getVale = '<button id = "$cord" onclick ="hod(id, name)" name = "&figurecord" class = "vale" width: 80px; height: 80px;></button>'
var getСastling = '<button onclick ="castling(name)" name = "&figurecord" class = "vale" width: 80px; height: 80px;></button>'
var getSpawn = '<div class = "window"><button class="chose" id = "$id" color = "$color" name="k" onclick="$f"><img src="../client/images/k$c.png" height = 80px alt=""></button><button class="chose" id = "$id" color = "$color" name="s" onclick="$f"><img src="../client/images/s$c.png" height = 80px alt=""></button><button class="chose" id = "$id" color = "$color" name="l" onclick="$f"><img src="../client/images/l$c.png" height = 80px alt=""></button><button class="chose" id = "$id" color = "$color" name="q" onclick="$f"><img src="../client/images/q$c.png" height = 80px alt=""></button></div>'
const socket = io();
rotate = "none"
king_hod = 0
l_lade_hod = 0
r_lade_hod = 0
ID=0
hodColor = "white"
gameColor = 'none'
enemyColor = 'none'
gameEnd = "none"
let idTrue = false
let map = [
    ['l','k','s','q', 'kr','s', 'k','l'], 
    ['p','p','p','p', 'p', 'p', 'p','p'],
    ['0','0','0','0', '0', '0', '0','0'],
    ['0','0','0','0', '0', '0', '0','0'],
    ['0','0','0','0', '0', '0', '0','0'],
    ['0','0','0','0', '0', '0', '0','0'],
    ['P','P','P','P', 'P', 'P', 'P','P'],
    ['L','K','S','Q', 'KR','S', 'K','L']
]

$(function(){
    getTime()
})
function getTime(){
    if (idTrue == true){ 
        start()
    }   
    else{
        socket.emit('idGame')
        start()
    }
        
}

function start(){
    spawnSqare()
}

function spawnSqare(){
    $('.board').html('')
    for(y = 0; y<8; y++){
        for (x = 0; x<8; x++){
            $('.board').append(getSqare
                .replace('$cord', cord = ((y+1) * 10 + (x+1)))
                .replace('$color', isBlack(cord) ? 'black' : 'white') 
            )}
    }
}
function isBlack(cord){
    if (Math.floor(cord/10) % 2 == 0 && (cord%10) % 2 == 0){
        return(false);
    }
    else if(Math.floor(cord/10) % 2 != 0 && (cord%10) % 2 != 0){
        return(false);
    }
    else{
        return(true)
    }
}

function spawnFigure (map){
    $('.figure').remove()
    $('.window').remove()
    for(y = 0; y<8; y++){
        for(x=0; x<8; x++){
            
            if(map[y][x] =='l' || map[y][x] == 'L'){
                cord = (y+1)*10 + (x+1)
                
                $('#s' + cord).html(getFigure
                    .replace('$cord', cord)
                    .replace('$figure', 'lade')
                    .replace('$color', colorFigure(map[y][x]))
                    .replace('$f', 'l')
                    .replace('$f', 'l')
                    .replace('$c', colorFigure(map[y][x]))
                    .replace('$rotate', rotate)
                )
            }
            else if(map[y][x] =='k' || map[y][x] == 'K'){
                cord = (y+1)*10 + (x+1)
                
                $('#s' + cord).html(getFigure
                    .replace('$cord', cord)
                    .replace('$figure', 'pony')
                    .replace('$color', colorFigure(map[y][x]))
                    .replace('$f', 'k')
                    .replace('$f', 'k')
                    .replace('$c', colorFigure(map[y][x]))
                    .replace('$rotate', rotate)
                )
            }
            else if(map[y][x] =='q' || map[y][x] == 'Q'){
                cord = (y+1)*10 + (x+1)
                
                $('#s' + cord).html(getFigure
                    .replace('$cord', cord)
                    .replace('$figure', 'queen')
                    .replace('$color', colorFigure(map[y][x]))
                    .replace('$f', 'q')
                    .replace('$f', 'q')
                    .replace('$c', colorFigure(map[y][x]))
                    .replace('$rotate', rotate)
                )
            }
            else if(map[y][x] =='kr' || map[y][x] == 'KR'){
                cord = (y+1)*10 + (x+1)
                
                $('#s' + cord).html(getFigure
                    .replace('$cord', cord)
                    .replace('$figure', 'king')
                    .replace('$color', colorFigure(map[y][x]))
                    .replace('$f', 'kr')
                    .replace('$f', 'kr')
                    .replace('$c', colorFigure(map[y][x]))
                    .replace('$rotate', rotate)
                )
            }
            else if(map[y][x] =='p' || map[y][x] == 'P'){
                cord = (y+1)*10 + (x+1)
                
                $('#s' + cord).html(getFigure
                    .replace('$cord', cord)
                    .replace('$figure', 'pechka')
                    .replace('$color', colorFigure(map[y][x]))
                    .replace('$f', 'p')
                    .replace('$f', 'p')
                    .replace('$c', colorFigure(map[y][x]))
                    .replace('$rotate', rotate)
                )
            }
            else if(map[y][x] =='s' || map[y][x] == 'S'){
                cord = (y+1)*10 + (x+1)
                
                $('#s' + cord).html(getFigure
                    .replace('$cord', cord)
                    .replace('$figure', 'slon')
                    .replace('$f', 's')
                    .replace('$color', colorFigure(map[y][x]))
                    .replace('$f', 's')
                    .replace('$c', colorFigure(map[y][x]))
                    .replace('$rotate', rotate)
                )
            }
            else if(map[y][x] == '0'){

            }
        }
    }
}

function kGo(id, name){
    spawnFigure(map)
    $('.vale').remove()
    $('.window').remove()
    element = document.getElementById(id);
    element.classList.remove('chose')
    element.classList.toggle('figureChoes');
    let y = Math.floor(id/10)-1
    let x = id - (y+1)*10 - 1
    const moves = [
        [-2, -1], [-2, 1], 
        [-1, -2], [-1, 2], 
        [1, -2], [1, 2],  
        [2, -1], [2, 1]    
    ];
    if (name == gameColor && gameColor == hodColor && gameEnd != "yes"){
        if (name == 'white') {
        for (let move of moves) {
            let newY = y + move[0];
            let newX = x + move[1];
            if (newY >= 0 && newY < 8 && newX >= 0 && newX < 8) { 
                if (map[newY][newX] == '0') { 
                    let newId = (newY + 1) * 10 + (newX + 1);
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                } 
                else if (colorFigure(map[newY][newX]) == 'black') { 
                    let newId = (newY + 1) * 10 + (newX + 1);
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
            }
        }
        }
        else if (name == 'black') {
            for (let move of moves) {
                let newY = y + move[0];
                let newX = x + move[1];
                if (newY >= 0 && newY < 8 && newX >= 0 && newX < 8) { 
                    if (map[newY][newX] == '0') { 
                        let newId = (newY + 1) * 10 + (newX + 1);
                        if(imit(newId, id, map) != true){
                            $('#s' + newId).html(getVale
                                .replace('$cord', newId)
                                .replace('&figurecord', id));
                        }
                    }
                    else if (colorFigure(map[newY][newX]) == 'white') { 
                        let newId = (newY + 1) * 10 + (newX + 1);
                        if(imit(newId, id, map) != true){
                            $('#s' + newId).html(getVale
                                .replace('$cord', newId)
                                .replace('&figurecord', id));
                        }
                    }
                } 
            }
        }
    }    
}

function pGo(id, name){
    $('.vale').remove()
    $('.window').remove()
    spawnFigure(map)
    let y = Math.floor(id/10)-1 
    let x = id - (y+1)*10 - 1
    if (name == gameColor && gameColor == hodColor && gameEnd != "yes"){
        if (name == 'white') {
            if (map[y - 1][x] == '0' ) {
                let newId = id - 10;
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
            if (y == 6 && map[y - 1][x] == '0' && map[y - 2][x] == '0' ) {
                let newId = id - 20;
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
            if (x > 0 && map[y - 1][x - 1] != '0' && colorFigure(map[y - 1][x - 1]) == 'black')  {
                let newId = id - 11;
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
            if (x < 7 && map[y - 1][x + 1] != '0' && colorFigure(map[y - 1][x + 1]) == 'black') {
                let newId = id - 9;
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
        } 
        else if (name == 'black') {
            if (map[y + 1][x] == '0' ) {
                let newId = (y+1)*10 + x+1 + 10;
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
            if (y == 1 && map[y + 1][x] == '0' && map[y + 2][x] == '0') {
                let newId = (y+1)*10 + x+1 + 20;
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
            if (x > 0 && map[y + 1][x - 1] != '0' && colorFigure(map[y + 1][x - 1]) == 'white') {
                let newId = (y+1)*10 + x+1 + 9;
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
            if (x < 7 && map[y + 1][x + 1] != '0' && colorFigure(map[y + 1][x + 1]) == 'white') {
                let newId =(y+1)*10 + x+1 + 11;
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
        }
    }
}

function sGo (id, name){
    $('.vale').remove()
    $('.window').remove()
    spawnFigure(map)
    let y = Math.floor(id/10)-1 
    let x = id - (y+1)*10 - 1
    let a_stop = 0
    let b_stop = 0
    let c_stop = 0
    let d_stop = 0
    if (name == gameColor && gameColor == hodColor && gameEnd != "yes"){
        for(let i = 1; i<9; i++){
            if((y+i) <=7 && (x+i) <=7 && a_stop == 0){
                if(map[y+i][x+i] == '0'){
                    newId = (y+1+i)*10 + x+1+i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y+i][x+i]) != name && colorFigure(map[y+i][x+i]) != 'none')  {
                    newId = (y+1+i)*10 + x+1+i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        a_stop = 1
                    }
                }
                else if (colorFigure(map[y+i][x+i]) == name){
                    a_stop = 1
                }
                
            }
            if((y+i) <=7 && (x-i)>=0 && b_stop == 0){
                
                if(map[y+i][x-i] == '0'){
                    newId = (y+1+i)*10 + x+1-i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y+i][x-i]) != name && colorFigure(map[y+i][x-i]) != 'none'){
                    newId = (y+1+i)*10 + x+1-i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                            b_stop = 1
                    }
                }
                else if(colorFigure(map[y+i][x-i]) == name){
                    b_stop = 1
                }
                
            }
            if((y-i) >=0 && (x+i)<=7 && c_stop == 0 ){
                
                if(map[y-i][x+i] == '0'){
                    newId = (y+1-i)*10 + x+1+i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y-i][x+i]) != name && colorFigure(map[y-i][x+i]) != 'none' ){
                    newId = (y+1-i)*10 + x+1+i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        c_stop =1
                    }
                }
                else if(colorFigure(map[y-i][x+i]) == name){
                    c_stop = 1
                }
                
            }
            if((y-i) >=0 && (x-i) >=0 && d_stop == 0){
                if(map[y-i][x-i] == '0' ){
                    newId = (y+1-i)*10 + x+1-i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
               else if(colorFigure(map[y-i][x-i]) != name && colorFigure(map[y-i][x-i]) != 'none' ){
                    newId = (y+1-i)*10 + x+1-i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        d_stop = 1
                    }
                }
                else if(colorFigure(map[y-i][x-i]) == name){
                    d_stop = 1
                }
            }
        }
    }
   
}
function lGo(id, name){
    $('.vale').remove()
    $('.window').remove()
    spawnFigure(map)
    let y = Math.floor(id/10)-1 
    let x = id - (y+1)*10 - 1
    let a_stop = 0
    let b_stop = 0
    let c_stop = 0
    let d_stop = 0
    if (name == gameColor && gameColor == hodColor && gameEnd != "yes"){
        for(let i = 1; i <9; i++){
            if ((y+i) <=7 && a_stop == 0){
                if(map[y+i][x] == '0' ){
                    newId = (y+1+i)*10 + x+1
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y+i][x]) != name && colorFigure(map[y+i][x]) != 'none' ){
                    newId = (y+1+i)*10 + x+1
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        a_stop = 1
                    }
                }
                else if(colorFigure(map[y+i][x]) == name){
                    a_stop = 1
                }
    
            }
            if ((y-i) >= 0 && b_stop == 0){
                if(map[y-i][x] == '0'){
                    newId = (y+1-i)*10 + x+1
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y-i][x]) != name && colorFigure(map[y-i][x]) != 'none' ){
                    newId = (y+1-i)*10 + x+1
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        b_stop = 1
                    }
                }
                else if(colorFigure(map[y-i][x]) == name){
                    b_stop = 1
                }
    
            }
            if ((x+1) <=7 && c_stop == 0){
                if(map[y][x+i] == '0'){
                    newId = (y+1)*10 + x+1+i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y][x+i]) != name && colorFigure(map[y][x+i]) != 'none' ){
                    newId = (y+1)*10 + x+1+i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        c_stop = 1
                    }
                }
                else if(colorFigure(map[y][x+i]) == name){
                    c_stop = 1
                }
            }
            if ((x-i) >= 0 && d_stop == 0){
                if(map[y][x-i] == '0'){
                    newId = (y+1)*10 + x+1-i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y][x-i]) != name && colorFigure(map[y][x-i]) != 'none' ){
                    newId = (y+1)*10 + x+1-i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        d_stop = 1
                    }
                }
                else if(colorFigure(map[y][x-i]) == name){
                    d_stop = 1
                }
    
            }
        }
    }
    
}
function qGo(id, name){
    $('.vale').remove()
    $('.window').remove()
    spawnFigure(map)
    let y = Math.floor(id/10)-1 
    let x = id - (y+1)*10 - 1
    let a_stop = 0
    let b_stop = 0
    let c_stop = 0
    let d_stop = 0
    let i_stop = 0
    let g_stop = 0
    let f_stop = 0
    let r_stop = 0
    if (name == gameColor && gameColor == hodColor && gameEnd != "yes"){
        for(let i = 1; i<9; i++){
            if ((y+i) <=7 && i_stop == 0){
                if(map[y+i][x] == '0'){
                    newId = (y+1+i)*10 + x+1
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y+i][x]) != name && colorFigure(map[y+i][x]) != 'none' ){
                    newId = (y+1+i)*10 + x+1
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        i_stop = 1
                    }
                }
                else if(colorFigure(map[y+i][x]) == name){
                    i_stop = 1
                }
    
            }
            if ((y-i) >= 0 && g_stop == 0){
                if(map[y-i][x] == '0'){
                    newId = (y+1-i)*10 + x+1
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y-i][x]) != name && colorFigure(map[y-i][x]) != 'none' ){
                    newId = (y+1-i)*10 + x+1
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        g_stop = 1
                    }
                }
                else if(colorFigure(map[y-i][x]) == name){
                    g_stop = 1
                }
    
            }
            if ((x+1) <=7 && f_stop == 0){
                if(map[y][x+i] == '0'){
                    newId = (y+1)*10 + x+1+i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y][x+i]) != name && colorFigure(map[y][x+i]) != 'none' ){
                    newId = (y+1)*10 + x+1+i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        f_stop = 1
                    }
                }
                else if(colorFigure(map[y][x+i]) == name){
                    f_stop = 1
                }
            }
            if ((x-i) >= 0 && r_stop == 0){
                if(map[y][x-i] == '0'){
                    newId = (y+1)*10 + x+1-i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y][x-i]) != name && colorFigure(map[y][x-i]) != 'none' ){
                    newId = (y+1)*10 + x+1-i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        r_stop = 1
                    }
                }
                else if(colorFigure(map[y][x-i]) == name){
                    r_stop = 1
                }
    
            }
            if((y+i) <=7 && (x+i) <=7 && a_stop == 0){
                
                if(map[y+i][x+i] == '0' ){
                    newId = (y+1+i)*10 + x+1+i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y+i][x+i]) != name && colorFigure(map[y+i][x+i]) != 'none')  {
                    newId = (y+1+i)*10 + x+1+i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        a_stop = 1
                    }
                }
                else if (colorFigure(map[y+i][x+i]) == name){
                    a_stop = 1
                }
                
            }
            if((y+i) <=7 && (x-i)>=0 && b_stop == 0){
                
                if(map[y+i][x-i] == '0' ){
                    newId = (y+1+i)*10 + x+1-i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y+i][x-i]) != name && colorFigure(map[y+i][x-i]) != 'none'){
                    newId = (y+1+i)*10 + x+1-i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        b_stop = 1
                    }
                }
                else if(colorFigure(map[y+i][x-i]) == name){
                    b_stop = 1
                }
                
            }
            if((y-i) >=0 && (x+i)<=7 && c_stop == 0 ){
                
                if(map[y-i][x+i] == '0'){
                    newId = (y+1-i)*10 + x+1+i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
                else if(colorFigure(map[y-i][x+i]) != name && colorFigure(map[y-i][x+i]) != 'none'){
                    newId = (y+1-i)*10 + x+1+i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        c_stop = 1
                    }
                }
                else if(colorFigure(map[y-i][x+i]) == name){
                    c_stop = 1
                }
                
            }
            if((y-i) >=0 && (x-i) >=0 && d_stop == 0){
                
                if(map[y-i][x-i] == '0' ){
                    newId = (y+1-i)*10 + x+1-i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                    }
                }
               else if(colorFigure(map[y-i][x-i]) != name && colorFigure(map[y-i][x-i]) != 'none'){
                    newId = (y+1-i)*10 + x+1-i
                    if(imit(newId, id, map) != true){
                        $('#s' + newId).html(getVale
                            .replace('$cord', newId)
                            .replace('&figurecord', id));
                        d_stop = 1
                    }
                }
                else if(colorFigure(map[y-i][x-i]) == name){
                    d_stop = 1
                }
            }
        }
    }
}
function krGo(id , name){
    $('.vale').remove()
    $('.window').remove()
    spawnFigure(map)
    let y = Math.floor(id/10)-1 
    let x = id - (y+1)*10 - 1
    i = 1
    if (name == gameColor && gameColor == hodColor && gameEnd != "yes"){
        if ((y+i) <=7){
            if(map[y+i][x] == '0'){
                newId = (y+1+i)*10 + x+1
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
            else if(colorFigure(map[y+i][x]) != name && colorFigure(map[y+i][x]) != 'none' ){
                newId = (y+1+i)*10 + x+1
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
        }
        if ((y-i) >= 0 ){
            if(map[y-i][x] == '0'){
                newId = (y+1-i)*10 + x+1
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
            else if(colorFigure(map[y-i][x]) != name && colorFigure(map[y-i][x]) != 'none' ){
                newId = (y+1-i)*10 + x+1
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
        }
        if ((x+i) <=7 ){
            if(map[y][x+i] == '0'){
                newId = (y+i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
            else if(colorFigure(map[y][x+i]) != name && colorFigure(map[y][x+i]) != 'none' ){
                newId = (y+i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
        }
        if ((x-i) >= 0){
            if(map[y][x-i] == '0'){
                newId = (y+1)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
            else if(colorFigure(map[y][x-i]) != name && colorFigure(map[y][x-i]) != 'none' ){
                newId = (y+i)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
        }
        if((y+i) <=7 && (x+i) <=7){
            if(map[y+i][x+i] == '0' ){
                newId = (y+1+i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
            else if(colorFigure(map[y+i][x+i]) != name && colorFigure(map[y+i][x+i]) != 'none')  {
                newId = (y+1+i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
        }
        if((y+i) <=7 && (x-i)>=0){
            if(map[y+i][x-i] == '0' ){
                newId = (y+1+i)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
            else if(colorFigure(map[y+i][x-i]) != name && colorFigure(map[y+i][x-i]) != 'none'){
                newId = (y+1+i)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
    
            }
        }
        if((y-i) >=0 && (x+i)<=7){
            if(map[y-i][x+i] == '0' ){
                newId = (y+1-i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
            else if(colorFigure(map[y-i][x+i]) != name && colorFigure(map[y-i][x+i]) != 'none'){
                newId = (y+1-i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            } 
        }
        if((y-i) >=0 && (x-i) >=0 ){
            if(map[y-i][x-i] == '0' ){
                newId = (y+1-i)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
           else if(colorFigure(map[y-i][x-i]) != name && colorFigure(map[y-i][x-i]) != 'none'){
                newId = (y+1-i)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    $('#s' + newId).html(getVale
                        .replace('$cord', newId)
                        .replace('&figurecord', id));
                }
            }
        }
        if (king_hod == 0 && l_lade_hod == 0){
            if(map[y][x+1] == "0" && map[y][x+2] == "0" && isCheck(map, gameColor) != true){
                map1 = JSON.parse(JSON.stringify(map))
                if (gameColor == "white"){
                    map1[7][7] = "0"
                    map1[7][6] = "KR"
                    map1[7][5] = "L"
                    map1[7][4] = "0"
                    if(isCheck(map1, gameColor) != true){
                        newId = (y+1)*10 + x +3
                        $('#s' + newId).html(getСastling
                            .replace('&figurecord', "left"));
                    }
                }
                else{
                    map1[0][7] = "0"
                    map1[0][6] = "kr"
                    map1[0][5] = "l"
                    map1[0][4] = "0"
                    if(isCheck(map1, gameColor) != true){
                        newId = (y+1)*10 + x +3
                        $('#s' + newId).html(getСastling
                            .replace('&figurecord', "left"));
                    }
                }
            }
        }
        if (king_hod == 0 && r_lade_hod == 0){
            if(map[y][x-1] == "0" && map[y][x-2] == "0" && map[y][x-3] == "0" && isCheck(map, gameColor) != true){
                map1 = JSON.parse(JSON.stringify(map))
                if (gameColor == "white"){
                    map1[7][0] = "0"
                    map1[7][1] = "0"
                    map1[7][2] = "KR"
                    map1[7][3] = "L"
                    map1[7][4] = "0"
                    if(isCheck(map1, gameColor) != true){
                        newId = (y+1)*10 + x -1
                        $('#s' + newId).html(getСastling
                            .replace('&figurecord', "right"));
                    }
                }
                else{
                    map1[0][0] = "0"
                    map1[0][1] = "0"
                    map1[0][2] = "kr"
                    map1[0][3] = "l"
                    map1[0][4] = "0"
                    if(isCheck(map1, gameColor) != true){
                        newId = (y+1)*10 + x -1
                        $('#s' + newId).html(getСastling
                            .replace('&figurecord', "right"));
                    }
                }
            }
        }
    }
}

function imit(Id, fcord, map){
    console.log("imit")
    fmap = JSON.parse(JSON.stringify(map))
    yf = Math.floor(fcord/10) -1
    xf = fcord - ((yf+1)*10) - 1
    yid = Math.floor(Id/10) -1
    xid = Id - ((yid+1)*10) - 1
    f = fmap[yf][xf]
    fmap[yf][xf] = '0'
    fmap[yid][xid] = f
    if (isCheck(fmap, gameColor)==true){
        fmap=0
        return true
    }
    else{
        fmap=0
        return false
    }

}

function hod(id, figurecord){
    yf = Math.floor(figurecord/10) -1
    xf = figurecord - ((yf+1)*10) - 1
    yid = Math.floor(id/10) -1
    xid = id - ((yid+1)*10) - 1
    f = map[yf][xf]
    $('.window').remove()
    if((f=='p' || f == 'P')&&( yid == 7 || yid == 0)){
        let color = colorFigure(map[yf][xf])
        $('#ocno').append(getSpawn
            .replace('$id', id)
            .replace('$id', id)
            .replace('$id', id)
            .replace('$id', id)
            .replace('$color', colorFigure(map[yf][xf]))
            .replace('$color', colorFigure(map[yf][xf]))
            .replace('$color', colorFigure(map[yf][xf]))
            .replace('$color', colorFigure(map[yf][xf]))
            .replace('$c', colorFigure(map[yf][xf]))
            .replace('$c', colorFigure(map[yf][xf]))
            .replace('$c', colorFigure(map[yf][xf]))
            .replace('$c', colorFigure(map[yf][xf]))
            .replace('$f', "choseFigure(id, name, " + "'" + color + "'," + figurecord + ")")
            .replace('$f', "choseFigure(id, name, " + "'" + color + "'," + figurecord + ")")
            .replace('$f', "choseFigure(id, name, " + "'" + color + "'," + figurecord + ")")
            .replace('$f', "choseFigure(id, name, " + "'" + color + "'," + figurecord + ")"))
    }
    else{
        map[yf][xf] = '0'
        map[yid][xid] = f
        if (f == changeName("kr", gameColor)){
            king_hod = 1
        }
        if (f == changeName("l", gameColor) && xf == 0){
            l_lade_hod = 1
        }
        if (f == changeName("l", gameColor) && xf == 7){
            r_lade_hod = 1
        }
        console.log(f, yf, xf, yid, xid)
        $('.vale').remove()
        spawnFigure(map)
        socket.emit('move', map, ID, hodColor);
        
    }
}
function castling(side){
    if (side == "left"){
        if (gameColor == "white"){
            map[7][7] = "0"
            map[7][6] = "KR"
            map[7][5] = "L"
            map[7][4] = "0"
            $('.vale').remove()
            spawnFigure(map)
            socket.emit('move', map, ID, hodColor)
        }
        else{
            map[0][7] = "0"
            map[0][6] = "kr"
            map[0][5] = "l"
            map[0][4] = "0"
            $('.vale').remove()
            spawnFigure(map)
            socket.emit('move', map, ID, hodColor)
        }
    }
    else{
        if (gameColor == "white"){
            map[7][0] = "0"
            map[7][1] = "0"
            map[7][2] = "KR"
            map[7][3] = "L"
            map[7][4] = "0"
            $('.vale').remove()
            spawnFigure(map)
            socket.emit('move', map, ID, hodColor)
        }
        else{
            map[0][0] = "0"
            map[0][1] = "0"
            map[0][2] = "kr"
            map[0][3] = "l"
            map[0][4] = "0"
            $('.vale').remove()
            spawnFigure(map)
            socket.emit('move', map, ID, hodColor)
        }
    }
}
function choseFigure(id, name, color, figurecord){
    yf = Math.floor(figurecord/10) -1
    xf = figurecord - ((yf+1)*10) - 1
    yid = Math.floor(id/10) -1
    xid = id - ((yid+1)*10) - 1
    f = changeName(name, color)
    map[yf][xf] = '0'
    map[yid][xid] = f
    socket.emit('move', map, ID, hodColor);
    spawnFigure(map)
}
function isCheck(map, kingColor) {
    let kingPosition = findKr(map, kingColor);
    if (!kingPosition) return false;

    let [kingY, kingX] = kingPosition;

    if (checkLQ(map, kingY, kingX)) return true;

    if (checkSQ(map, kingY, kingX)) return true;

    if (checkK(map, kingY, kingX)) return true;

    if (checkP(map, kingY, kingX)) return true;

    if (checkKr(map, kingY, kingX)) return true;

    return false;
}
function checkLQ(map, kingY, kingX){

    a = 0
    b = 0
    c = 0
    d = 0
    for (let i = 1; i < 8; i++){
        if(a !=1){
            if ( (kingY - i) >=0 ){
                if(map[kingY - i][kingX] == changeName("l", enemyColor) || map[kingY - i][kingX] == changeName("q", enemyColor)){
                    return true  
                }
                else if ((kingY - i) >=0 && (map[kingY - i][kingX] == "0") ){

                }
                else {
                   a = 1 
                }     
            }
        }
        
        if( b !=1){
            if ( (kingX - i) >=0){
                if (map[kingY][kingX-i] == changeName("l", enemyColor) || map[kingY][kingX-i] == changeName("q", enemyColor)){
                    return true  
                }
                else if ((kingX - i) >=0 &&(map[kingY][kingX-i] == "0") ){
                }
                else{
                    b = 1
                }
            }
        }
        if( c !=1){
            if ( (kingY + i) <=7){
                if(map[kingY+i][kingX] == changeName("l", enemyColor) || map[kingY+i][kingX] == changeName("q", enemyColor)){
                    return true
                }
                else if ((kingY + i) <=7 &&(map[kingY+i][kingX] == "0") ){
                }
                else{
                    c = 1
                }
            }
        }
        if( d !=1){
            if ((kingX + i) <=7){
                if (map[kingY][kingX+y] == changeName("l", enemyColor) || map[kingY][kingX+i] == changeName("q", enemyColor)){
                    return true    
                }
                else if ((kingX + i) <=7 &&(map[kingY][kingX+i] == "0") ){
                }
                else{
                    d = 1
                }
            }
        }
    }

}
function checkSQ(map, kingY, kingX){
    a = 0
    b = 0
    c = 0
    d = 0
    for (let i = 1; i < 8; i++){
        if (a == 0){
            if((kingY + i) <=7  && (kingX +i) <= 7){
                if (map[kingY +i][kingX +i] == changeName("s", enemyColor) || map[kingY +i][kingX +i] == changeName("q", enemyColor)){
                    return true
                }
                else if ((kingY + i) <=7 && (kingX +i) <= 7 && (map[kingY +i][kingX +i] == "0")){
                }
                else{
                    a = 1
                }
            }
        }
        if (b == 0){
            if((kingY + i) <=7 && (kingX -i) >=0){
                if (map[kingY +i][kingX -i] == changeName("s", enemyColor) || map[kingY +i][kingX -i] == changeName("q", enemyColor)){
                    return true
                }
                else if ((kingY + i) <=7 && (kingX -i) >=0 && (map[kingY +i][kingX -i] == "0")){
                }
                else{
                    b =1
                }
            }
        }
        if (c == 0){
            if((kingY -i) >=0 && (kingX +i) <= 7){
                if (map[kingY -i][kingX +i] == changeName("s", enemyColor) || map[kingY -i][kingX +i] == changeName("q", enemyColor)){
                    return true
                }
                else if ((kingY -i) >=0 && (kingX +i) <= 7 && (map[kingY -i][kingX +i] == "0")){
                }
                else{
                    c =1
                } 
            }
        }
        if (d == 0){
            if((kingY -i) >=0 && (kingX -i) >=0){
                if(map[kingY -i][kingX -i] == changeName("s", enemyColor) || map[kingY -i][kingX -i] == changeName("q", enemyColor)){
                    return true
                }
                else if ((kingY -i) >=0 && (kingX -i) >= 0 && (map[kingY -i][kingX -i] == "0")){
                }
                else{
                    d =1
                }
            }
        }
    }
}
function checkK(map, kingY, kingX){
    moves = [
        [-2, -1], [-2, 1], 
        [-1, -2], [-1, 2], 
        [1, -2], [1, 2],  
        [2, -1], [2, 1]    
    ]
    for (move of moves){
        if ((kingY +move[0]) >=0 && (kingY +move[0]) <=7 && (kingX +move[1]) >=0 && (kingX +move[1]) <=7){
            if  (map[kingY +move[0]][kingX +move[1]] == changeName("k", enemyColor)){
                return true
            }
        }
    }
}
function checkP(map, kingY, kingX){
    moves = [
        [-1,-1], [-1,1],
        [1,-1], [1, -1]
    ]
    for (move of moves){
        if ((kingY +move[0]) >=0 && (kingY +move[0]) <=7 && (kingX +move[1]) >=0 && (kingX +move[1]) <=7){
            if  (map[kingY +move[0]][kingX +move[1]] == changeName("p", enemyColor)){
                return true
            }
        }
    }
}
function checkKr(map, kingY, kingX){
    moves =[
        [1,1], [1,-1], [1,0],
        [0,1],[0,-1],
        [-1,1],[-1,0],[-1,-1]

    ]
    for (move of moves){
        if ((kingY +move[0]) >=0 && (kingY +move[0]) <=7 && (kingX +move[1]) >=0 && (kingX +move[1]) <=7){
            if  (map[kingY +move[0]][kingX +move[1]] == changeName("kr", enemyColor)){
                return true
            }
        }
    }
}
function findKr(map, kingColor) {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (map[y][x] === (kingColor === 'white' ? 'KR' : 'kr')) {
                return [y, x];
            }
        }
    }
    return null;
}
function changeName(name, color){
    if(color == 'black'){
        switch(name){
            case 's' : return 's'
            case 'S' : return 's'
            case 'l' : return 'l'
            case 'L' : return 'l'
            case 'kr' : return 'kr'
            case 'Kr' : return 'kr'
            case 'q' : return 'q'
            case 'Q' : return 'q'
            case 'p' : return 'p'
            case 'P' : return 'p'
            case 'k' : return 'k'
            case 'K' : return 'k'
        }
        
    }
    if(color == 'white'){
        switch(name){
            case 's' : return 'S'
            case 'S' : return 'S'
            case 'l' : return 'L'
            case 'L' : return 'L'
            case 'kr' : return 'KR'
            case 'Kr' : return 'KR'
            case 'q' : return 'Q'
            case 'Q' : return 'Q'
            case 'p' : return 'P'
            case 'P' : return 'P'
            case 'k' : return 'K'
            case 'K' : return 'K'
        }
        
    }
}
function checkMate(){
    for (y =0;y<=7;y++){
        for (x =0; x<=7; x++){
            id = (y+1)*10 +x +1
            if ((map[y][x] == "p" || map[y][x] == "P") && gameColor == colorFigure(map[y][x])){
                if (pCheck(id, gameColor)) return true
            }
            else if ((map[y][x] == "K" || map[y][x] == "k") && gameColor == colorFigure(map[y][x])){
                if (kCheck(id, gameColor)) return true
            }
            else if ((map[y][x] == "l" || map[y][x] == "L") && gameColor == colorFigure(map[y][x])){
                if (lCheck(id, gameColor)) return true
            }
            else if ((map[y][x] == "s" || map[y][x] == "S") && gameColor == colorFigure(map[y][x])){
                if (sCheck(id, gameColor)) return true
            }
            else if ((map[y][x] == "q" || map[y][x] == "Q") && gameColor == colorFigure(map[y][x])){
                if (qCheck(id, gameColor)) return true
            }
            else if ((map[y][x] == "kr" || map[y][x] == "KR") && gameColor == colorFigure(map[y][x])){
                if (krCheck(id, gameColor)) return true
            }
            else{

            }
        }
    }
}
function pCheck(id, name){
    let y = Math.floor(id/10)-1 
    let x = id - (y+1)*10 - 1
    if (name == 'white') {
        if (map[y - 1][x] == '0' ) {
            let newId = id - 10;
            if(imit(newId, id, map) != true){
                return true
            }
        }
        if (y == 6 && map[y - 1][x] == '0' && map[y - 2][x] == '0' ) {
            let newId = id - 20;
            if(imit(newId, id, map) != true){
                return true
            }
        }
        if (x > 0 && map[y - 1][x - 1] != '0' && colorFigure(map[y - 1][x - 1]) == 'black')  {
            let newId = id - 11;
            if(imit(newId, id, map) != true){
                return true
            }
        }
        if (x < 7 && map[y - 1][x + 1] != '0' && colorFigure(map[y - 1][x + 1]) == 'black') {
            let newId = id - 9;
            if(imit(newId, id, map) != true){
                return true
            }
        }
    } 
    else if (name == 'black') {
        if (map[y + 1][x] == '0' ) {
            let newId = (y+1)*10 + x+1 + 10;
            if(imit(newId, id, map) != true){
                return true
            }
        }
        if (y == 1 && map[y + 1][x] == '0' && map[y + 2][x] == '0') {
            let newId = (y+1)*10 + x+1 + 20;
            if(imit(newId, id, map) != true){
                return true
            }
        }
        if (x > 0 && map[y + 1][x - 1] != '0' && colorFigure(map[y + 1][x - 1]) == 'white') {
            let newId = (y+1)*10 + x+1 + 9;
            if(imit(newId, id, map) != true){
                return true
            }
        }
        if (x < 7 && map[y + 1][x + 1] != '0' && colorFigure(map[y + 1][x + 1]) == 'white') {
            let newId =(y+1)*10 + x+1 + 11;
            if(imit(newId, id, map) != true){
                return true
            }
        }
    }
}
function kCheck(id, name){
    let y = Math.floor(id/10)-1
    let x = id - (y+1)*10 - 1
    const moves = [
        [-2, -1], [-2, 1], 
        [-1, -2], [-1, 2], 
        [1, -2], [1, 2],  
        [2, -1], [2, 1]    
    ];
    if (name == 'white') {
        for (let move of moves) {
            let newY = y + move[0];
            let newX = x + move[1];
            if (newY >= 0 && newY < 8 && newX >= 0 && newX < 8) { 
                if (map[newY][newX] == '0') { 
                    let newId = (newY + 1) * 10 + (newX + 1);
                    if(imit(newId, id, map) != true){
                        return true
                    }
                } 
                else if (colorFigure(map[newY][newX]) == 'black') { 
                    let newId = (newY + 1) * 10 + (newX + 1);
                    if(imit(newId, id, map) != true){
                        return true
                    }
                }
            }
        }
    }
    else if (name == 'black') {
        for (let move of moves) {
            let newY = y + move[0];
            let newX = x + move[1];
            if (newY >= 0 && newY < 8 && newX >= 0 && newX < 8) { 
                if (map[newY][newX] == '0') { 
                    let newId = (newY + 1) * 10 + (newX + 1);
                    if(imit(newId, id, map) != true){
                        return true
                    }
                }
                else if (colorFigure(map[newY][newX]) == 'white') { 
                    let newId = (newY + 1) * 10 + (newX + 1);
                    if(imit(newId, id, map) != true){
                        return true
                    }
                }
            } 
        }
    }
}
function lCheck(id, name){
    let y = Math.floor(id/10)-1 
    let x = id - (y+1)*10 - 1
    let a_stop = 0
    let b_stop = 0
    let c_stop = 0
    let d_stop = 0
    for(let i = 1; i <9; i++){
        if ((y+i) <=7 && a_stop == 0){
            if(map[y+i][x] == '0' ){
                newId = (y+1+i)*10 + x+1
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y+i][x]) != name && colorFigure(map[y+i][x]) != 'none' ){
                newId = (y+1+i)*10 + x+1
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y+i][x]) == name){
                a_stop = 1
            }
        }
        if ((y-i) >= 0 && b_stop == 0){
            if(map[y-i][x] == '0'){
                newId = (y+1-i)*10 + x+1
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y-i][x]) != name && colorFigure(map[y-i][x]) != 'none' ){
                newId = (y+1-i)*10 + x+1
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y-i][x]) == name){
                b_stop = 1
            }
        }
        if ((x+1) <=7 && c_stop == 0){
            if(map[y][x+i] == '0'){
                newId = (y+1)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y][x+i]) != name && colorFigure(map[y][x+i]) != 'none' ){
                newId = (y+1)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y][x+i]) == name){
                c_stop = 1
            }
        }
        if ((x-i) >= 0 && d_stop == 0){
            if(map[y][x-i] == '0'){
                newId = (y+1)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    return true                  
                }
            }
            else if(colorFigure(map[y][x-i]) != name && colorFigure(map[y][x-i]) != 'none' ){
                newId = (y+1)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y][x-i]) == name){
                d_stop = 1
            }
        }
    }
}
function sCheck(id, name){
    let y = Math.floor(id/10)-1 
    let x = id - (y+1)*10 - 1
    let a_stop = 0
    let b_stop = 0
    let c_stop = 0
    let d_stop = 0
    for(let i = 1; i<9; i++){
        if((y+i) <=7 && (x+i) <=7 && a_stop == 0){
            if(map[y+i][x+i] == '0'){
                newId = (y+1+i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y+i][x+i]) != name && colorFigure(map[y+i][x+i]) != 'none')  {
                newId = (y+1+i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if (colorFigure(map[y+i][x+i]) == name){
                a_stop = 1
            }  
        }
        if((y+i) <=7 && (x-i)>=0 && b_stop == 0){     
            if(map[y+i][x-i] == '0'){
                newId = (y+1+i)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y+i][x-i]) != name && colorFigure(map[y+i][x-i]) != 'none'){
                newId = (y+1+i)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y+i][x-i]) == name){
                b_stop = 1
            }     
        }
        if((y-i) >=0 && (x+i)<=7 && c_stop == 0 ){     
            if(map[y-i][x+i] == '0'){
                newId = (y+1-i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y-i][x+i]) != name && colorFigure(map[y-i][x+i]) != 'none' ){
                newId = (y+1-i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y-i][x+i]) == name){
                c_stop = 1
            }   
        }
        if((y-i) >=0 && (x-i) >=0 && d_stop == 0){
            if(map[y-i][x-i] == '0' ){
                newId = (y+1-i)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y-i][x-i]) != name && colorFigure(map[y-i][x-i]) != 'none' ){
                newId = (y+1-i)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y-i][x-i]) == name){
                d_stop = 1
            }
        }
    }
}
function qCheck(id,name){
    let y = Math.floor(id/10)-1 
    let x = id - (y+1)*10 - 1
    let a_stop = 0
    let b_stop = 0
    let c_stop = 0
    let d_stop = 0
    let i_stop = 0
    let g_stop = 0
    let f_stop = 0
    let r_stop = 0
    for(let i = 1; i<9; i++){
        if ((y+i) <=7 && i_stop == 0){
            if(map[y+i][x] == '0'){
                newId = (y+1+i)*10 + x+1
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y+i][x]) != name && colorFigure(map[y+i][x]) != 'none' ){
                newId = (y+1+i)*10 + x+1
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y+i][x]) == name){
                i_stop = 1
            }

        }
        if ((y-i) >= 0 && g_stop == 0){
            if(map[y-i][x] == '0'){
                newId = (y+1-i)*10 + x+1
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y-i][x]) != name && colorFigure(map[y-i][x]) != 'none' ){
                newId = (y+1-i)*10 + x+1
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y-i][x]) == name){
                g_stop = 1
            }

        }
        if ((x+1) <=7 && f_stop == 0){
            if(map[y][x+i] == '0'){
                newId = (y+1)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y][x+i]) != name && colorFigure(map[y][x+i]) != 'none' ){
                newId = (y+1)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y][x+i]) == name){
                f_stop = 1
            }
        }
        if ((x-i) >= 0 && r_stop == 0){
            if(map[y][x-i] == '0'){
                newId = (y+1)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y][x-i]) != name && colorFigure(map[y][x-i]) != 'none' ){
                newId = (y+1)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y][x-i]) == name){
                r_stop = 1
            }

        }
        if((y+i) <=7 && (x+i) <=7 && a_stop == 0){
            
            if(map[y+i][x+i] == '0' ){
                newId = (y+1+i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y+i][x+i]) != name && colorFigure(map[y+i][x+i]) != 'none')  {
                newId = (y+1+i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if (colorFigure(map[y+i][x+i]) == name){
                a_stop = 1
            }
            
        }
        if((y+i) <=7 && (x-i)>=0 && b_stop == 0){
            
            if(map[y+i][x-i] == '0' ){
                newId = (y+1+i)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y+i][x-i]) != name && colorFigure(map[y+i][x-i]) != 'none'){
                newId = (y+1+i)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y+i][x-i]) == name){
                b_stop = 1
            }
            
        }
        if((y-i) >=0 && (x+i)<=7 && c_stop == 0 ){
            
            if(map[y-i][x+i] == '0'){
                newId = (y+1-i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y-i][x+i]) != name && colorFigure(map[y-i][x+i]) != 'none'){
                newId = (y+1-i)*10 + x+1+i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y-i][x+i]) == name){
                c_stop = 1
            }
            
        }
        if((y-i) >=0 && (x-i) >=0 && d_stop == 0){
            
            if(map[y-i][x-i] == '0' ){
                newId = (y+1-i)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
           else if(colorFigure(map[y-i][x-i]) != name && colorFigure(map[y-i][x-i]) != 'none'){
                newId = (y+1-i)*10 + x+1-i
                if(imit(newId, id, map) != true){
                    return true
                }
            }
            else if(colorFigure(map[y-i][x-i]) == name){
                d_stop = 1
            }
        }
    }
}
function krCheck(id, name){
    let y = Math.floor(id/10)-1 
    let x = id - (y+1)*10 - 1
    i = 1
    if ((y+i) <=7){
        if(map[y+i][x] == '0'){
            newId = (y+1+i)*10 + x+1
            if(imit(newId, id, map) != true){
               return true
            }
        }
        else if(colorFigure(map[y+i][x]) != name && colorFigure(map[y+i][x]) != 'none' ){
            newId = (y+1+i)*10 + x+1
            if(imit(newId, id, map) != true){
                return true
            }
        }
    }
    if ((y-i) >= 0 ){
        if(map[y-i][x] == '0'){
            newId = (y+1-i)*10 + x+1
            if(imit(newId, id, map) != true){
                return true
            }
        }
        else if(colorFigure(map[y-i][x]) != name && colorFigure(map[y-i][x]) != 'none' ){
            newId = (y+1-i)*10 + x+1
            if(imit(newId, id, map) != true){
                return true
            }
        }
    }
    if ((x+i) <=7 ){
        if(map[y][x+i] == '0'){
            newId = (y+i)*10 + x+1+i
            if(imit(newId, id, map) != true){
                return true
            }
        }
        else if(colorFigure(map[y][x+i]) != name && colorFigure(map[y][x+i]) != 'none' ){
            newId = (y+i)*10 + x+1+i
            if(imit(newId, id, map) != true){
                return true
            }
        }
    }
    if ((x-i) >= 0){
        if(map[y][x-i] == '0'){
            newId = (y+1)*10 + x+1-i
            if(imit(newId, id, map) != true){
                return true
            }
        }
        else if(colorFigure(map[y][x-i]) != name && colorFigure(map[y][x-i]) != 'none' ){
            newId = (y+i)*10 + x+1-i
            if(imit(newId, id, map) != true){
                return true
            }
        }
    }
    if((y+i) <=7 && (x+i) <=7){
        if(map[y+i][x+i] == '0' ){
            newId = (y+1+i)*10 + x+1+i
            if(imit(newId, id, map) != true){
                return true
            }
        }
        else if(colorFigure(map[y+i][x+i]) != name && colorFigure(map[y+i][x+i]) != 'none')  {
            newId = (y+1+i)*10 + x+1+i
            if(imit(newId, id, map) != true){
                return true
            }
        }
    }
    if((y+i) <=7 && (x-i)>=0){
        if(map[y+i][x-i] == '0' ){
            newId = (y+1+i)*10 + x+1-i
            if(imit(newId, id, map) != true){
                return true
            }
        }
        else if(colorFigure(map[y+i][x-i]) != name && colorFigure(map[y+i][x-i]) != 'none'){
            newId = (y+1+i)*10 + x+1-i
            if(imit(newId, id, map) != true){
                return true
            }

        }
    }
    if((y-i) >=0 && (x+i)<=7){
        if(map[y-i][x+i] == '0'){
            newId = (y+1-i)*10 + x+1+i
            if(imit(newId, id, map) != true){
                return true
            }
        }
        else if(colorFigure(map[y-i][x+i]) != name && colorFigure(map[y-i][x+i]) != 'none'){
            newId = (y+1-i)*10 + x+1+i
            if(imit(newId, id, map) != true){
                return true
            }
        }
 
    }
    if((y-i) >=0 && (x-i) >=0 ){
        if(map[y-i][x-i] == '0' ){
            newId = (y+1-i)*10 + x+1-i
            if(imit(newId, id, map) != true){
                return true
            }
        }
       else if(colorFigure(map[y-i][x-i]) != name && colorFigure(map[y-i][x-i]) != 'none'){
            newId = (y+1-i)*10 + x+1-i
            if(imit(newId, id, map) != true){
                return true
            }

        }
    }
}
function colorFigure(f){
    if(f == 'l' || f == 'k' || f == 's' || f == 'q' || f =='p' || f == 'kr'){
        return('black')
    }
    else if(f == '0'){
        return("none")
    }
    else{
        return('white')
    }
}
function endGame(){
    if (gameEnd != "yes"){
        socket.emit("endGame", ID)
        gameEnd = "yes"
        $("#endGame").addClass("endGame")
                .text("Вы проиграли")

        if (gameColor == "white"){
            $('#hodStatus').text("Черные победили")
        }
        else{
            $('#hodStatus').text("Белые победили")
        }
    }
}
socket.on('win', () =>{
    if (gameEnd != "yes"){
        gameEnd = "yes"
        $("#endGame").addClass("endGame")
                .text("Вы выиграли")
        if (gameColor == "white"){
            $('#hodStatus').text("Белые победили")
        }
            else{
            $('#hodStatus').text("Черные победили")
        }
    }
})
socket.on('giveID', (gameID) =>{
    ID = gameID
    idTrue = true
    console.log(ID, idTrue)
    socket.emit('giveColor', ID)
})
socket.on("boardState", (board) =>{
    map = board
    spawnSqare()
    spawnFigure(map)
    if (isCheck(map, gameColor) == true){
        console.log("шах")
        if (checkMate() != true){
            console.log("мат")
            endGame()
        }
        else{
            let [y,x] = findKr(map, gameColor)
            id = (y+1) *10 + x +1
            $('#s' + id).addClass("red")
        }
    }
})
socket.on("gameColor", (color) =>{
    gameColor = color
    if (color == "black"){
        enemyColor = "white"
        $('#board').addClass("rotate")
        rotate = "rotate"
        spawnFigure (map)
    }
    else{
        enemyColor = "black"
        $('#board').addClass("norotate")
        rotate ="norotate"
        spawnFigure (map)
    }
})
socket.on("hodColor", (color) =>{
    if (color == "white"){
        $('#hodStatus').text("Белые ходят")
    }
    else{
        $('#hodStatus').text("Черные ходят")
    }
    hodColor = color
})
