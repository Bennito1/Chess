class Change {
    changeFigure(figure: string) {
        switch (figure) {
            case 's':
            case 'S':
                return 's'
            case 'l':
            case 'L':
                return 'l'
            case 'kr':
            case 'KR':
                return 'kr'
            case 'q':
            case 'Q':
                return 'q'
            case 'p':
            case 'P':
                return 'p'
            case 'k':
            case 'K':
                return 'k'
            default: return '0'
        }
    }

    changeColorFigure(figure: string){
        if (figure === 's' || figure === 'q' || figure === 'p' || figure === 'l' || figure === 'kr' || figure === 'k') {
            return "black"
        }
        return "white"
    }

    changeName(name:string, color:string){
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
}

export default Change