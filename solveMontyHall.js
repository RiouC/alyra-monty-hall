const { randomInt } = require('crypto')

const { printDoors, setCar, openGoat, takeOtherGoat, takeRandomGoat } = require('./montyHall');


const TRY = 1000;

const automatedRun = (changeChoice) => {
    doors = ['goat', 'goat', 'goat'].map(el => [el, false]);
    setCar(doors);
    
    let indexChoice = randomInt(0, doors.length);

    // open 1 goat
    let indexOpenGoat =  openGoat(doors, indexChoice);
    
    
    if (changeChoice) {
	let i = 0;
	for (let i = 0; i < doors.length; i++) {
	    if (i !== indexChoice && doors[i][1] === false) {
		indexChoice = i;
	    }
	}
    }
    doors[indexChoice][1] = true;
    
    if (doors[indexChoice][0] === 'car') {
	return true;
    }
    else {
	return false;
    }
    
    console.log(printDoors(doors, indexChoice));
}

let counters = {'good': 0, 'bad': 0};
for (let i = 0; i < TRY; i++) {
    automatedRun(false) ? counters.good += 1 : counters.bad += 1;
}

console.log(`[noChange] Win/Lose : ${counters.good} / ${counters.bad}`);

counters['good'] = 0;
counters['bad'] = 0;
for (let i = 0; i < TRY; i++) {
    automatedRun(true) ? counters.good += 1 : counters.bad += 1;
}

console.log(`[change] Win/Lose : ${counters.good} / ${counters.bad}`);

