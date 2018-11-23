// tslint:disable:no-expression-statement
import test from 'ava';
import { Give } from '.';

test('Doy().send()', async t => {
  const r = Give(1).ok()
  t.is(r, 1)
});
test('Doy().is().send()', async t => {
  const r = Give(1).for('admin').ok()
  t.is(r, undefined)
});

test('Doy(1,userAdmin).is("admin").send()', async t => {
  const r = Give(1, { permissions: ["admin"] }).for('admin').ok()
  t.is(r, 1)
});
