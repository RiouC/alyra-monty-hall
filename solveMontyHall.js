const { randomInt } = require('crypto')

const { doors, printDoors, setCar, openGoat, takeOtherGoat, takeRandomGoat } = require('./montyHall');


const TRY = 1000;

const automatedRun = (changeChoice) => {
    setCar(doors);
    
    // let possibleIndex = [1, 2, 3];
    // let indexChoice = readlineSync.keyInSelect(possibleIndex, 'Choose a door : ');    
    let indexChoice = randomInt(0, doors.length);
    console.log('Choosing a door')
    
    // console.log(`choice : ${indexChoice+1}`)
    // printDoor(doors, indexChoice);
    console.log(printDoors(doors, indexChoice));

    // open 1 goat
    let indexOpenGoat =  openGoat(doors, indexChoice);
    console.log(`Door ${indexOpenGoat+1} is a goat`);
    // printDoor(doors, indexChoice);
    console.log(printDoors(doors, indexChoice));
    
    // changeChoice = readlineSync.keyInYN('Change door ?');
    
    if (changeChoice) {
	let i = 0;
	for (let i = 0; i < doors.length; i++) {
	    if (i !== indexChoice && doors[i][1] === false) {
		indexChoice = i;
	    }
	}
    }
    if (doors[indexChoice][0] === 'car') {
	console.log('Félicitations !')
    }
    else
	console.log('Dommage !')

    doors[indexChoice][1] = true;
    // printDoor(doors, indexChoice);
    console.log(printDoors(doors, indexChoice));
}

automatedRun()
