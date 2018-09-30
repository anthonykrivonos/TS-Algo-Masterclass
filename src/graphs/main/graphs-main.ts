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
      * - Adds a vertex to the graph.
      * @param from One vertex to create the edge from.
      * @param to One vertex to create the edge to.
      * @returns True if the edge was added, false otherwise.
      */
      public addEdge(from:T, to:T):boolean {
            if (this.adjacencyMap.has(from) && !this.adjacencyMap.get(from)!.includes(to) && this.adjacencyMap.has(to) && !this.adjacencyMap.get(to)!.includes(from)) {
                  this.adjacencyMap.get(from)!.push(to);
                  this.adjacencyMap.get(to)!.push(from);
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
                  this.adjacencyMap.delete(vertex);
                  this.adjacencyMap.forEach((adjacencyList, adjacentVertex) => {
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
            if (this.adjacencyMap.has(from) && this.adjacencyMap.get(from)!.includes(to) && this.adjacencyMap.has(to) && this.adjacencyMap.get(to)!.includes(from)) {
                  let indexOfTo = this.adjacencyMap.get(from)!.indexOf(to);
                  let indexOfFrom = this.adjacencyMap.get(to)!.indexOf(from);
                  this.adjacencyMap.get(from)!.splice(indexOfTo, 1);
                  this.adjacencyMap.get(to)!.splice(indexOfFrom, 1);
                  return true;
            }
            return false;
      }

      /**
      * Breadth First Traversal
      * - O(n)
      * - Search each neighboring vertex.
      * - If not found, search the depth of each neighboring vertex.
      * - Keep track of checked vertices.
      * @param from Vertex to start the search from.
      * @param for Vertex to search for.
      * @returns True if the vertex was found, false otherwise.
      */
      public breadthFirstSearch(from:T, find:T):boolean {
            var visited = new MCArray();
            var visit = new MCQueue();

            // Visit the from element
            visited.push(from);

            // Recur while visit queue is non-empty
            while (!visit.isEmpty()) {
                  let currentVertex = visit.poll() as T;

                  if (currentVertex === find) {
                        return true;
                  }

                  this.adjacencyMap.get(currentVertex)!.forEach((vertex) => {
                        if (!visited.includes(vertex)) {
                              visited.push(vertex);
                              visit.add(vertex);
                        }
                  });
            }

            return false;
      }

}
