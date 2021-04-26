// @include(./included/functions.js)

assert.ok(typeof sum == 'function');
assert.equal(sum(5, 3), 5 + 3);

assert.ok(typeof product == 'function');
assert.equal(product(5, 3), 5 * 3);