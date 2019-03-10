# loy

> Like Joi but for outputs

Loy is a little helper for defining REST outputs, Aimed to be used inside the [Moser web framework](https://github.com/fega/mongo-server).

Loy accomplish two missions:

- Define the REST output in order to generate documentation automatically.
- Restrict output fields based on user's permissions.

## Usage

Define an output function:

```javascript
import {Give} from 'Joi'

const out:(resource,user)=>{
  return {
    field1: Give(resource.field1, user)
      .for('admin') // define the necessary user permission
      .or('user') // alternative permission
      // documentation:
      .as('string')
      .example('field example')
      .description('field description')
      // always finish with this:
      .ok()
  }
}

```

Moser will execute the function, and return the field only if the user have the permission.

to get the output definition

```javascript
import {Give, Describe} from 'Joi'

const description= Describe(out)

```
