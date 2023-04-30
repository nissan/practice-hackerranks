/* Run instructions: 
`export OUTPUT_PATH=output.txt`
 node solution.js < testInput.txt
*/
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'minimumNumber' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING password
 */

function minimumNumber(n, password) {
    // Return the minimum number of characters to make the password strong
    const minLength = 6;
    const numbers = "0123456789";
    const lower_case = "abcdefghijklmnopqrstuvwxyz";
    const upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const special_characters = "!@#$%^&*()\\-+";

    let count = 0;
    //for each test below that fails, it needs at least one more character of this type to be strong
    if (!(new RegExp(`[${upper_case}]`).test(password))) count++;
    if (!(new RegExp(`[${lower_case}]`).test(password))) count++;
    if (!(new RegExp(`[${numbers}]`).test(password))) count++;
    if (!(new RegExp(`[${special_characters}]`).test(password))) count++;

    /* for debugging
    console.log("Password: " + password)
    console.log("Has Uppercase characters: "+ (new RegExp(`[${upper_case}]`).test(password)));
    console.log("Has Lowercase characters: " + (new RegExp(`[${lower_case}]`).test(password)));
    console.log("Has Numbers: " + (new RegExp(`[${numbers}]`).test(password)));
    console.log("Has Special Characters: " + (new RegExp(`[${special_characters}]`).test(password)));
    console.log("Difference from minimum length of " + minLength +"based on n value " +n + " is: " + minLength-n);
    console.log("Count for missing params is greater than minimum length shortfall: " + count>minLength-n);
    */

    //return the greater value of how many characters to minimum Length or to meet missing checks
    return (count > minLength - n) ? count : minLength - n;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const password = readLine();

    const answer = minimumNumber(n, password);

    ws.write(answer + '\n');

    ws.end();
}
