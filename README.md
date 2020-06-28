# how to use

```js
const createProcess = require('control-process')

const createProcess({
	data: {
		name: 'Robert Oliver'
	},
	verificationIfHaveAName: (data) => {
		if(!data.name) {
			return {
				error: 'not have a name'
			}
		}

		return data
	}
})
```