// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from 'wix-data';
import { authentication, currentMember } from 'wix-members';

const user = {
	_id: "",
	first_name: "",
	last_name: "",
	points: 0,
}

let transportation = 0
let bestPractices = 0
let recycling = 0;
let communityService = 0
let points = transportation + bestPractices + recycling + communityService;

$w('#progressBar1').value = points;

const currUser = currentMember.getMember()
	.then((member) => {
		const id = member._id;
		const fullName = `${member.contactDetails.firstName} ${member.contactDetails.lastName}`;
		return member;
	})
	.catch((error) => {
		console.error(error);
	});

$w.onReady(function () {

	// Write your Javascript code here using the Velo framework API
	$w('#button3').onClick(() => $w('#progressBar1').value += 3);

});

const update = () => {
	const updatedData = { ...currUser, points: points };
	wixData.update("myCollection", updatedData)
		.then((results) => {
			console.log(results); //see item below
		})
		.catch((err) => {
			console.log(err);
		});
}

const multiCheckboxHandler = (event) => {
	// console.log(event.target.value);
	let selectedChoices = event.target.value;
	let searchBank = [];
	// const transportation = [20, 21, 15]
	// const bestPractices = [10, 15]
	// const recycling = [5, 6, 10, 20];
	// const communityService = [10, 30, 35, 15]
	let sum = selectedChoices.reduce((previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue), 0)

	switch (event.target) {
		case $w('#transportation'):
			transportation = sum;
			break;
		case $w('#bestPractices'):
			bestPractices = sum;
			break;
		case $w('#recycling'):
			recycling = sum;
			break;
		case $w('#communityService'):
			communityService = sum;
			break;
		default:
			;
	}
	let points = transportation + bestPractices + recycling + communityService;

	console.log(sum);
	console.log(points);
	// selectedChoices.forEach( choice => points += parseInt(choice));
	// console.log(points);
	$w('#progressBar1').value = points;
}

export function bestPractices_change(event) {
	console.log(event);
	multiCheckboxHandler(event);
}

export function transportation_change(event) { multiCheckboxHandler(event); }

export function recycling_change(event) { multiCheckboxHandler(event); }

export function communityService_change(event) { multiCheckboxHandler(event); }
