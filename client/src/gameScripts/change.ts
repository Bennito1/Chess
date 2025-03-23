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
}

export default Change