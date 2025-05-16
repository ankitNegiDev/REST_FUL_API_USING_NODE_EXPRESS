
// these are kind of utility function...

import { Filter } from 'bad-words';

export function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escapes regex special chars
}

export function cleanProfanityStrict(input) {
    const filter = new Filter();
    const badWords = filter.list; // list of bad words
    let cleanString = input;

    badWords.forEach(function callback(word) {
        const escapedWord = escapeRegex(word);
        const regex = new RegExp(escapedWord, 'gi');

        // Replace all occurrences of the bad word with stars (*)
        cleanString = cleanString.replace(regex, '*'.repeat(word.length));
    });

    return cleanString;
}

export function containsProfanityStrict(input) {
    const filter=new Filter();
    const badWords = filter.list;  // Get list of all bad words from 'bad-words' package
    // console.log("badword list : ",badWords);
    const lowerInput = input.toLowerCase(); // Convert input to lowercase for case-insensitive comparison

    // Check if any bad word is a substring of the input
    // return badWords.some(word => lowerInput.includes(word));
    return badWords.some(function callback(word){
        // chdecking is there any bad word present in input.
        return lowerInput.includes(word); // if it found it return true.. else false.
    })
}