/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 10.13.2018
 * Graphs/Tests
 */

import * as Utility from '../../utility';
import { MCGraph } from '../main/graphs-main';
import { MCWeightedGraph } from '../weighted/graphs-weighted';

let graph = new MCGraph();
let weightedGraph = new MCWeightedGraph();

// Call Tests
console.log(`🔎 Calling MCGraph Tests`);

// Test Vertex Adding
Utility.analyze(MCGraph.prototype.addVertex, graph, 1);
Utility.analyze(MCGraph.prototype.addVertex, graph, 2);
Utility.analyze(MCGraph.prototype.addVertex, graph, 3);

// Test Edge Adding
Utility.analyze(MCGraph.prototype.addEdge, graph, 1, 3);
Utility.analyze(MCGraph.prototype.addEdge, graph, 1, 2);
Utility.analyze(MCGraph.prototype.addEdge, graph, 2, 3);

// Test Search Pt. I
Utility.analyze(MCGraph.prototype.breadthFirstSearch, graph, 1, 3);
Utility.analyze(MCGraph.prototype.depthFirstSearch, graph, 1, 3);

// Test Vertex Removal
Utility.analyze(MCGraph.prototype.removeVertex, graph, 3);

// Test Search Pt. II
Utility.analyze(MCGraph.prototype.breadthFirstSearch, graph, 1, 3);
Utility.analyze(MCGraph.prototype.depthFirstSearch, graph, 1, 3);

// Test Edge Removal
Utility.analyze(MCGraph.prototype.removeEdge, graph, 1, 2);

// Test Search Pt. III
Utility.analyze(MCGraph.prototype.breadthFirstSearch, graph, 1, 3);
Utility.analyze(MCGraph.prototype.depthFirstSearch, graph, 1, 3);
