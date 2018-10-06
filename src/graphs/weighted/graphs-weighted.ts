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

      private adjacencyWeightedMap:MCMap<MCWeightedVertex<T>, MCArray<MCWeightedVertex<T>>>;

      /**
      * Map Get
      * - Gets a weighted vertex from the map from a given vertex.
      * @param vertex Vertex to get.
      * @returns MCWeightedVertex for the given vertex or null if not found.
      */
      private mapGet(vertex:T):MCWeightedVertex<T> | null {
            let adjacencyWeightedKeys = Array.from(this.adjacencyWeightedMap.keys());
            for (var i = 0; i < adjacencyWeightedKeys.length; i++) {
                  if (adjacencyWeightedKeys[i].vertex === vertex) {
                        return adjacencyWeightedKeys[i];
                  }
            }
            return null;
      }

      /**
      * Map Get Edges
      * - Gets a weighted vertex's edges in a map from a given vertex.
      * @param vertex Vertex to get the edges for.
      * @returns MCArray of MCWeightedVertex edges or an empty array if not found.
      */
      private mapGetEdges(vertex:T):MCArray<MCWeightedVertex<T>> {
            let adjacencyWeightedKeys = Array.from(this.adjacencyWeightedMap.keys());
            for (var i = 0; i < adjacencyWeightedKeys.length; i++) {
                  if (adjacencyWeightedKeys[i].vertex === vertex) {
                        return this.adjacencyWeightedMap.get(adjacencyWeightedKeys[i]!)!;
                  }
            }
            return new MCArray<MCWeightedVertex<T>>();
      }

      /**
      * Map Has
      * - Checks to see if the weighted adjacency map has a vertex.
      * @param vertex Vertex to check for.
      * @returns True if it contains the vertex, false otherwise.
      */
      private mapHas(vertex:T):boolean {
            return this.mapGet(vertex) != null;
      }

      /**
      * Constructor
      * - Creates an MCMap from a regular map.
      * @param map Optional map to reconstruct.
      */
      constructor() {
            this.adjacencyWeightedMap = new MCMap<MCWeightedVertex<T>, MCArray<MCWeightedVertex<T>>>();
      }

      /**
      * Add Weighted Vertex
      * - Adds a vertex to the graph.
      * @param vertex Vertex to add.
      * @param weight Weight of vertex to add.
      * @returns True if the vertex was added, false otherwise.
      */
      public addVertex(vertex:T, weight:number):boolean {
            let weightedVertex = new MCWeightedVertex(vertex, weight);
            if (!this.adjacencyWeightedMap.has(weightedVertex)) {
                  this.adjacencyWeightedMap.set(weightedVertex, new MCArray<MCWeightedVertex<T>>());
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
      public addEdge(from:T, to:T):boolean {

            let fromVertex = this.mapGet(from)!;
            let toVertex = this.mapGet(to)!;

            if (fromVertex != null && toVertex != null) {
                  if (this.adjacencyWeightedMap.get(fromVertex!)!.includes(toVertex!) && this.adjacencyWeightedMap.get(toVertex!)!.includes(fromVertex!)) {
                        this.adjacencyWeightedMap.get(fromVertex)!.push(toVertex);
                        this.adjacencyWeightedMap.get(toVertex)!.push(fromVertex);
                        return true;
                  }
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
            let weightedVertex = this.mapGet(vertex)
            if (weightedVertex != null) {
                  this.adjacencyWeightedMap.delete(weightedVertex!);
                  this.adjacencyWeightedMap.forEach((adjacencyList, adjacentVertex) => {
                        let indexOfVertex = adjacencyList.indexOf(weightedVertex!);
                        if (indexOfVertex > -1) {
                              adjacencyList.splice(indexOfVertex, 1);
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

            let fromVertex = this.mapGet(from);
            let toVertex = this.mapGet(to);

            if (fromVertex != null && toVertex != null) {
                  if (this.adjacencyWeightedMap.get(fromVertex!)!.includes(toVertex!) && this.adjacencyWeightedMap.get(toVertex!)!.includes(fromVertex!)) {
                        let indexOfTo = this.adjacencyWeightedMap.get(fromVertex!)!.indexOf(toVertex!);
                        let indexOfFrom = this.adjacencyWeightedMap.get(toVertex!)!.indexOf(fromVertex!);
                        this.adjacencyWeightedMap.get(fromVertex!)!.splice(indexOfTo, 1);
                        this.adjacencyWeightedMap.get(toVertex!)!.splice(indexOfFrom, 1);
                        return true;
                  }
            }

            return false;
      }

      /**
      * Breadth First Traversal
      * TODO: - Test
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
                  let currentVertex = visit.poll() as MCWeightedVertex<T>;

                  if (currentVertex.vertex === find) {
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

}

/**
* Masterclass weighted vertex implementation.
*/
class MCWeightedVertex<T> {

      public vertex:T;
      public weight:number;

      constructor(vertex:T, weight:number) {
            this.vertex = vertex;
            this.weight = weight;
      }

}
