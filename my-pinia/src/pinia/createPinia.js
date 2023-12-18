import { effectScope, ref } from "vue";
import { piniaSymbol } from "./global";

export default function createPinia () {
  /**
   * {
   *   state
   * }
   */
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  const store = new Map();

  return {
    store,
    state,
    scope,
    install
  }
}

function install (app) {
  app.provide(piniaSymbol, this);
}