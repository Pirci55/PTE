function PTE() {
    (function update() {
        document.body.click();
        setTimeout(() => {
            update();
        }, Math.random() * 300000);
    })();
};
