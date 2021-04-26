import assert from 'assert';
import { readFileSync } from 'fs';
import { resolve, } from 'path';
import { rollup } from 'rollup';
import include from '../include.js';

process.chdir('test');

async function runBundle(samplePath)
{
  const bundle = await rollup({
    input: samplePath,
    plugins: [ include() ]
  });
  
  const { output: [{ code }] } = await bundle.generate({
    format: 'es'
  });
  
  //console.log('Generated code:');
  //console.log(code);
  
  (new Function('assert', 'readFileSync', 'resolve', code))(assert, readFileSync, resolve);
}

describe('rollup-plugin-include test', () => {
  it('includes js-file and executes functions from it', async () => runBundle('./sample1.js'));
  it('includes html template into variable and check its value', async () => runBundle('./sample2.js'));
}); 
