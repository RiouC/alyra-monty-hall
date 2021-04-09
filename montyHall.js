const readlineSync = require('readline-sync');
const { randomInt } = require('crypto')


const doors = ['goat', 'goat', 'goat'].map(el => [el, false]);

const debugPrintDoor = (doors, indexChoice) => {
    for (let i = 0; i < doors.length; i++) {
	if (i === indexChoice)
	    console.log(`Door ${i+1}: ${doors[i][0]} / ${doors[i][1]} <---`);
	else
	    console.log(`Door ${i+1}: ${doors[i][0]} / ${doors[i][1]}`);
    }
    console.log();
}

const printDoors = (doors, indexChoice) => {
    const tmp = doors.map(el => el[1] === true ? el[0] : '_');
    tmp[indexChoice] = tmp[indexChoice] + '  <---';
    return tmp.join('\n');
}

const setCar = (doors) => {
    const n = randomInt(0, doors.length);
    doors[n][0] = 'car';
}

const openGoat = (doors, indexChoice) => {
    if (doors[indexChoice][0] === 'goat') {
	return takeOtherGoat(doors, indexChoice);
    }
    else {// choice === car
	return takeRandomGoat(doors)
    }
}

const takeOtherGoat = (doors, indexChoice) => {
    for (let i = 0; i < doors.length; i++) {
	if (i !== indexChoice && doors[i][0] !== 'car') {
	    doors[i][1] = true;
	    return i;
	}	    
	else
	    continue;
    }
    return i;
}

const takeRandomGoat = (doors) => {
    while (true) {
	const randomIndex = randomInt(0, doors.length);
	if (doors[randomIndex][0] === 'goat') {
	    doors[randomIndex][1] = true;
	    return randomIndex;
	}
    }
}

const main = () => {
    setCar(doors);
    
    let possibleIndex = [1, 2, 3];
    let indexChoice = readlineSync.keyInSelect(possibleIndex, 'Choose a door : ');
    // console.log(`choice : ${indexChoice+1}`)
    // printDoor(doors, indexChoice);
    console.log(printDoors(doors, indexChoice));

    // open 1 goat
    let indexOpenGoat =  openGoat(doors, indexChoice);
    console.log(`Door ${indexOpenGoat+1} is a goat`);
    // printDoor(doors, indexChoice);
    console.log(printDoors(doors, indexChoice));
    
    changeChoice = readlineSync.keyInYN('Change door ?');
    if (changeChoice) {
	let i = 0;
	for (let i = 0; i < doors.length; i++) {
	    if (i !== indexChoice && doors[i][1] === false) {
		indexChoice = i;
	    }
	}
    }
    if (doors[indexChoice][0] === 'car') {
	// doors[indexChoice][1] = true;
	console.log('Félicitations !')
    }
    else
	console.log('Dommage !')

    doors[indexChoice][1] = true;
    // printDoor(doors, indexChoice);
    console.log(printDoors(doors, indexChoice));
}

main()


exports.doors = doors;
exports.setCar = setCar;
exports.openGoat = openGoat;
exports.takeOtherGoat = takeOtherGoat
exports.takeRandomGoat = takeRandomGoat
