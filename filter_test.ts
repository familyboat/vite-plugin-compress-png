import {fromFileUrl, join} from '@std/path';
import { filter } from "./filter.ts";
import {assertEquals} from '@std/assert';

Deno.test("compress()", async function() {
  const testData = new URL('test_data', import.meta.url);
  const dir = fromFileUrl(testData);

  const compressed = await filter(dir, '*.png');
  const expected = [
    join(dir, 'dog.png')
  ]
  assertEquals(compressed, expected);
})