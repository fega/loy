// tslint:disable:no-expression-statement
import test from 'ava';
import { Give, Test, Describe, describe, give } from '.';
import { primitiveToString } from './util'

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
    .as('string')
    .example('hello')
    .description('A field description')
    .ok()
  t.deepEqual(r,
    {
      examples: ['hello'],
      description: 'A field description',
      models: ['string'],
      permissions: ['admin'],
    }
  )
});

test('Describe function', (t) => {
  const description = Describe((resource, user) => ({
    name: Give(resource.name, user)
      .for('admin')
      .as('string')
      .example('hello')
      .description('A field description')
      .ok(),
    other: resource.other,
  }))
  t.deepEqual(description, {
    name: {
      examples: ['hello'],
      description: 'A field description',
      models: ['string'],
      permissions: ['admin'],
    },
    other: {
      models: ['string']
    }
  })
})
test('Describe function 2', t => {
  const d = describe(resource => ({
    hello: give(resource.hello).as('string').description('a field').ok(),
  }))
  t.deepEqual(d, {
    hello: {
      description: 'a field',
      examples: [],
      models: [
        'string',
      ],
      permissions: [],
    }
  })
})
/**
 * Primitive to String
 */
test('primitiveToString(String)', (t) => {
  t.is(primitiveToString(String), 'String')
})
test('primitiveToString(Number)', (t) => {
  t.is(primitiveToString(Number), 'Number')
})
test('primitiveToString(Boolean)', (t) => {
  t.is(primitiveToString(Boolean), 'Boolean')
})
test('primitiveToString("Url")', (t) => {
  t.is(primitiveToString("Url"), "Url")
})