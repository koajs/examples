lint:
	@./node_modules/.bin/eslint .

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--harmony \
		--reporter spec \
		--require should \
		*/test.js

.PHONY: lint test
