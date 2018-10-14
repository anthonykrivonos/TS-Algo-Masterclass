/**
* Anthony Krivonos
* Typescript Algorithm Masterclass
* 09.27.2018
* Graphs/Weighted
*/

import { MCArray } from "../../arrays/main/arrays-main";
import { MCMap } from "../../maps/main/maps-main";
import { MCQueue } from "../../queues/main/queues-main";

/**
* Masterclass weighted graph implementation.
*/
export class MCWeightedGraph<T> {

      private adjacencyWeightedMap:MCMap<T, MCArray<MCWeightedEdge<T>>>;

      /**
      * Constructor
      * - Creates an MCMap from a regular map.
      * @param map Optional map to reconstruct.
      */
      constructor() {
            this.adjacencyWeightedMap = new MCMap<T, MCArray<MCWeightedEdge<T>>>();
      }

      /**
      * Add Vertex
      * - Adds a vertex to the graph.
      * @param vertex Vertex to add.
      * @returns True if the vertex was added, false otherwise.
      */
      public addVertex(vertex:T):boolean {
            if (!this.adjacencyWeightedMap.has(vertex)) {
                  this.adjacencyWeightedMap.set(vertex, new MCArray<MCWeightedEdge<T>>());
                  return true;
            }
            return false;
      }

      /**
      * Add Edge
      * - Adds a weighted edge to the graph.
      * @param from One vertex to create the edge from.
      * @param to One vertex to create the edge to.
      * @param weight The weight of the edge.
      * @returns True if the edge was added, false otherwise.
      */
      public addEdge(from:T, to:T, weight:number):boolean {
            let weightedEdge = new MCWeightedEdge(from, to, weight);

            if (this.adjacencyWeightedMap.has(from) && this.adjacencyWeightedMap.has(to) && !this.adjacencyWeightedMap.get(from)!.includes(weightedEdge)) {
                  this.adjacencyWeightedMap.get(from)!.push(weightedEdge);
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
            if (this.adjacencyWeightedMap.has(vertex)) {
                  this.adjacencyWeightedMap.remove(vertex);
                  this.adjacencyWeightedMap.forEach((adjacentVertex:T, weightedAdjacencyList:MCArray<MCWeightedEdge<T>>) => {
                        var edgeIndex = -1;
                        for (var i = 0; i < weightedAdjacencyList.length; i++) {
                              if (weightedAdjacencyList[i].to == vertex) {
                                    edgeIndex = i;
                                    break;
                              }
                        }
                        if (edgeIndex >= 0) {
                              weightedAdjacencyList.splice(edgeIndex, 1);
                              this.adjacencyWeightedMap.set(adjacentVertex, weightedAdjacencyList);
                        }
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
            var edgeIndex = -1;
            if (this.adjacencyWeightedMap.has(from)) {
                  // Find the index of the edge to remove
                  let weightedAdjacencyList = this.adjacencyWeightedMap.get(from)!;
                  for (var i = 0; i < weightedAdjacencyList.length; i++) {
                        if (weightedAdjacencyList[i].to == to) {
                              edgeIndex = i;
                              break;
                        }
                  }
                  if (edgeIndex >= 0) {
                        // Remove the found edge
                        this.adjacencyWeightedMap.get(from)!.splice(edgeIndex, 1);
                        return true;
                  }
            }
            // Edge not found
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
            this.adjacencyWeightedMap.keys().forEach((key:T) => {
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
                        this.adjacencyWeightedMap.get(currentVertex!)!.forEach((weightedEdge:MCWeightedEdge<T>) => {
                              if (!visitMap.get(weightedEdge.to)) {
                                    visit(weightedEdge.to);
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
            this.adjacencyWeightedMap.keys().forEach((key:T) => {
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
                        let adjacencyList = this.adjacencyWeightedMap.get(vertex)!;
                        for (var i = 0; i < adjacencyList.length; i++) {
                              let adjacentEdge = adjacencyList[i];
                              if (!visited.get(adjacentEdge.to)) {
                                    depthFirstTraversal(adjacentEdge.to, goal);
                              }
                        }
                  }
            };

            depthFirstTraversal(from, find);

            return found;
      }

      /**
      * To String
      * - O(n)
      * - Returns the weighted graph as a string in neat format.
      * @returns A string representation of the graph.
      */
      public toString():string {
            var graphStringList = new MCArray<string>();
            this.adjacencyWeightedMap.forEach((vertex:T, weightedAdjacencyList:MCArray<MCWeightedEdge<T>>) => {
                  graphStringList.push(`${vertex} => ${weightedAdjacencyList.map((weightedEdge:MCWeightedEdge<T>) => `${weightedEdge.to}{${weightedEdge.weight}}`).join(', ')}`);
            });
            return graphStringList.length > 0 ? `( ${graphStringList.join("; ")} )` : "()";
      }

}

/**
* Masterclass weighted edge implementation.
*/
class MCWeightedEdge<T> {

      public from:T;
      public to:T;
      public weight:number;

      /**
      * Constructor
      * - Constructs a weighted vertex from a vertex value and a weight.
      * @param vertex The actual value of the vertex.
      * @param weight The weight associated with an edge to this vertex.
      */
      constructor(from:T, to:T, weight:number) {
            this.from = from;
            this.to = to;
            this.weight = weight;
      }

}
