/**
* Anthony Krivonos
* Typescript Algorithm Masterclass
* 09.27.2018
* Graphs/Main
*/

import { MCArray } from "../../arrays/main/arrays-main";
import { MCMap } from "../../maps/main/maps-main";
import { MCQueue } from "../../queues/main/queues-main";

/**
* Masterclass directed graph implementation.
*/
export class MCGraph<T> {

      private adjacencyMap:MCMap<T, MCArray<T>>;

      /**
      * Constructor
      * - Creates an MCMap from a regular map.
      * @param map Optional map to reconstruct.
      */
      constructor() {
            this.adjacencyMap = new MCMap<T, MCArray<T>>();
      }

      /**
      * Add Vertex
      * - Adds a vertex to the graph.
      * @param vertex Vertex to add.
      * @returns True if the vertex was added, false otherwise.
      */
      public addVertex(vertex:T):boolean {
            if (!this.adjacencyMap.has(vertex)) {
                  this.adjacencyMap.set(vertex, new MCArray<T>());
                  return true;
            }
            return false;
      }

      /**
      * Add Edge
      * - Adds an edge to the graph.
      * @param from One vertex to create the edge from.
      * @param to One vertex to create the edge to.
      * @returns True if the edge was added, false otherwise.
      */
      public addEdge(from:T, to:T):boolean {
            if (this.adjacencyMap.has(from) && this.adjacencyMap.has(to) && !this.adjacencyMap.get(from)!.includes(to)) {
                  this.adjacencyMap.get(from)!.push(to);
                  return true;
            }
            return false;
      }

      /**
      * Remove Vertex
      * - Removes a vertex from the graph.
      * - Removes all edges connected to other vertices.
      * @param vertex Vertex to add.
      * @returns True if the vertex was removed, false otherwise.
      */
      public removeVertex(vertex:T):boolean {
            if (this.adjacencyMap.has(vertex)) {
                  this.adjacencyMap.remove(vertex);
                  this.adjacencyMap.forEach((adjacentVertex, adjacencyList) => {
                        let indexOfVertex = adjacencyList.indexOf(vertex);
                        if (indexOfVertex > -1) {
                              adjacencyList.splice(indexOfVertex, 1);
                        }
                        this.adjacencyMap.set(adjacentVertex, adjacencyList);
                  });
                  return true;
            }
            return false;
      }

      /**
      * Remove Edge
      * - Removes an edge from the graph.
      * @param from One vertex to remove the edge from.
      * @param to One vertex to remove the edge to.
      * @returns True if the edge was removed, false otherwise.
      */
      public removeEdge(from:T, to:T):boolean {
            if (this.adjacencyMap.has(from) && this.adjacencyMap.get(from)!.includes(to)) {
                  let indexOfTo = this.adjacencyMap.get(from)!.indexOf(to);
                  this.adjacencyMap.get(from)!.splice(indexOfTo, 1);
                  return true;
            }
            return false;
      }

      /**
      * Breadth First Traversal
      * - O(n^2)
      * - Search each neighboring vertex.
      * - If not found, search the depth of each neighboring vertex.
      * - Keep track of checked vertices.
      * @param from Vertex to start the search from.
      * @param for Vertex to search for.
      * @returns True if the vertex was found, false otherwise.
      */
      public breadthFirstSearch(from:T, find:T):boolean {

            // Keeps track of visited vertices
            var visitMap = new MCMap();
            this.adjacencyMap.keys().forEach((key:T) => {
                  visitMap.set(key, false);
            });

            // Queue that keeps track of visited vertices
            var visitQueue = new MCQueue<T>();

            // Function that marks a vertex as visited
            let visit = (vertex:T) => {
                  visitQueue.add(vertex);
                  visitMap.set(vertex, true);
            }

            // Visit the from element
            visit(from);

            // Recur while visit queue is non-empty
            while (!visitQueue.isEmpty()) {

                  // Take the last element from the visit queue
                  let currentVertex = visitQueue.poll();

                  // Return true if the vertex is found
                  if (currentVertex == find) {
                        return true;
                  } else {
                        this.adjacencyMap.get(currentVertex!)!.forEach((vertex) => {
                              if (!visitMap.get(vertex)) {
                                    visit(vertex);
                              }
                        });
                  }
            }

            return false;
      }

      /**
      * Depth First Traversal
      * - O(n^2)
      * - Search the deepest child of the current vertex.
      * - Recur to neighboring vertices.
      * @param from Vertex to start the search from.
      * @param for Vertex to search for.
      * @returns True if the vertex was found, false otherwise.
      */
      public depthFirstSearch(from:T, find:T):boolean {

            // Keeps track of visited vertices
            var visited = new MCMap();
            this.adjacencyMap.keys().forEach((key:T) => {
                  visited.set(key, false);
            });

            var found = false;

            // Helper function
            let depthFirstTraversal = (vertex:T, goal:T):void => {

                  // Visit the from element
                  visited.set(vertex, true);

                  if (vertex == goal) {
                        // Set found to true and stop iteration
                        found = true;
                  } else {
                        // Recur for every adjacent node
                        let adjacencyList = this.adjacencyMap.get(vertex)!;
                        for (var i = 0; i < adjacencyList.length; i++) {
                              let adjacentVertex = adjacencyList[i];
                              if (!visited.get(adjacentVertex)) {
                                    depthFirstTraversal(adjacentVertex, goal);
                              }
                        }
                  }
            };

            depthFirstTraversal(from, find);

            return found;
      }

