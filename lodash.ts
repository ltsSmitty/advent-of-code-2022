import { createRequire } from "https://deno.land/std@0.167.0/node/module.ts";
const Lodash = createRequire(import.meta.url)('./lodash');
export default Lodash;