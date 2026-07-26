/**
 * Integration & E2E DOM Test Suite for Robotics Announce (Node.js)
 * Simulates DOM environment and tests full user flow and UI state transitions.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// 1. Setup minimal DOM Mock for Node environment
class ElementMock {
    constructor(tagName, className = '', id = '') {
        this.tagName = tagName.toUpperCase();
        this.className = className;
        this.id = id;
        this.children = [];
        this.innerHTML = '';
        this.innerText = '';
        this.value = '';
        this.classList = {
            _classes: new Set(className.split(' ').filter(Boolean)),
            add: (cls) => this.classList._classes.add(cls),
            remove: (cls) => this.classList._classes.delete(cls),
            contains: (cls) => this.classList._classes.has(cls)
        };
        this.eventListeners = {};
    }

    addEventListener(event, fn) {
        if (!this.eventListeners[event]) this.eventListeners[event] = [];
        this.eventListeners[event].push(fn);
    }

    dispatchEvent(eventObj) {
        if (!eventObj.target) eventObj.target = this;
        const listeners = this.eventListeners[eventObj.type] || [];
        listeners.forEach(fn => fn(eventObj));
    }

    querySelector(selector) {
        return mockQuerySelector(this, selector);
    }

    querySelectorAll(selector) {
        return mockQuerySelectorAll(this, selector);
    }

    closest(selector) {
        if (selector.startsWith('.') && this.classList.contains(selector.slice(1))) return this;
        if (selector.startsWith('#') && this.id === selector.slice(1)) return this;
        if (selector === 'form.search' && this.tagName === 'FORM' && this.classList.contains('search')) return this;
        if (selector === 'a.detail-trigger' && this.tagName === 'A' && this.classList.contains('detail-trigger')) return this;
        return null;
    }

    get childElementCount() {
        return this.children.length;
    }

    get textContent() {
        return this.innerHTML.replace(/<[^>]*>/g, '');
    }
}

function mockQuerySelector(root, selector) {
    const all = mockQuerySelectorAll(root, selector);
    return all.length > 0 ? all[0] : null;
}

const dummyInfoMock = new ElementMock('div', 'div-info');

function mockQuerySelectorAll(root, selector) {
    let results = [];
    const walk = (node) => {
        let match = false;
        if (selector === 'header.header' && node.tagName === 'HEADER' && node.classList.contains('header')) match = true;
        else if (selector === 'body' && node.tagName === 'BODY') match = true;
        else if (selector === 'form.search' && node.tagName === 'FORM' && node.classList.contains('search')) match = true;
        else if (selector === 'div.board' && node.tagName === 'DIV' && node.classList.contains('board')) match = true;
        else if (selector === 'div#display' && node.id === 'display') match = true;
        else if (selector === 'input#nim' && node.id === 'nim') match = true;
        else if (selector === 'div.notice' && node.classList.contains('notice')) match = true;
        else if (selector === 'div.board span.ujicobaZZ' && node.classList.contains('ujicobaZZ')) match = true;
        else if (selector === 'div.timer1 div.div-clock span.day' && node.classList.contains('day')) match = true;
        else if (selector === 'div.timer1 div.div-clock span.hour' && node.classList.contains('hour')) match = true;
        else if (selector === 'div.timer1 div.div-clock span.mint' && node.classList.contains('mint')) match = true;
        else if (selector === 'div.timer1 div.div-clock span.sec' && node.classList.contains('sec')) match = true;
        else if (selector === 'div.timer2 div.div-clock span.day' && node.classList.contains('day')) match = true;
        else if (selector === 'div.timer2 div.div-clock span.hour' && node.classList.contains('hour')) match = true;
        else if (selector === 'div.timer2 div.div-clock span.mint' && node.classList.contains('mint')) match = true;
        else if (selector === 'div.timer2 div.div-clock span.sec' && node.classList.contains('sec')) match = true;
        else if (selector === 'div.info' || selector === '.div-info') {
            if (node.classList.contains('div-info') || boardMock.innerHTML.includes('div-info')) {
                results.push(dummyInfoMock);
                return;
            }
        }
        if (match) results.push(node);

        for (let child of node.children) walk(child);
    };
    walk(root);
    return results;
}

// Construct Mock Document & Window
const bodyMock = new ElementMock('body');
const headerMock = new ElementMock('header', 'header');
const searchFormMock = new ElementMock('form', 'search');
const nimInputMock = new ElementMock('input', 'input-search', 'nim');
const noticeMock = new ElementMock('div', 'notice');
const boardMock = new ElementMock('div', 'board');
const displayMock = new ElementMock('div', '', 'display');

const timer1Mock = new ElementMock('div', 'timer1');
const clockDiv1 = new ElementMock('div', 'div-clock');
const t1Day = new ElementMock('span', 'day');
const t1Hour = new ElementMock('span', 'hour');
const t1Mint = new ElementMock('span', 'mint');
const t1Sec = new ElementMock('span', 'sec');
clockDiv1.children.push(t1Day, t1Hour, t1Mint, t1Sec);
timer1Mock.children.push(clockDiv1);

const timer2Mock = new ElementMock('div', 'timer2');
const clockDiv2 = new ElementMock('div', 'div-clock');
const t2Day = new ElementMock('span', 'day');
const t2Hour = new ElementMock('span', 'hour');
const t2Mint = new ElementMock('span', 'mint');
const t2Sec = new ElementMock('span', 'sec');
clockDiv2.children.push(t2Day, t2Hour, t2Mint, t2Sec);
timer2Mock.children.push(clockDiv2);

searchFormMock.children.push(nimInputMock, noticeMock);
bodyMock.children.push(headerMock, timer1Mock, timer2Mock, searchFormMock, boardMock, displayMock);

global.document = {
    querySelector: (selector) => mockQuerySelector(bodyMock, selector),
    querySelectorAll: (selector) => mockQuerySelectorAll(bodyMock, selector)
};
global.window = {
    addEventListener: () => {},
    pageYOffset: 0,
    location: { replace: () => {} }
};
global.body = bodyMock;
global.DOMPurify = {
    sanitize: (str) => str
};
global.escapeHtmlEntities = (str) => str;

// Load Data
const dataFilePath = path.join(__dirname, '../src/database/data.js');
eval(fs.readFileSync(dataFilePath, 'utf8'));
global.data = data;

// Load Interaction JS logic
const interactionFilePath = path.join(__dirname, '../src/script/interaction.js');
var interactionCode = fs.readFileSync(interactionFilePath, 'utf8');
eval(interactionCode);

console.log("=== RUNNING E2E DOM INTEGRATION TESTS ===");

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`✅ PASSED: ${name}`);
        passed++;
    } catch (e) {
        console.error(`❌ FAILED: ${name}`);
        console.error(e);
        failed++;
    }
}

// ---------------- E2E TESTS ---------------- //

test("1. Countdown Timer Initialization", () => {
    assert.strictEqual(t1Sec.innerHTML, "00");
});

test("2. Search attempt before countdown completion (tampilkan = false)", () => {
    nimInputMock.value = "20539144016";
    const event = { type: 'submit', preventDefault: () => {}, stopPropagation: () => {} };
    searchFormMock.dispatchEvent(event);
    assert(noticeMock.innerHTML.includes("belum memasuki waktu pengumuman"), "Should reject search before countdown");
});

test("3. Search attempt with empty input (tampilkan = true)", () => {
    // Unlock countdown
    tampilkan = true;
    nimInputMock.value = "";
    const event = { type: 'submit', preventDefault: () => {}, stopPropagation: () => {} };
    searchFormMock.dispatchEvent(event);
    assert(noticeMock.innerHTML.includes("masukan tidak boleh kosong"), "Should display empty error notice");
});

test("4. Search attempt for Lolos Participant (NIM: 20539144016 - Muhammad Ilham Sony)", () => {
    tampilkan = true;
    nimInputMock.value = "20539144016";
    const event = { type: 'submit', preventDefault: () => {}, stopPropagation: () => {} };
    searchFormMock.dispatchEvent(event);

    assert(boardMock.innerHTML.includes("Muhammad Ilham Sony"), "Board should display participant name");
    assert(boardMock.innerHTML.includes("Lolos"), "Board should render Lolos status");
    assert(boardMock.innerHTML.includes("text-green-900"), "Board should use green color styling for Lolos");
});

test("5. Search attempt for Gagal Participant (NIM: 1212070056 - Muhamad Rizky Hadiningrat)", () => {
    tampilkan = true;
    nimInputMock.value = "1212070056";
    const event = { type: 'submit', preventDefault: () => {}, stopPropagation: () => {} };
    searchFormMock.dispatchEvent(event);

    assert(boardMock.innerHTML.includes("Muhamad Rizky Hadiningrat"), "Board should display participant name");
    assert(boardMock.innerHTML.includes("Gagal"), "Board should render Gagal status");
    assert(boardMock.innerHTML.includes("text-red-900"), "Board should use red color styling for Gagal");
});

test("6. Search attempt for Unregistered NIM (NIM: 9999999999)", () => {
    tampilkan = true;
    nimInputMock.value = "9999999999";
    const event = { type: 'submit', preventDefault: () => {}, stopPropagation: () => {} };
    searchFormMock.dispatchEvent(event);

    assert(noticeMock.innerHTML.includes("nim mahasiswa tidak terdaftar"), "Should display unregistered NIM notice");
});

console.log(`\nE2E DOM Integration Test Summary: ${passed} Passed, ${failed} Failed.`);
if (failed > 0) process.exit(1);
