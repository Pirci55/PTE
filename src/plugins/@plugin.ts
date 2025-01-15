import { src } from './@pluginsImports';

export default class {
    constructor() { };
    setOnce(callback: (event: src.index.pluginOnceExports) => void) {
        this.once = callback; return this;
    };
    setUpdate(callback: (event: src.index.pluginUpdateExports) => void) {
        this.update = callback; return this;
    };
    once = (event: src.index.pluginOnceExports) => { };
    update = (event: src.index.pluginUpdateExports) => { };
};
