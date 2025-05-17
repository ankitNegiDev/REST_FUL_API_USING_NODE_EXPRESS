// These are utility functions related to profanity filtering and regex escaping.

import { Filter } from 'bad-words';

/**
 * Escapes special characters in a string so it can be safely used in a regular expression.
 * @param {string} string - The input string to escape.
 * @returns {string} - The escaped string safe for use in RegExp.
 */
export function escapeRegex(string) {
    // Replace special regex characters with escaped versions (e.g. '.' becomes '\.')
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Cleans a string by replacing any bad words (from the bad-words package list) with asterisks (*).
 * The replacement is case-insensitive and replaces all occurrences.
 * @param {string} input - The string to clean.
 * @returns {string} - The cleaned string with bad words replaced by stars.
 */
export function cleanProfanityStrict(input) {
    const filter = new Filter();
    const badWords = filter.list; // Getting list of bad words from the filter
    let cleanString = input;

    badWords.forEach(function callback(word) {
        const escapedWord = escapeRegex(word); // Escape special regex characters in the bad word
        const regex = new RegExp(escapedWord, 'gi'); // Case-insensitive global search

        // Replacing all occurrences of the bad word with stars of same length
        cleanString = cleanString.replace(regex, '*'.repeat(word.length));
    });

    return cleanString;
}

/**
 * Checks if the input string contains any bad words from the bad-words package list.
 * Case-insensitive substring search.
 * @param {string} input - The string to check.
 * @returns {boolean} - True if any bad word is found, else false.
 */
export function containsProfanityStrict(input) {
    const filter = new Filter();
    const badWords = filter.list;  // List of all bad words

    const lowerInput = input.toLowerCase(); // Convert input to lowercase for case-insensitive matching

    // Returning true if any bad word is found as a substring in the input
    return badWords.some(function callback(word) {
        return lowerInput.includes(word);
    });
}
