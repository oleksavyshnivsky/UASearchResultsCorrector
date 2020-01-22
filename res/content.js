// ==UserScript==
// @name         GoogleResultsCorrector
// @namespace    https://github.com/oleksavyshnivsky
// @version      0.1
// @description  Виправлення результатів Google-пошуку
// @author       Oleksa Vyshnivsky
// @match        https://www.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Заміна посилань
    Array.from(document.getElementsByClassName('g')).forEach((el) => {
        el.innerHTML = el.innerHTML.replace(/\/ru\//gi, '/en/')
    })
    // Зміна описів
    Array.from(document.getElementsByClassName('s')).forEach((el) => {
        if (
            el.innerText.includes('ы')
            || el.innerText.includes('Ы')
            || el.innerText.includes('э')
            || el.innerText.includes('Э')
            || el.innerText.includes('ъ')
            || el.innerText.includes('Ъ')
        ) el.innerHTML = el.innerHTML = '<span style="color: red;">[усунено]</span>'
    })
})()
