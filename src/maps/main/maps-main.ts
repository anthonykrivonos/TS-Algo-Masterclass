/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.20.2018
 * Maps/Main
 */

import * as Utility from "../../utility";
import "../../extensions";

import { MCArray } from '../../arrays/main/arrays-main';
import { MCLinkedList, MCLinkedListNode } from '../../linked-lists/main/linked-lists-main';

/**
 * Masterclass hash map/hash table implemented from the ground up.
 */
export class MCMap<KeyType, ValueType> {

      /**
       * Default number of buckets.
       */
      private static DEFAULT_BUCKET_COUNT:number = 10;

      /**
       * Load factor threshold.
       */
      private static LOAD_FACTOR_THRESHOLD:number = 0.75;

      /**
       * Container for arrays of chains.
       */
      private bucket:MCArray<MCMapNode<KeyType, ValueType>>;

      /**
       * Number of buckets in the bucket array.
       */
      private bucketCount:number;

      /**
       * Size of bucket.
       */
      private bucketSize:number;

      /**
       * Constructor
       * - Creates an MCMap from a regular map.
       * @param map Optional map to reconstruct.
       */
      constructor(bucketCount:number = MCMap.DEFAULT_BUCKET_COUNT) {
            this.bucket = new MCArray<MCMapNode<KeyType, ValueType>>();
            this.bucketCount = bucketCount;
            this.bucketSize = 0;
      }

      // Private Methods

      /**
       * Hash
       * - Converts a key to a hashed integer.
       * - Represents the item's index.
       * @returns A hashed integer.
       */
      private hash(key:KeyType):number {
            return (key as any as string).hashCode() % this.bucketCount;
      }

      /**
       * Is Threshold Exceeded?
       * - Checks if the load factor has exceeded the default threshold.
       * @returns True if the load factor was exceeded, false otherwise.
       */
      private isThresholdExceeded():boolean {
            return this.bucketSize/this.bucketCount >= MCMap.LOAD_FACTOR_THRESHOLD;
      }

      /**
       * Expand If Needed
       * - Double the number of buckets in the map, if needed.
       * - "Needed" means the load factor threshold has been exceeded.
       * @returns True if the bucket count is doubled, fals otherwise.
       */
      private expandIfNeeded():boolean {
            if (this.isThresholdExceeded()) {
                  let tempBucket = this.bucket.copy();
                  this.bucket = new MCArray<MCMapNode<KeyType, ValueType>>();
                  this.bucketCount *= 2;
                  this.bucketSize = 0;

                  tempBucket.forEach((head:MCMapNode<KeyType, ValueType> | null) => {
                        while (head) {
                              this.set(head.getKey(), head.getValue());
                              head = head.getNext();
                        }
                  });
                  return true;
            }
            return false;
      }

      // Public Methods

      /**
       * Size
       * - Returns the size of the map.
       * @returns The size of the map.
       */
      public size():number {
            return this.bucketSize;
      }

      /**
       * Is Empty
       * - Checks to see if the size of the map is 0.
       * @returns True if the map is empty, false otherwise.
       */
      public isEmpty():boolean {
            return this.bucketSize === 0;
      }

      /**
       * Remove
       * - Removes the value at the specified key.
       * - @param key The key to remove.
       * @returns The removed value.
       */
      public remove(key:KeyType):ValueType | null {

            // Hash the index of the key and store it
            let hashedKey = this.hash(key);

            // Store the head of the chain
            var head = this.bucket[hashedKey];

            // Search for the key within its chain
            var previousHead = null;
            while (head) {
                  // Find the key
                  if (head.getKey() == key) {
                        break;
                  }

                  // Otherwise, move along in the chain
                  previousHead = head;
                  head = head.getNext();
            }

            // Return null if the key was not found
            if (!head) {
                  return null;
            }

            // Remove the key
            if (previousHead) {
                  previousHead.setNext(head!.getNext());
            } else {
                  this.bucket[hashedKey] = head!.getNext();
            }

            // Decrement the size
            this.bucketSize--;

            return head!.getValue();
      }

      /**
       * Has
       * - Checks if the key exists in the map.
       * @param key The key to check for.
       * @returns True if the key was found, false otherwise.
       */
      public has(key:KeyType):boolean {
            return this.get(key) != null;
      }

      /**
       * Get
       * - Gets the value at the specified key.
       * @param key The key to get the value from.
       * @returns The found value or null.
       */
      public get(key:KeyType):ValueType | null {

            // Hash the index of the key and store it
            let hashedKey = this.hash(key);

            // Store the head of the chain
            var head = this.bucket[hashedKey];

            // Search for the key within its chain and return, if found
            while (head) {
                  // Find the key
                  if (head.getKey() == key) {
                        return head.getValue();
                  }
                  head = head.getNext();
            }

            // Return null otherwise
            return null;
      }

