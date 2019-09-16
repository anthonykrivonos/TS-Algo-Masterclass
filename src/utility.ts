/**
 * Anthony Krivonos
 * Typescript Algorithm Masterclass
 * 09.20.2018
 * Utility
 */

//
// Constants
//

export const PERCEPTION_THRESHOLD:number = 30;

//
// Public Functions
//

/**
 * Expect
 * - O(1 * (runtime of func))
 * - Analyzes and prints the runtime and return of a function on an object.
 */
export function expect(func:Function, forObject:Object | null | void = null, expectedResult:any, ...withParameters:any[]):void {
      withParameters = withParameters === undefined ? [] : withParameters;

      const functionName = func.name;
      const objectValue = forObject ? forObject.toLocaleString() : JSON.stringify(forObject);

      const startTime = new Date().getTime();
      const result = func.apply(forObject, withParameters);
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      const durationS = (endTime - startTime)/1000;

      const didFail = result !== expectedResult

      const timeIndicator = duration < PERCEPTION_THRESHOLD ? (duration < PERCEPTION_THRESHOLD / 2 ? "✅" : "⚠️") : "🚨";

      console.log(`
${timeIndicator} ${functionName} ${didFail ? 'FAILED' : 'SUCCEEDED'}${forObject != null ? ` on ❮ ${objectValue} ❯` : ""}
  ⮑ Returned${result != null ? `: ${result}` : ' nothing'}${!didFail ? '' : `
  ❗️ Should have returned${expectedResult != null ? `: ${expectedResult}` : ' nothing'}`}
  📣 Called ${withParameters.length > 0 ? `with argument${withParameters.length == 1 ? "" : "s"} ( ${withParameters.join(",")} )` : "with no arguments"}
  ⏳ Took ${durationS}s`);
};

/**
 * Analyze
 * - O(1 * (runtime of func))
 * - Analyzes and prints the runtime and return of a function on an object.
 */
export function analyze(func:Function, forObject:Object | null | void = null, ...withParameters:any[]):void {
      withParameters = withParameters === undefined ? [] : withParameters;

      let functionName = func.name;
      let objectValue = forObject ? forObject.toLocaleString() : JSON.stringify(forObject);

      let startTime = new Date().getTime();
      let result = func.apply(forObject, withParameters);
      let endTime = new Date().getTime();
      let duration = endTime - startTime;
      let durationS = (endTime - startTime)/1000;

      let timeIndicator = duration < PERCEPTION_THRESHOLD ? (duration < PERCEPTION_THRESHOLD / 2 ? "✅" : "⚠️") : "🚨";

      console.log(`
${timeIndicator} ${functionName} called${forObject != null ? ` on ❮ ${objectValue} ❯` : ""}
  ⮑ Returned${result != null ? `: ${result}` : ' nothing'}
  📣 Called ${withParameters.length > 0 ? `with argument${withParameters.length == 1 ? "" : "s"} ( ${withParameters.join(",")} )` : "with no arguments"}
  ⏳ Took ${durationS}s`);
};

/**
 * Print
 * - O(1)
 * - Prints a debug message.
 */
export function print(message:string):void {
      console.log(`${new Date().toLocaleTimeString()}: ${message}`);
}

/**
 * Factorial
 * - O(n)
 * - Calculates the factorial value of a number.
 * @return The factorial of ofNum.
 */
export function factorial(ofNum:number):number {
      return ofNum === 0 ? 1 : ofNum * factorial(ofNum - 1);
}