      /**
      * Is Cyclic
      * - O(n^2)
      * - Checks to see if the graph contains cycles.
      * @returns True if a cycle is found, false otherwise.
      */
      public isCyclic():boolean {

            // Constants to keep track of visits and recurrences in the map
            let VISIT_KEY:string = "visited";
            let RECUR_KEY:string = "recurred";

            // Keeps track of visited vertices
            var tracker = new MCMap<T, MCMap<string, boolean>>();
            this.adjacencyMap.keys().forEach((key:T) => {
                  var keyTrack = new MCMap<string, boolean>();
                  keyTrack.set(VISIT_KEY, false);
                  keyTrack.set(RECUR_KEY, false);
                  tracker.set(key, keyTrack);
            });

            // Cycle utility function
            let isCyclicChain = (vertex:T):boolean => {
                  // Assure the vertex is not visited
                  if (!tracker.get(vertex)!.get(VISIT_KEY)) {
                        // Mark the vertex as visited
                        tracker.get(vertex)!.set(VISIT_KEY, true);
                        tracker.get(vertex)!.set(RECUR_KEY, true);

                        // Recur for all adjacent vertices
                        for (var i = 0; i < this.adjacencyMap.get(vertex)!.length; i++) {
                              let adjacentVertex = this.adjacencyMap.get(vertex)![i];
                              let isRecurred = tracker.get(adjacentVertex)!.get(RECUR_KEY);
                              let isVisited = tracker.get(adjacentVertex)!.get(VISIT_KEY);

                              // If the adjacent vertex was recurred in this chain or has a cyclic chain, return true
                              if (isRecurred || (isVisited && isCyclicChain(adjacentVertex))) {
                                    return true;
                              }
                        }
                  }
                  // Remove the vertex from the recurrence chain
                  tracker.get(vertex)!.set(RECUR_KEY, true);

                  // Return false for no found cycles
                  return false;
            };

            let keys = this.adjacencyMap.keys();
            for (var i = 0; i < keys.length; i++) {
                  if (isCyclicChain(keys[i])) {
                        return true;
                  }
            }

            return false;
      }

      /**
      * Get Connected Subgraphs
      * - // TODO: - Test
      * - O(n^4)
      * - Greedy method that gets a list of connected subgraphs of the given graph.
      * - If the entire graph is connected, it returns a list containing the graph, itself.
      * @returns A list of connected subgraphs.
      */
      public getConnectedSubgraphs():MCArray<MCGraph<T>> {

            // Store all keys in an array
            let keys = this.adjacencyMap.keys();

            // Map of vertices used in subgraphs to ensure uniqueness
            var usedVertices = new MCMap<T, boolean>();

            // Iterative function that generates connected subgraphs
            // O(n^2)
            let getSubgraphFromVertex = (vertex:T):MCGraph<T> => {

                  // The subgraph to create
                  var graph = new MCGraph<T>();

                  // Map for checking vertices found in graph
                  var verticesInGraph = new MCMap<T, boolean>();

                  // Add the vertex to the new graph
                  graph.addVertex(vertex);
                  usedVertices.set(vertex, true);
                  verticesInGraph.set(vertex, true);

                  // Loop through adjacent vertices and add them to the graph (O(n))
                  this.adjacencyMap.get(vertex)!.forEach((adjacentVertex) => {
                        graph.addVertex(adjacentVertex);
                        graph.addEdge(vertex, adjacentVertex);
                        usedVertices.set(adjacentVertex, true);
                        verticesInGraph.set(adjacentVertex, true);
                  });

                  // Loop through all other vertices' adjacency lists
                  // O(n^2)
                  for (var i = 0; i < keys.length; i++) {
                        // Assure the key is not the vertex that's already been checked
                        if (keys[i] != vertex) {
                              // Get the adjacency list of the vertex
                              let adjacencyList = this.adjacencyMap.get(keys[i])!;

                              // Push the vertex and edge if an adjacent vertex is found.
                              adjacencyList.forEach((adjacentVertex) => {
                                    if (verticesInGraph.has(adjacentVertex)) {
                                          graph.addVertex(keys[i]);
                                          usedVertices.set(keys[i], true);
                                          graph.addEdge(keys[i], adjacentVertex);
                                    }
                              });
                        }
                  }

                  return graph;
            };

            // Store unique subgraphs here
            var subgraphs = new MCArray<MCGraph<T>>();

            // O(n^3)
            for (var i = 0; i < keys.length; i++) {
                  let vertex = keys[i];

                  // Check uniqueness
                  if (!usedVertices.has(vertex)) {
                        // Push the unique graph to the list
                        subgraphs.push(getSubgraphFromVertex(vertex));
                  }
            }

            return subgraphs;
      }

      /**
      * To String
      * - O(n)
      * - Returns the graph as a string in neat format.
      * @returns A string representation of the graph.
      */
      public toString():string {
            var graphStringList = new MCArray<string>();
            this.adjacencyMap.forEach((vertex:T, adjacencyList:MCArray<T>) => {
                  graphStringList.push(`${vertex} => ${adjacencyList.join(', ')}`);
            });
            return graphStringList.length > 0 ? `( ${graphStringList.join("; ")} )` : "()";
      }

      /**
      * Equals
      * - O(n)
      * - Checks to see if the graph is equal to another graph.
      * @param otherGraph Other graph to test equality with.
      * @returns True if the graph is equal to the other graph, false otherwise.
      */
      public equals(otherGraph:MCGraph<T>):boolean {
            return this.adjacencyMap.equals(otherGraph.adjacencyMap);
      }

}
