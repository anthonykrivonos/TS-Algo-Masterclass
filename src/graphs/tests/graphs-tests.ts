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

// Test Vertex Adding I
Utility.analyze(MCGraph.prototype.addVertex, graph, 1);
Utility.analyze(MCGraph.prototype.addVertex, graph, 2);
Utility.analyze(MCGraph.prototype.addVertex, graph, 3);

// Test Edge Adding I
Utility.analyze(MCGraph.prototype.addEdge, graph, 1, 3);
Utility.analyze(MCGraph.prototype.addEdge, graph, 1, 2);
Utility.analyze(MCGraph.prototype.addEdge, graph, 2, 3);

// Test Search I
Utility.analyze(MCGraph.prototype.breadthFirstSearch, graph, 1, 3);
Utility.analyze(MCGraph.prototype.depthFirstSearch, graph, 1, 3);

// Test Edge Adding II
Utility.analyze(MCGraph.prototype.addEdge, graph, 3, 1);

// Test Check for Cycles I
Utility.analyze(MCGraph.prototype.isCyclic, graph);

// Test Vertex Removal
Utility.analyze(MCGraph.prototype.removeVertex, graph, 3);

// Test Check for Cycles II
Utility.analyze(MCGraph.prototype.isCyclic, graph);

// Test Search II
Utility.analyze(MCGraph.prototype.breadthFirstSearch, graph, 1, 3);
Utility.analyze(MCGraph.prototype.depthFirstSearch, graph, 1, 3);

// Test Edge Removal
Utility.analyze(MCGraph.prototype.removeEdge, graph, 1, 2);

// Test Search III
Utility.analyze(MCGraph.prototype.breadthFirstSearch, graph, 1, 3);
Utility.analyze(MCGraph.prototype.depthFirstSearch, graph, 1, 3);

// Test Vertex Adding II
Utility.analyze(MCGraph.prototype.addVertex, graph, 4);
Utility.analyze(MCGraph.prototype.addVertex, graph, 5);
Utility.analyze(MCGraph.prototype.addVertex, graph, 6);

// Test Edge Adding III
Utility.analyze(MCGraph.prototype.addEdge, graph, 1, 2);
Utility.analyze(MCGraph.prototype.addEdge, graph, 2, 1);
Utility.analyze(MCGraph.prototype.addEdge, graph, 4, 5);
Utility.analyze(MCGraph.prototype.addEdge, graph, 4, 2);
Utility.analyze(MCGraph.prototype.addEdge, graph, 4, 1);

// Test Connected Subgraphs
Utility.analyze(MCGraph.prototype.getConnectedSubgraphs, graph);
