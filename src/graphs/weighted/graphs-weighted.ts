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
      * Add Weighted Vertex
      * - Adds a vertex to the graph.
      * @param vertex Vertex to add.
      * @param weight Weight of vertex to add.
      * @returns True if the vertex was added, false otherwise.
      */
      public addVertex(vertex:T, weight:number):boolean {
            if (!this.adjacencyWeightedMap.has(vertex)) {
                  this.adjacencyWeightedMap.set(vertex, new MCArray<MCWeightedEdge<T>>());
                  return true;
            }
            return false;
      }

      /**
      * Add Weighted Edge
      * TODO: - Test
      * - Adds a weighted edge to the graph.
      * @param from One vertex to create the edge from.
      * @param to One vertex to create the edge to.
      * @returns True if the edge was added, false otherwise.
      */
      public addEdge(from:T, to:T, weight:number):boolean {

            let weightedVertex = new MCWeightedEdge(to, weight);

            let weightedEdges = this.adjacencyWeightedMap.get(from);
            if (weightedEdges != null && !weightedEdges.includes(weightedVertex)) {
                  weightedEdges!.push(weightedVertex);
                  return true;
            }

            return false;
      }

      /**
      * Remove Weighted Vertex
      * TODO: - Test
      * - Removes a vertex from the graph.
      * - Removes all edges connected to other vertices.
      * @param vertex Vertex to add.
      * @returns True if the vertex was removed, false otherwise.
      */
      public removeVertex(vertex:T):boolean {
            if (this.adjacencyWeightedMap.has(vertex)) {
                  this.adjacencyWeightedMap.delete(vertex);
                  this.adjacencyWeightedMap.forEach((adjacencyList, adjacentVertex) => {
                        for (var i = 0; i < adjacencyList.length; i++) {
                              if (adjacencyList[i].vertex == vertex) {
                                    adjacencyList.splice(i, 1);
                              }
                        }
                        this.adjacencyWeightedMap.set(adjacentVertex, adjacencyList);
                  });
                  return true;
            }
            return false;
      }

      /**
      * Remove Weighted Edge
      * TODO: - Test
      * - Removes an edge from the graph.
      * @param from One vertex to remove the edge from.
      * @param to One vertex to remove the edge to.
      * @returns True if the edge was removed, false otherwise.
      */
      public removeEdge(from:T, to:T):boolean {
            if (this.adjacencyWeightedMap.has(from)) {
                  let weightedEdges = this.adjacencyWeightedMap.get(from)!;
                  for (var i = 0; i < weightedEdges.length; i++) {
                        if (weightedEdges[i].vertex == to) {
                              weightedEdges.splice(i, 1);
                              return true;
                        }
                  }
            }

            return false;
      }

      /**
      * Breadth First Traversal
      * TODO: - Test
      * - O(n^2)
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

                  this.adjacencyWeightedMap.get(currentVertex)!.forEach((vertex) => {
                        if (!visited.includes(vertex)) {
                              visited.push(vertex);
                              visit.add(vertex);
                        }
                  });
            }

            return false;
      }

      /**
      * Depth First Traversal
      * TODO: - Test
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
            Array.from(this.adjacencyWeightedMap.keys()).forEach((key:T) => {
                  visited.set(key, false);
            });

            // Helper function
            let depthFirstTraversal = (vertex:T, goal:T):boolean => {
                  if (vertex == goal) {
                        return true;
                  }

                  // Visit the from element
                  visited.set(vertex, true);

                  // Recur for every adjacent node
                  for (var i = 0; i < this.adjacencyWeightedMap.get(vertex)!.length; i++) {
                        let adjacentVertex = this.adjacencyWeightedMap.get(vertex)![i];
                        if (!visited.get(adjacentVertex.vertex)) {
                              return false || depthFirstTraversal(adjacentVertex.vertex, goal);
                        }
                  }
                  return false;
            };

            return depthFirstTraversal(from, find);
      }

}

/**
* Masterclass weighted edge implementation.
*/
class MCWeightedEdge<T> {

      public vertex:T;
      public weight:number;

      /**
      * Constructor
      * - Constructs a weighted vertex from a vertex value and a weight.
      * @param vertex The actual value of the vertex.
      * @param weight The weight associated with an edge to this vertex.
      */
      constructor(vertex:T, weight:number) {
            this.vertex = vertex;
            this.weight = weight;
      }

}
