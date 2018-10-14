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
* Masterclass graph implementation.
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

}
