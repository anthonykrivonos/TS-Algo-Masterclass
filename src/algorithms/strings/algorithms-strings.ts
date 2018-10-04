


// O(n)
function palindromeCheck(strA:string, strB:string) {
      let combinedStr = strA.concat(strB);
      var i = 0;
      var j = combinedStr.length - 1;
      while (i != j) {
            if (combinedStr[i] != combinedStr[j]) {
                  return false;
            }
      }
      return true;
}

// O(n^3)
function palindromePairs(arr:Array<string>) {

      var pairs:Array<Array<number>> = [];

      // O(n^3)
      arr.forEach((str, index) => {
            for (var i = 0; i < arr.length && i != index; i++) {
                  if (palindromeCheck(arr[index], arr[i])) {
                        pairs.push([index, i]);
                  }
            }
      });

      return pairs;

}

console.log(palindromeCheck("race", "car") ? "Yes" : "No");
palindromePairs(["race", "car", "ab", "hi"]);
