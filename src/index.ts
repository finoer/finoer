export const sum = (a: number, b: number) => {
    if ('development' === process.env.NODE_ENV) {
      console.log('boop');
    }
    return a + b;
  };

  /**
 * Returns the average of two numbers.
 *
 * @remarks
 * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
 *
 * @param x - The first input number
 * @param y - The second input number
 * @returns The arithmetic mean of `x` and `y`
 *
 * @beta
 */
function getAverage (x:number, y:number):number {
  return (x + y) / 2.0;
}
