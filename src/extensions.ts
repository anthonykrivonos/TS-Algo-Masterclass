/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 10.13.2018
 * Extensions
 */

// MARK: - String
interface String {
      hashCode():number;
}

// hashCode Implementation
String.prototype.hashCode = function():number {
      var hash = 0;
      if (this.length == 0) {
         return hash;
      }
      for (var i = 0; i < this.length; i++) {
         var char = this.charCodeAt(i);
         hash = ((hash<<5)-hash)+char;
         hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
};

// ---------------------------------------------------------//

// MARK: - Number
interface Number {
      hashCode():number;
}

// hashCode Implementation
Number.prototype.hashCode = function():number {
      return this.valueOf();
};

// ---------------------------------------------------------//

// MARK: - Function
interface Function {
      hashCode():number;
}

// hashCode Implementation
Function.prototype.hashCode = function():number {
      return this.name.hashCode();
};

// ---------------------------------------------------------//

// MARK: - Object
interface Object {
      hashCode():number;
}

// hashCode Implementation
Object.prototype.hashCode = function():number {
      return JSON.stringify(this).hashCode();
};
