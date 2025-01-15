import config from './config';
import * as tools from './tools';
import * as plugins from './plugins/@pluginsExports';

const tempAppName = tools.genString();
const exportToPage = {
    tempAppName,
    plugins,
    config,
    tools,
    APP,
};

function APP(extension: typeof exportToPage) {
    const inGameVariable: object | undefined = window[extension.config.inject_variable];
    if (extension.config.debug) {
        console.log(
            `%c${extension.config.app_name} namespace: window.${extension.tempAppName}`,
            extension.config.green_log_style
        );
        console.log(window[extension.tempAppName]);

        if (!inGameVariable)
            console.log(
                `%c${extension.config.app_name}: ${extension.config.inject_variable} not found`,
                extension.config.red_log_style
            );
    };

    Object.values(extension.plugins).forEach((plugin: any) => {
        plugin.default.once({ ...extension, inGameVariable });
    });

    let timestamp = 0;
    let oldFrameTimestamp = 0;
    let frameTime = 0;
    let avgFrameTime = 0;
    let frameTimeBuffer = [];
    let deltaTime = 0;
    let avgDeltaTime = 0;
    let deltaTimeTimeBuffer = [];
    (function frame() {
        timestamp = Date.now();

        frameTime = timestamp - oldFrameTimestamp;
        deltaTime = frameTime / 1000;
        oldFrameTimestamp = timestamp;

        frameTimeBuffer.push(frameTime);
        deltaTimeTimeBuffer.push(deltaTime);
        if (frameTimeBuffer.length >= 10) frameTimeBuffer.shift();
        if (deltaTimeTimeBuffer.length >= 10) deltaTimeTimeBuffer.shift();
        avgFrameTime = frameTimeBuffer.reduce((a, b) => a + b) / frameTimeBuffer.length
        avgDeltaTime = deltaTimeTimeBuffer.reduce((a, b) => a + b) / deltaTimeTimeBuffer.length

        Object.values(extension.plugins).forEach((plugin: any) => {
            plugin.default.update({
                ...extension,
                inGameVariable,
                oldFrameTimestamp,
                timestamp,
                frameTime,
                avgFrameTime,
                deltaTime,
                avgDeltaTime,
            });
        });

        window.requestAnimationFrame(frame);
    })();

    return {
        update: {
            ...extension,
            inGameVariable,
            oldFrameTimestamp,
            timestamp,
            frameTime,
            avgFrameTime,
            deltaTime,
            avgDeltaTime,
        },
        once: {
            ...extension,
            inGameVariable,
        },
    };
};

export type pluginOnceExports = ReturnType<typeof APP>['once'];
export type pluginUpdateExports = ReturnType<typeof APP>['update'];

window.addEventListener('DOMContentLoaded', function () {
    const element = document.createElement('script');

    // преобразование данных в текст
    let script = `window.${tempAppName} = {};`;
    Object.entries(exportToPage).forEach(([key, value]) => {
        script += `window.${tempAppName}.${key} = ${tools.toString(value)};`;

        if (toString.call(value) == '[object Function]')
            script += `window.${tempAppName}.${key}(${tools.toString(exportToPage)});`;
    });

    // инжект на страницу
    element.appendChild(document.createTextNode(script));
    document.body.appendChild(element);

    if (!config.debug) {
        element.appendChild(document.createTextNode(`delete window.${tempAppName};`));
        element.remove();
    } else console.log('%cScript injected', config.green_log_style);
});
