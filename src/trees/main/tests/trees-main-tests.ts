/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 10.13.2018
 * Graphs/Tests
 */

import * as Utility from '../../../utility';
import { MCTrie } from '../trie/trees-main-trie';

const trie = new MCTrie()

// Call Tests
console.log(`🔎 Calling MCTrie Tests`);

// Sentence to insert
const sentence = 'the quick brown fox jumped over the lazy dog'.split(' ')

// Test word insertion
for (const word of sentence) {
    Utility.analyze(MCTrie.prototype.addWord, trie, word)
}

// Test word completion
const word = 'quic'
const expected = trie.getAutocompleteNextChar(word)
Utility.expect(MCTrie.prototype.getAutocompleteNextChar, trie, 'k', 'quic');
console.log(`When writing ${word}, did you mean ${word + expected}?`)