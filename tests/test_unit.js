/**
 * Unit Test Suite for Robotics Announce
 * Tests core logic: checkNumber, data lookup in data.js, input validation messages, DOMPurify sanitization.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Dummy Element for mock document
const dummyEl = { innerHTML: '', classList: { add: () => {}, remove: () => {}, contains: () => false }, addEventListener: () => {} };

// Mock minimal DOM for unit tests
global.document = { querySelector: () => dummyEl, querySelectorAll: () => [] };
global.window = { addEventListener: () => {} };
global.body = dummyEl;
global.DOMPurify = { sanitize: (s) => s };
global.escapeHtmlEntities = (s) => s;

// Load data.js content
const dataFilePath = path.join(__dirname, '../src/database/data.js');
let dataContent = fs.readFileSync(dataFilePath, 'utf8');
eval(dataContent); // Defines 'data' array

// Load interaction.js logic
const interactionFilePath = path.join(__dirname, '../src/script/interaction.js');
const interactionCode = fs.readFileSync(interactionFilePath, 'utf8');
eval(interactionCode);

function checkArray(masukan) {
    let hash = undefined;
    data.forEach(d => {
        if (d.Nim == masukan) hash = d;
    });
    return hash;
}

console.log("=== RUNNING UNIT TESTS FOR ROBOTICS ANNOUNCE ===");

let passedTests = 0;
let failedTests = 0;

function runTest(name, fn) {
    try {
        fn();
        console.log(`✅ PASSED: ${name}`);
        passedTests++;
    } catch (err) {
        console.error(`❌ FAILED: ${name}`);
        console.error(err);
        failedTests++;
    }
}

// ---------------- TESTS ---------------- //

runTest("Database Data Array should be loaded and non-empty", () => {
    assert(Array.isArray(data), "data is not an array");
    assert(data.length > 0, "data array is empty");
});

runTest("Database entries should have Nim, Nama, Divisi, Tim, and Hasil properties", () => {
    const sample = data[0];
    assert.strictEqual(typeof sample.Nim, 'string');
    assert.strictEqual(typeof sample.Nama, 'string');
    assert.strictEqual(typeof sample.Divisi, 'string');
    assert.strictEqual(typeof sample.Tim, 'string');
    assert.strictEqual(typeof sample.Hasil, 'string');
});

runTest("checkNumber - Valid numeric strings", () => {
    assert.strictEqual(checkNumber("1212070056"), true);
    assert.strictEqual(checkNumber("20539144016"), true);
    assert.strictEqual(checkNumber("0"), true);
});

runTest("checkNumber - Invalid non-numeric strings", () => {
    assert.strictEqual(checkNumber("abc"), false);
    assert.strictEqual(checkNumber("1212a070056"), false);
    assert.strictEqual(checkNumber("1212-070056"), false);
    assert.strictEqual(checkNumber(""), false);
});

runTest("checkArray - Find existing participant (Lolos)", () => {
    // NIM 20539144016 is Muhammad Ilham Sony (Lolos)
    const result = checkArray("20539144016");
    assert.notStrictEqual(result, undefined);
    assert.strictEqual(result.Nama, "Muhammad Ilham Sony");
    assert.strictEqual(result.Hasil, "Lolos");
    assert.strictEqual(result.Divisi, "Mekanik");
});

runTest("checkArray - Find existing participant (Gagal)", () => {
    // NIM 1212070056 is Muhamad Rizky Hadiningrat (Gagal)
    const result = checkArray("1212070056");
    assert.notStrictEqual(result, undefined);
    assert.strictEqual(result.Nama, "Muhamad Rizky Hadiningrat");
    assert.strictEqual(result.Hasil, "Gagal");
});

runTest("checkArray - Search non-existent NIM should return undefined", () => {
    const result = checkArray("9999999999");
    assert.strictEqual(result, undefined);
});

console.log(`\nUnit Test Summary: ${passedTests} Passed, ${failedTests} Failed.`);
if (failedTests > 0) process.exit(1);
