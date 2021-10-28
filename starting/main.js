const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const lost = '!'
const win = '@'
let gameStatus = true;
let fallen = false;
let found = false;
let outOfBounds = false;

class Field {
    constructor(field) {
    this._field = field;
    this._xPosition = 0;
    this._yPosition = 0;
    this._direction = '';
  }

  /* 

  The move() method all increment the xPosition or yPosition by +1 or -1.
  However, before doing so the following methods will be executed first:

  direction() : This will find out the which direction the user wants to move.
  insideBoundaryCheck() : This will check if the direction the user wants to move into is inside the boundary.

  If the direction is within the boundary, the next method, foundHat(), will see if the user would find the hat by moving in their chosen direction.
  If true, the user's chosen direction  would be executed and the game completed.
  
  If false, insideHole() method is run. This checks to see if the chosen direction would move inside a hole. If true, the lost symbol "!" is printed on the co-ordinates and the game ends.

  If false, then the pathCharacter '*' is printed on the co-ordinates and the game continues.
  
  */
    move() {
        // updates the xPosition according to the user's input
        if(this._direction === 'R') {
            this._xPosition += 1
        } 
        else if (this._direction === 'L') {
            this._xPosition -= 1
        } 
        else if (this._direction === 'U') {
            this._yPosition -= 1
        } 
        else if (this._direction === 'D') {
            this._yPosition += 1
        }
        
        // Checks to see if the variable 'found' is true. If true, it will print the win symbol '@' on the current co-ordinates.
        if (found === true) {
            this._field[this._yPosition][this._xPosition] = win;
            this.print()

            console.log('\nYou Win!\nYou found your hat.')
            gameStatus = false

        }
        
        // Checks to see if the variable 'fallen' is true. If True, it will print the lost symbol '!' on the current co-ordinates.
        else if (fallen === true) {
            this._field[this._yPosition][this._xPosition] = lost;
            this.print()
        } 
        
        // Checks to see if the variable 'outOfBounds' is false. If outOfBounds is false, it will print the pathCharacter symbol '░' on the current co-ordinates.
        else if(outOfBounds === false) {
            this._field[this._yPosition][this._xPosition] = pathCharacter;
            this.print()
        }        
  }


    // Each element of the Outter array is joined together and logged  to the console
    print() {
        this._field.forEach( outerArray => {
        console.log(outerArray.join(''))
        })
    }

    // logs the insturctions of how to move to the console.
    instructions () {
        console.log(
        '\n\nTo move up one tile enter "U"'+
        '\nTo move down one tile enter "D"' +
        '\nTo move left once tile enter "L"'+
        '\nTo move right one tile enter "R"')
    }

    currentPosition() {
        console.log(`x co-ordinate: ${this._xPosition}\ny co-ordinate: ${this._yPosition}`)
    }

    // Checks to see if we were to move according to the user's input would we fall inside a hole?
    insideHole() {
        if(this._direction === 'D') {
            if(this._field[this._yPosition +1 ][this._xPosition] === hole) 
                fallen = true;

        }

        else if(this._direction === 'R') {
            if(this._field[this._yPosition ][this._xPosition +1] === hole)
                fallen = true;
        }

        else if(this._direction === 'U') {
            if(this._field[this._yPosition -1 ][this._xPosition] === hole)
                fallen = true;
        }

        else if(this._direction === 'L') {
            if(this._field[this._yPosition ][this._xPosition -1] === hole)
                fallen = true; 
        }
        
        // if the user's intended move was a hole then the variable 'fallen' would be set to true and the below code would be executed.
        if (fallen === true) {
            this.move()

            console.log('You Lose!\nYou fell in the hole.')
            gameStatus = false;

        }
        // If it was not a hole then the variable 'fallen' would be false.
        else {
            this.move()
        } 

    }
    
    // Checks to see if the intended move is the co-ordinates of the hat.
    foundHat() {
        if (this._direction === 'D') {

            if(this._field[this._yPosition +1][this._xPosition] === hat) {
                found = true;
                this.move()

            }
        } 
        
        else if (this._direction === 'R') {
            if(this._field[this._yPosition][this._xPosition +1] === hat) {
                found = true;
                this.move()

            }
        }

        else if (this._direction === 'U') {
            if(this._field[this._yPosition -1][this._xPosition] === hat) {
                found = true;
                this.move()
            }
        } 
            
        else if (this._direction === 'L') {
            if(this._field[this._yPosition][this._xPosition -1] === hat) {
                found = true;
                this.move()
            }
        }
    }

// This first check is to see if the intended move is within the field Boundary.
    insideBoundaryCheck() {
        if (this._direction === 'D') {
            if((this._yPosition +1) < this._field.length) {
                outOfBounds = false
        } 
        
        else {
            outOfBounds = true
        }

        } 
        else if(this._direction === 'R') {
            
            
            if((this._xPosition +1) < this._field[0].length) {
                outOfBounds = false
            } 

            else {
                outOfBounds = true
            }

        } 

        else if(this._direction === 'U') {
            if((this._yPosition -1) > -1) {
                outOfBounds = false
            } 
            else {
                outOfBounds = true
            }

        }

        else if(this._direction === 'L') {
            if((this._xPosition -1) > -1) {
                outOfBounds = false
            }
            else {
                outOfBounds = true
            }
        }

        //If the variable 'outOfBounds' equals false then code will run the foundHat() method.
        if (outOfBounds === false) {
            this.foundHat()

            //If the variable 'found' is false, the hat was not found, then the method insideHole() will run.
            // If the hat was found, then there is no need to run insideHole() method.
            if(found === false) {
                this.insideHole()
            }
        }
        
        // If the variable 'outOfBounds' is true, then the user loses.
        else if(outOfBounds === true) {
            
            //The x or Y co-ordinates are still updates to simulate the move.
            this.move();
            console.log('You Lose:\nYou moved outside of the field')

            // The variable gameStatus will be set to false so that the game will stop.
            //The while loop in the directions() method will now stop.
            gameStatus = false;

            return false
        }

    }


