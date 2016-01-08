/**
 * Your birthday in YYYY-MM-DD format 
 */
var BIRTHDAY = '1991-11-17';

/**
 *	Returns the age in years for a person born in the specified date.
 * @param birthday: string with the reference date in YYYY-MM-DD. Unexpected results 
 * 	if the date is not in the specified format or is a date after Date.now().
 */			
function age(birthday) {
	return Math.abs(new Date(Date.now() - new Date(birthday).getTime()).getUTCFullYear() - 1970);
}

/**
 * Inserts the user age in all tags with class 'years'.
*/
function insertAge() {
	var yearTags = document.getElementsByClassName('years');
	var years = age(BIRTHDAY);
	
	for (var yearTag = 0; yearTag < yearTags.length; yearTag++) {
		yearTags[yearTag].innerHTML = years;	
	}	
}