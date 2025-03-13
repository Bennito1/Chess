const socket = io()
function сlickbutton(){
    id = socket.id
    console.log(id)
    console.log("Click")
    socket.emit('playerReady', id);
    $('.startGame').remove()
};

socket.on('startGame', () => {
    window.location.href = '/game';
})

get_main ='<menu id="svo"> <li class="menu"><span class="menu_runced">runced</span></li><li class="menu"><span class="menu_unranced">unranced</span></li><li class="menu"><span class="menu_help"><button class="play_h" onclick=сlickbutton()>play</button></span></li><button class="but_cl_menu" onclick="clous_whindo()">Назад</button></menu>'

function open_whindo(){
    $("#zv").html(get_main)
}

function clous_whindo(){
    $("#svo").remove()
}
