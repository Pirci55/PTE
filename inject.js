window.addEventListener('DOMContentLoaded', function () {
    const element = document.createElement('script');

    element.appendChild(document.createTextNode(`window.PTE = ${PTE};`));
    element.appendChild(document.createTextNode('window.PTE();'));
    element.appendChild(document.createTextNode('delete window.PTE;'));

    document.body.appendChild(element);

    element.remove();
});
