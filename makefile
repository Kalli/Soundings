all: build_js clean bookmarklet
.PHONY: bookmarklet

BOOKMARKLET := $(shell ./node_modules/.bin/bookmarklet ./dist/bookmarklet.js)

bookmarklet: clean
	cp ./public/bookmarklet.html ./bookmarklet/index.html
	@sed -i -e "s/REPLACE_ME/$(BOOKMARKLET)/g" ./bookmarklet/index.html
	@rm bookmarklet/index.html-e

build_js:
	yarn build

clean:
	rm -rf bookmarklet
	mkdir bookmarklet
	mkdir bookmarklet/public
