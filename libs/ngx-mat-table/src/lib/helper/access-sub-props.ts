// TODO typed access of subproperties
/**
 * Access nested object properties using .-notation.
 *
 * @param arg
 * @param prop
 */
export function accessSubProp<T>(arg: T, prop: string): any {
  const separator = '.';
  if(!arg || !prop) {
    return null;
  }

  const keys: string[] = prop.split(separator);

  if (!keys) {
    throw new Error('Something is wrong');
  }

  return keys.reduce((o, p) => o && o[p], arg)
}


