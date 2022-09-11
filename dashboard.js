// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import wixData from 'wix-data';
import { authentication, currentMember } from 'wix-members';

let data = {}

let id = "";

let userToEdit = ""

const email = "123@gmail.com";
const password = "";

let isLoggedIn = false;

authentication.login(email, password)
    .then(() => {
        console.log('Member is logged in');
    })
    .catch((error) => {
        console.error(error);
    });

let transportation = 0
let bestPractices = 0
let recycling = 0;
let communityService = 0
let points = transportation + bestPractices + recycling + communityService;

$w('#progressBar1').value = points;

if (points >= 100)
	$w('#alltimeCounter').show();

$w('#pointCounter').text = points.toString();



console.log(data.points)
// $w('#alltimeCounter').text = data.points.toString()

const currUser = currentMember.getMember()
    .then((member) => {
        id = member._id;
        const user = `${member.contactDetails.firstName} ${member.contactDetails.lastName}`;
        console.log(member)

        return member;
    })
    .catch((error) => {
        console.error(error);
    });


$w.onReady(function () {

	 wixData.query("Users")
            .eq("user", "John")
            .find()
            .then((results) => {
                if (results.items.length > 0) {
					data = { ...results.items[0]}
					console.log(data)
					$w('#alltimeCounter').text = data.points.toString()

                } else {
                    // handle case where no matching items found
                }
            })
            .catch((err) => {
                console.log(err);
            });


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
	$w('#pointCounter').text = points.toString();
	if (points >= 100)
		$w('#alltimeCounter').show().then(() => console.log("success??"));
	wixData.update("Users", { ...data, points: data.points + points })

}

export function bestPractices_change(event) {
    console.log(event);
    multiCheckboxHandler(event);
}

export function transportation_change(event) { multiCheckboxHandler(event); }

export function recycling_change(event) { multiCheckboxHandler(event); }

export function communityService_change(event) { multiCheckboxHandler(event); }


/**
*	Adds an event handler that runs when an element is displayed
 in the viewable part of the current window.
	[Read more](https://www.wix.com/corvid/reference/$w.ViewportMixin.html#onViewportEnter)
*	 @param {$w.Event} event
*/
export function columnStrip8_viewportEnter(event) {
	// This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
	// Add your code for this event here: 
    
}