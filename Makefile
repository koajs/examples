test:
	@./node_modules/.bin/mocha \
		--harmony-generators \
		--reporter spec \
		--require should \
		examples/*/test.js

.PHONY: test