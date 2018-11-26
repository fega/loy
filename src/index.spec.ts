// tslint:disable:no-expression-statement
import test from 'ava';
import { Give, Test, Describe } from '.';

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
test('Doy(Test,userAdmin).is("admin").send()', async t => {
  const r = Give(Test, { permissions: ["admin"] }).for('admin').ok()
  t.deepEqual(r,
    {
      examples: [],
      models: [],
      permissions: ['admin']
    }
  )
});
test('Doy(Test,userAdmin).as(String).is("admin").send()', async t => {
  const r = Give(Test, { permissions: ["admin"] })
    .for('admin')
    .as(String)
    .example('hello')
    .description('A field description')
    .ok()
  t.deepEqual(r,
    {
      examples: ['hello'],
      description: 'A field description',
      models: [String],
      permissions: ['admin'],
    }
  )
});

test('Describe function', (t) => {
  const description = Describe((resource, user) => ({
    name: Give(resource.name, user)
      .for('admin')
      .as(String)
      .example('hello')
      .description('A field description')
      .ok(),
    other: resource.other,
  }))
  t.deepEqual(description, {
    name: {
      examples: ['hello'],
      description: 'A field description',
      models: [String],
      permissions: ['admin'],
    },
    other: {
      models: [String]
    }
  })
})
