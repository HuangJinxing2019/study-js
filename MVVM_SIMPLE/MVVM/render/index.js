import {eventCompile} from "../compiler/event";
import {stateCompiler} from "../compiler/state";

export const render = (template, state) => {

  template = eventCompile(template);
  template = stateCompiler(template, state)
  return template
}