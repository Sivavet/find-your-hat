const prompt = require('prompt-sync')({sigint: true});

class System {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.hat = '^';
        this.hole = 'O';
        this.fieldCharacter = '░';
        this.pathCharacter = '*';
        this.updateCharacter = '-';
        this.playerLocationWidth = Math.floor(Math.random()*this.width);
        this.playerLocationHeight = Math.floor(Math.random()*this.height);

        this.hatLocationWidth = Math.floor(Math.random()*this.width);
        this.hatLocationHeight = Math.floor(Math.random()*this.height);

        this._map = this.mapGenerator()
    }
    get showMap (){
        return this._map;
    }
    get location (){
        const message = `Player Location: ${this.playerLocationWidth} ${this.playerLocationHeight}\nHat Location: ${this.hatLocationWidth}  ${this.hatLocationHeight}`
        return message;
    }
    

    rowGenerator (){
        let rows = []; 
        for(let col=0; col<this.width; col++){
            let randomResult = Math.floor(Math.random()*10)
            if(randomResult<6){
                rows.push(this.fieldCharacter);
            }else{
                rows.push(this.hole);
            }
        }
        return rows;
    }
    
    mapGenerator(){
        let map = [];   
        for(let row=0; row<this.height; row++){
            map.push(this.rowGenerator(this.width))
        }

        map[this.playerLocationHeight][this.playerLocationWidth] = this.pathCharacter;
        map[this.hatLocationHeight][this.hatLocationWidth] = this.hat;
        return map;
    }

    moved(direction){
        direction.toLowerCase() 
        switch(direction){
            case 'a':
                this.playerLocationWidth -= 1;
                if(this.playerLocationWidth < 0){
                    this.playerLocationWidth = 0;
                }
                if(this._map[map.playerLocationHeight][map.playerLocationWidth] === map.hole){
                    return 'You falling down to endless hole';
                }
                this._map[this.playerLocationHeight][this.playerLocationWidth] = this.updateCharacter;
                break;

            case 'd':
                this.playerLocationWidth += 1;
                if(this.playerLocationWidth >= this.width){
                    this.playerLocationWidth = this.width-1;
                }
                if(this._map[map.playerLocationHeight][map.playerLocationWidth] === map.hole){
                    return 'You falling down to endless hole';
                }
                this._map[this.playerLocationHeight][this.playerLocationWidth] = this.updateCharacter;
                break;

            case 'w':
                this.playerLocationHeight -= 1;
                if(this.playerLocationHeight < 0){
                    this.playerLocationHeight = 0;
                }
                if(this._map[map.playerLocationHeight][map.playerLocationWidth] === map.hole){
                    return 'You falling down to endless hole';
                }
                this._map[this.playerLocationHeight][this.playerLocationWidth] = this.updateCharacter;
                break;

            case 's':
                this.playerLocationHeight += 1;
                if(this.playerLocationHeight >= this.height){
                    this.playerLocationHeight = this.height-1;
                }
                if(this._map[map.playerLocationHeight][map.playerLocationWidth] === map.hole){
                    return 'You falling down to endless hole';
                }
                this._map[this.playerLocationHeight][this.playerLocationWidth] = this.updateCharacter;
                break;

            default:
                console.log('Try again with  W , A, S or D')
        } 
    }
}
class Field{
    constructor(arrField2d){
        this.arrField2d = arrField2d;
    }

    print(){
        console.log(this.arrField2d.map(row => row.join('')).join('\n')); 
    }
}


// Generate Game
let map = new System(5,5);
let field = new Field(map.showMap);
// Running Area
let running = true;
while(running){
    field.print()
    let movement = prompt('Enter W , A, S ,D or Q \n')
    movement.toLowerCase()

    if(movement === 'q'){
        running = false;
    }

    if(map.moved(movement) === 'You falling down to endless hole'){
        console.log('You falling down to endless hole');
        running = false;
    }
    
    if((map.playerLocationWidth === map.hatLocationWidth) && (map.playerLocationHeight === map.hatLocationHeight)){
        console.log('Congratulation you found your hat')
        running = false;
    }
} // ending while
