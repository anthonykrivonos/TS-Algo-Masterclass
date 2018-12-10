/**
* Anthony Krivonos
* Typescript Algorithm Masterclass
* 09.27.2018
* Graphs/Weighted
*/

import { MCArray } from "../../arrays/main/arrays-main";
import { MCMap } from "../../maps/main/maps-main";
import { MCQueue } from "../../queues/main/queues-main";
import { MCPriorityQueue } from "../../queues/priority/queues-priority";

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
      * Get Edge
      * O(n)
      * - Gets the edge between two vertices.
      * @param from The vertex the edge starts from.
      * @param to The vertex the edge ends at.
      * @returns The edge between these two vertices or null.
      */
      public getEdge(from:T, to:T):MCWeightedEdge<T> | null {
            if (this.adjacencyWeightedMap.has(from)) {
                  let adjacencyList = this.adjacencyWeightedMap.get(from)!;
                  for (var i = 0; i < adjacencyList.length; i++) {
                        let edge = adjacencyList[i];
                        if (edge.to === to) {
                              return edge;
                        }
                  }
            }
            return null;
      }

      /**
      * Has Edge
      * O(n)
      * - Returns true if there is an edge between two vertices.
      * @param from The vertex the edge starts from.
      * @param to The vertex the edge ends at.
      * @returns True if an edge exists between the two vertices, else false.
      */
      public hasEdge(from:T, to:T):boolean {
            return this.getEdge(from, to) != null;
      }

      /**
      * Add UndirectedEdge
      * - Adds a weighted edge to the graph in two directions.
      * @param vertexA One vertex to create the edge from.
      * @param vertexB One vertex to create the edge to.
      * @param weight The weight of the edge.
      * @returns True if the edge was added, false otherwise.
      */
      public addUndirectedEdge(vertexA:T, vertexB:T, weight:number):boolean {
            let weightedEdgeA = new MCWeightedEdge(vertexA, vertexB, weight);
            let weightedEdgeB = new MCWeightedEdge(vertexB, vertexA, weight);

            if (this.adjacencyWeightedMap.has(vertexA) && this.adjacencyWeightedMap.has(vertexB) && !this.adjacencyWeightedMap.get(vertexA)!.includes(weightedEdgeA) &&
            !this.adjacencyWeightedMap.get(vertexB)!.includes(weightedEdgeB)) {
                  this.adjacencyWeightedMap.get(vertexA)!.push(weightedEdgeA);
                  this.adjacencyWeightedMap.get(vertexB)!.push(weightedEdgeB);
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
      * Is Cyclic (Union-Find)
      * - O(n^2)
      * - Checks to see if the graph contains cycles.
      * @returns True if a cycle is found, false otherwise.
      */
      public isCyclicUF():boolean {
            var parent = new MCMap<T, MCWeightedEdge<T>>();
            let edges = this.adjacencyWeightedMap.values().flattened();

            console.log(edges);

            for (var i = 0; i < edges.length; i++) {
                  let edge = edges[i];

                  let firstFind = this.find(parent, edge.from);
                  let secondFind = this.find(parent, edge.to);

                  if (firstFind == secondFind) {
                        return true;
                  }

                  this.union(parent, firstFind, secondFind);
            }

            return false;
      }

      /**
      * Get Kruskal Tree
      * - O(|E| + |V|)
      * - Returns the minimum spanning tree from the graph using Kruskal's Algorithm.
      * - The graph must be unweighted, or an undesired solution will be given.
      * @returns The minimum spanning tree for the MCGraph.
      */
      public getKruskalTree():MCWeightedGraph<T> {

            // Create a new graph (minimum spanning tree) with the given vertices, but no edges: O(n)
            var minSpanTree = new MCWeightedGraph<T>();
            this.adjacencyWeightedMap.keys().forEach((vertex) => minSpanTree.addVertex(vertex));

            // Parent map to keep track of union-find chains amongst the vertices to remove cycles
            var parent = new MCMap<T, MCWeightedEdge<T>>();

            // Create a set of the graph's edges: O(n^2)
            var edgeSet = this.adjacencyWeightedMap.values().flattened();

            // Sort the edges by weight
            edgeSet.sort((edgeA, edgeB) => edgeA.weight - edgeB.weight);

            // Add the minimum weight edge to the graph: O(n^2)
            while (!edgeSet.isEmpty()) {
                  // Pop the minimum edge from the front of the edge set
                  let minEdge = edgeSet.shift()!;

                  // If the source and destination of the edge dont share a chain, add the edge to the min spanning tree
                  if (minSpanTree.find(parent, minEdge.from) != this.find(parent, minEdge.to)) {
                        minSpanTree.addUndirectedEdge(minEdge.from, minEdge.to, minEdge.weight);

                        // Add the minEdge vertices to the parent map
                        minSpanTree.union(parent, minEdge.from, minEdge.to);
                  }
            }

            // Return the generated minimum spanning tree
            return minSpanTree;
      }

      /**
      * Get Prim Tree
      * - O(|E| + |V|)
      * - Returns the minimum spanning tree from the graph using Prim's Algorithm.
      * - The graph must be unweighted, or an undesired solution will be given.
      * - 1. Initialize a tree with a single vertex, chosen arbitrarily from the graph.
      * - 2. Grow the tree by one edge: of the edges that connect the tree to vertices not yet in the tree, find the minimum-weight edge, and transfer it to the tree. Repeat until all vertices are in the tree.
      * @returns The minimum spanning tree for the MCGraph.
      */
      public getPrimTree():MCWeightedGraph<T> {

            // Create a new graph (minimum spanning tree) with the given vertices, but no edges: O(n)
            var minSpanTree = new MCWeightedGraph<T>();

            // List of required vertices
            let vertexQueue = new MCQueue<T>();

            // Create a set of the graph's edges
            var edgeSet = this.adjacencyWeightedMap.values().flattened()!;

            // If edges and vertices exist
            if (edgeSet.length > 0) {

                  // Sort the edges by weight
                  edgeSet.sort((edgeA, edgeB) => edgeA.weight - edgeB.weight);

                  // Get the minimum edge in the set
                  var minEdge = edgeSet.shift()!;

                  // Add the vertices connected by the minimum edge to the graph
                  var vertex = minEdge.to;
                  vertexQueue.add(vertex);
                  minSpanTree.addVertex(vertex);

                  let keysNeeded = this.adjacencyWeightedMap.keys().length;

                  while (vertexQueue.size() < keysNeeded) {

                        // Get the vertex from the bottom of the queue
                        vertex = vertexQueue.peek();

                        // Get the vertex's adjacency list
                        let adjacencyList = this.adjacencyWeightedMap.get(vertex)! as MCArray<MCWeightedEdge<T>>;

                        // Sort list by edge weight
                        adjacencyList.mergeSort();

                        for (var i = 0; i < adjacencyList.length; i++) {
                              if (!minSpanTree.adjacencyWeightedMap.has(adjacencyList[i].to)) {
                                    vertexQueue.add(adjacencyList[i].to);
                                    minSpanTree.addVertex(adjacencyList[i].to);
                                    minSpanTree.addUndirectedEdge(adjacencyList[i].from, adjacencyList[i].to, adjacencyList[i].weight);
                              }
                        }

                  }

            }

            // Return the generated minimum spanning tree
            return minSpanTree;
      }

      /**
      * Djikstra
      * - O(|E| + |V|log|V|)
      * - Finds the shortest path between two vectors using Djikstra's algorithm.
      * @returns The minimum weight to get from the `from` vertex to the `to` vertex.
      */
      public djikstra(from:T, to:T) {

            // Key that tracks the vertex
            let VERTEX_KEY = 0;
            // Key that tracks the distance of each vertex as a weight
            let WEIGHT_KEY = 1;

            // "Infinity" value indicating that this path was not examined yet
            let INFINITY = Number.MAX_VALUE;

            // Priority queue storing the distances from `from` to every other vertex
            var weightQueue = new MCPriorityQueue<MCArray<any>>((a:MCArray<any>, b:MCArray<any>) => a[WEIGHT_KEY] - b[WEIGHT_KEY]);

            // Store vertices in an array
            let vertices = this.adjacencyWeightedMap.keys();

            // Function to add element from the queue
            let addToQueue = (vertex:T, weight:number) => {
                  weightQueue.add(new MCArray<any>(vertex, weight));
            };

            // Array of map of distances
            var distanceMap = new Map<T, number>();
            vertices.forEach((vertex) => {
                  if (vertex === from) {
                        // Add `from` to the queue with a distance of 0 to itself
                        distanceMap.set(from, 0);
                        addToQueue(from, 0);
                  } else {
                        distanceMap.set(vertex, INFINITY);
                  }
            });

            // Loop through vertices until all have been accounted for
            while (!weightQueue.isEmpty()) {

                  // Extract the smallest weight vector from the priority queue
                  let currentVertex = weightQueue.poll()![VERTEX_KEY];

                  // Iterate through adjacent vertices
                  this.adjacencyWeightedMap.get(currentVertex)!.forEach((edge:MCWeightedEdge<T>) => {
                        let adjacentVertex = edge.to;
                        if (adjacentVertex != from) {
                              let adjacentWeight = edge.weight;

                              // Check if the shortest path is produced from adjacentVertex through currentVertex
                              if (distanceMap.get(adjacentVertex)! > distanceMap.get(currentVertex)! + adjacentWeight) {
                                    // Update adjacentVertex's distance
                                    let newDistance = distanceMap.get(currentVertex)! + adjacentWeight;
                                    distanceMap.set(adjacentVertex, newDistance);
                                    addToQueue(adjacentVertex, newDistance);
                              }
                        }
                  });

            }

            return distanceMap.get(to);
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

      // Private Methods

      /**
      * Find
      * - Used for union-find algorithm.
      * - Finds the deepest edge for some vertex.
      * @param parent Map of vertices to their subsequent edges.
      * @param vertex Vertex to find.
      * @returns The last vertex in the given vertex's chain.
      */
      private find(parent:MCMap<T, MCWeightedEdge<T>>, vertex:T):T {
            if (!parent.has(vertex)) {
                  return vertex;
            }
            return this.find(parent, parent.get(vertex)!.to);
      }

      /**
      * Union
      * - O(n)
      * - Used for union-find algorithm.
      * - Possibly adds the edge between two vertices to the parent map.
      * @param parent Map of vertices to their subsequent edges.
      * @param vertexA First vertex to join.
      * @param vertexB Second vertex to join.
      */
      private union(parent:MCMap<T, MCWeightedEdge<T>>, vertexA:T, vertexB:T):void {
            let findEdgeA = this.find(parent, vertexA);
            let findEdgeB = this.find(parent, vertexB);
            if (findEdgeA != findEdgeB) {
                  let edge = this.getEdge(vertexA, vertexB);
                  if (edge != null) {
                        parent.set(vertexA, edge);
                  }
            }
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
