import Plugin from './@plugin';

export default new Plugin()
    .setOnce(function () {
        (function update() {
            document.body.click();
            setTimeout(() => {
                update();
            }, Math.random() * 300000);
        })();
    });