      /**
       * Set
       * - Sets the value at the specified key.
       * @param key The key to set.
       * @param value The value to set.
       */
      public set(key:KeyType, value:ValueType):void {

            // Hash the index of the key and store it
            let hashedKey = this.hash(key);

            // Store the head of the chain
            var head = this.bucket[hashedKey];

            // Search for the key within its chain
            while (head) {
                  // If the key is found, overwrite it
                  if (head.getKey() == key) {
                        head.setValue(value);
                        return;
                  }
                  head = head.getNext();
            }

            // Insert the key into the chain
            head = this.bucket[hashedKey];
            let newNode = new MCMapNode(key, value, head);
            this.bucket[hashedKey] = newNode;

            // Increment the size
            this.bucketSize++;

            // Check if the load factor exceeds the threshold. If so, double the bucket's size.
            this.expandIfNeeded();
      }

      /**
       * Equals
       * - O(n)
       * - Checks to see if this map is equal to another map.
       * @param otherMap Another map to test equality for.
       * @returns True if equal, false otherwise.
       */
      public equals(otherMap:MCMap<KeyType, ValueType>):boolean {
            return this.toArray().equals(otherMap.toArray());
      }

      /**
       * For Each
       * - Iterates through the map and calls the callback function with 'key' and 'value' as parameters.
       * @param callback A function with header (key:KeyType, value:ValueType):void.
       */
      public forEach(callback:{(key:KeyType, value:ValueType):void}):void {
            this.bucket.forEach((head:MCMapNode<KeyType, ValueType> | null) => {
                  while (head) {
                        callback(head.getKey(), head.getValue());
                        head = head.getNext();
                  }
            });
      }

      /**
       * Keys
       * - Gets the keys from the map as an array.
       * @returns An array of keys from the map.
       */
      public keys():MCArray<KeyType> {
            var keys = new MCArray<KeyType>();
            this.forEach((key:KeyType, value:ValueType) => {
                  keys.push(key);
            });
            return keys;
      }

      /**
       * Values
       * - Gets values from the map as an array.
       * @returns An array of values from the map.
       */
      public values():MCArray<ValueType> {
            var values = new MCArray<ValueType>();
            this.forEach((key:KeyType, value:ValueType) => {
                  values.push(value);
            });
            return values;
      }

      /**
       * To Array
       * - Returns the map as an array in the form [ [key, value], ... ].
       * @returns An array of map keys/value pairs.
       */
      public toArray():MCArray<MCArray<any>> {
            var pairs = new MCArray<MCArray<any>>();
            this.forEach((key:KeyType, value:ValueType) => {
                  pairs.push(new MCArray<any>(key, value));
            });
            return pairs;
      }

      /**
      * To String
      * - O(n^2)
      * - Returns the map as a string in neat format.
      * @returns A string representation of the map.
      */
      public toString():string {
            var mapStringList = new MCArray<string>();
            this.forEach((key:KeyType, value:ValueType) => {
                  mapStringList.push(`'${key}': ${value}`);
            });
            return mapStringList.length > 0 ? `{ ${mapStringList.join(", ")} }` : "{ }";
      }

      /**
      * Parse
      * - O(n)
      * - Parses the map into an object literal.
      * @returns The map as a parsed object literal.
      */
      public parse():object {
            return JSON.parse(this.toString());
      }

}

class MCMapNode<KeyType, ValueType> extends MCLinkedListNode<ValueType> {

      private key:KeyType;

      /**
       * Constructor
       * - Creates an new map node.
       * @param key Key for the node.
       * @param value Value of the node.
       * @param next Next node in the list (optional).
       */
      constructor(key:KeyType, value:ValueType, next:MCMapNode<KeyType, ValueType> | null = null) {
            super(value, next);
            this.key = key;
      }

      /**
       * Get Key
       * - Gets the key for the node.
       * @returns Returns the value.
       */
      public getKey():KeyType {
            return this.key;
      }

      /**
       * Get Key
       * - Gets the next node in the map chain.
       * @returns Returns the next node.
       */
      public getNext():MCMapNode<KeyType, ValueType> {
            return super.getNext() as MCMapNode<KeyType, ValueType>;
      }

      /**
       * Set Key
       * - Set the key of the node.
       * @param key The key to set.
       */
      public setKey(key:KeyType):void {
            this.key = key;
      }

}
