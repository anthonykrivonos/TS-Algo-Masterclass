/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 10.13.2018
 * Maps/Tests
 */

import * as Utility from '../../utility';
import { MCMap } from '../main/maps-main';

let map = new MCMap();

// Call Tests
console.log(`🔎 Calling MCMap Tests`);

// Test Value Setting
Utility.analyze(MCMap.prototype.set, map, "one", 1);
Utility.analyze(MCMap.prototype.set, map, "two", 2);
Utility.analyze(MCMap.prototype.set, map, "three", 3);

// Test Array Extraction
Utility.analyze(MCMap.prototype.toArray, map);

// Test Value Removal
Utility.analyze(MCMap.prototype.remove, map, "three");

// Test Values Array Extraction
Utility.analyze(MCMap.prototype.values, map);

// Test Value Getting
Utility.analyze(MCMap.prototype.get, map, "two");

// Test Keys Array Extraction
Utility.analyze(MCMap.prototype.keys, map);