    // This method asks the user to input the diretion they intend to move.
    direction() {

        // Before the game starts it will print the field.
        this.print()

        // The variable 'gameStatus' is intially set to true. 
        //So this loop will run and will continue to run unless 'gameStatus' becomes false.'
        while (gameStatus) {

            // Asks the user for their input
            let whichWay = prompt('\nWhich way would you like to move? ')
            
            // this.direction variable was initially stored as an empty string in the constructor of the Field class.
            // It know will store the direction the user want to move.
            this._direction = whichWay
            
            // If this.direction is any of the valid inputs it will be used as an arguement for the insideBoundaryCheck() method.
            if (this._direction === 'U' || this._direction === 'D' || this._direction === 'L' || this._direction === 'R') {
                console.log(this._direction)
                this.insideBoundaryCheck(this._direction)
            } 
            else {
                console.log('Invalid Input')   
            }

        }
    }

    // This method will automatically generate a 2 dimensional field based on the arguement provided.
    static generateField (height, width, percentage) {

        const numOfTiles = height * width;
        const field = []

        
        
        let firstIndex = true
        let widthIndex = width - width
        let heightIndex = height - height
        let randomX = undefined
        let randomY = undefined
        let hatX = undefined
        let hatY = undefined
        let hatPlaced = false

        // creates empty arrays inside the empty 'field' array. This will be the Y-axis
        // The number of empty arrays it creates will be the same as the height arguement. 
        for( let i=0 ; i<height ; i++) {
            field.push([])
        }
        
        // Inside each element (the empty arrays created) we need to input the 'fieldCharacter' variable.
        // The total numner of times we will need to do this depends on the variable 'numOfTiles' (height * width)

        for (let i = 0  ; i < numOfTiles  ; i++) {
            
            // Because we want the upper left conner of the field to be the pathCharacter variable, field[0][0] will be set as pathCharacter.
            // firstIndex variable is intitalized as true, so this if block will run.
            if(firstIndex) {
                
                // Inside the block we change firstIndex to false so that this block will not run after its first execution.
                firstIndex = false;
                // The variables heightIndex and width index are both intialised as 0.  
                field[heightIndex][widthIndex] = pathCharacter

                widthIndex += 1;
            }
            
            // After the first for loop this else block will run for the rest of the for loops.
            else {
                // we intend to input the fieldCharacter symbol into an array until it reaches its desired width.
                if ( widthIndex < width) {
                    field[heightIndex][widthIndex] = fieldCharacter;

                    // the widthIndex is incremented by 1 each time so that we can move along the array in each for loop.
                    widthIndex +=1;

                }

                // when the widthIndex has been incremented to equal the width, we want to now move along to the next array.
                else if (widthIndex === width){
                    //widthIndex is set back to 0 and the heightIndex is set to 1.
                    // This is so that we move on to the beginning of the next array.
                    widthIndex = 0
                    heightIndex += 1;

                    field[heightIndex][widthIndex] = fieldCharacter;
                    widthIndex += 1;
                }
            }

        }

        // Now that we have generated the field, we want to randomly place the hat within that field.
        // We only need to execute this code while hatPlaced is false.
        while (hatPlaced === false) {
            
            // Generates and random x and y co-ordinate using the width and height arguement to makesure it is within the field.
            hatX = Math.floor(Math.random() * width)
            hatY = Math.floor(Math.random() * height)

            // We check to see the random co-ordinates are NOT field[0][0] as this is where we want the pathCharacter to be intialised.
            // If it is equal to [0][0] then the while loop will run again as hatPlaced will still be false.
            if (field[hatY][hatX] !== field[0][0]) {
                field[hatY][hatX] = hat
                hatPlaced = true
            }
        }

        // numOfHole variable stores the number of holes to be printed in the field.
        // It find the percentage of numOftiles to be holes and rounds it up as we need to have a whole number.
        const numOfHoles = Math.ceil((percentage/100) * numOfTiles)
        let remainingHoles = numOfHoles



        // while there are holes remaining to be printed onto the field this code will run. 
        while (remainingHoles > 0) {

            // Generates and random x and y co-ordinate using the width and height arguement to makesure it is within the field.
            randomX = Math.floor(Math.random() * width)
            randomY = Math.floor(Math.random() * height)

            // checks to see the random co-ordinates are not:
            // 1) not the co-ordinates of the hat that was placed
            // 2) not field[0][0] were the pathCharacter is intitally placed.
            // 3) not were we have randomly placed another hole. 
            if(field[randomY][randomX] !== hat && field[randomY][randomX] !== field[0][0] && field[randomY][randomX] !== hole) {
                field[randomY][randomX] = hole;

                remainingHoles -= 1
            } 
        }
        return field

    }

}


const field1 = new Field(Field.generateField(5,5,10));

field1.direction()

