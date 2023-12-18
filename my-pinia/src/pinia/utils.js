import { isRef } from "vue";

export function getArgs (args) {
  /**
   * id,
   * options,  { id: xxx }
   * setup
   */
  let id;
  let options;
  let setup;

  if (isString(args[0])) {
    id = args[0];

    if (isFunction(args[1])) {
      setup = args[1];
    } else {
      options = args[1];
    }
  } else {
    options = args[0];
    id = args[0].id;
  }

  return {
    id,
    options,
    setup
  }
}

export function isString (value) {
  return typeof value === 'string';
}

export function isFunction (value) {
  return typeof value === 'function';
}

export function isComputed (value) {
  return !!(isRef(value) && value.effect);
}