/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 12.5.2018
 * Grids/Tests
 */

import * as Utility from '../../utility';
import { MCGrid } from '../main/grids-main';
import { MCArray } from '../../arrays/main/arrays-main';

let adjacencyMatrix = new MCGrid(new MCArray(
      new MCArray(0, 0, 0, 1),
      new MCArray(0, 0, 1, 1),
      new MCArray(0, 0, 0, 0),
      new MCArray(1, 0, 0, 0),
));

let reachabilityMatrix = new MCGrid(new MCArray(
      new MCArray(1, 0, 0, 1),
      new MCArray(1, 0, 1, 1),
      new MCArray(0, 0, 0, 0),
      new MCArray(1, 0, 0, 1),
));

// Call Tests
Utility.print(`🔎 Calling MCArray Tests`);

// Test Warshall
Utility.analyze(MCGrid.warshallReachability, null, adjacencyMatrix);
