TAG = $$(git describe --tags --abbrev=0)

.PHONY: setup-for-mac
setup-for-mac:
	# https://bun.sh/docs/installation
	curl -fsSL https://bun.sh/install | bash

.PHONY: clean
clean:
	rm -rf dist || true

.PHONY: init
init:
	git submodule update --init --recursive
	bun i

.PHONY: audit_fix
audit_fix:
	yarn run yarn-audit-fix

.PHONY: release_prepatch
release_prepatch:
	git stash
	$(eval NEW_TAG := $(shell npm version prepatch))
	git tag -d $(TAG)
	cd katex && npm version prepatch
	git reset HEAD^ && git add . && git commit -m $(NEW_TAG) && git tag $(NEW_TAG)

.PHONY: release_preminor
release_preminor:
	git stash
	$(eval NEW_TAG := $(shell npm version preminor))
	git tag -d $(TAG)
	cd katex && npm version preminor
	git reset HEAD^ && git add . && git commit -m $(NEW_TAG) && git tag $(NEW_TAG)

.PHONY: release_prerelease
release_prerelease:
	git stash
	$(eval NEW_TAG := $(shell npm version prerelease))
	git tag -d $(TAG)
	cd katex && npm version prerelease
	git reset HEAD^ && git add . && git commit -m $(NEW_TAG) && git tag $(NEW_TAG)

.PHONY: release_patch
release_patch:
	git stash
	$(eval NEW_TAG := $(shell npm version patch))
	git tag -d $(TAG)
	cd katex && npm version patch
	git reset HEAD^ && git add . && git commit -m $(NEW_TAG) && git tag $(NEW_TAG)

.PHONY: release_minor
release_minor:
	git stash
	$(eval NEW_TAG := $(shell npm version minor))
	git tag -d $(TAG)
	cd katex && npm version minor
	git reset HEAD^ && git add . && git commit -m $(NEW_TAG) && git tag $(NEW_TAG)

.PHONY: release_major
release_major:
	git stash
	$(eval NEW_TAG := $(shell npm version major))
	git tag -d $(TAG)
	cd katex && npm version major
	git reset HEAD^ && git add . && git commit -m $(NEW_TAG) && git tag $(NEW_TAG)

.PHONY: analyze
analyze:
	yarn && yarn run analyze

.PHONY: analyze_katex
analyze_katex:
	cd katex && yarn && yarn run analyze

.PHONY: version
version:
	bun run version

.PHONY: build
build: version build_js build_css
#build: version build_js build_css build_js_katex build_css_katex

.PHONY: build_js
build_js:
	bun run build-js
	bun run build-type

.PHONY: build_js_katex
build_js_katex:
	mv package.json package.json.tmp
	cp katex/package.json . && bun run build-js
	mv package.json.tmp package.json

.PHONY: build_css
build_css:
	yarn
	yarn run build-default-css
	yarn run build-dark-css
	yarn run build-darkbronco-css
	yarn run build-dorkula-css
	yarn run build-chesterish-css
	yarn run build-grade3-css
	yarn run build-gruvboxd-css
	yarn run build-gruvboxl-css
	yarn run build-monokai-css
	yarn run build-oceans16-css
	yarn run build-onedork-css
	yarn run build-solarizedd-css
	yarn run build-solarizedl-css

.PHONY: build_css_katex
build_css_katex:
	cd katex && yarn
	cd katex && yarn run build-default-css
	cd katex && yarn run build-dark-css
	cd katex && yarn run build-darkbronco-css
	cd katex && yarn run build-dorkula-css
	cd katex && yarn run build-chesterish-css
	cd katex && yarn run build-grade3-css
	cd katex && yarn run build-gruvboxd-css
	cd katex && yarn run build-gruvboxl-css
	cd katex && yarn run build-monokai-css
	cd katex && yarn run build-oceans16-css
	cd katex && yarn run build-onedork-css
	cd katex && yarn run build-solarizedd-css
	cd katex && yarn run build-solarizedl-css

.PHONY: storybook
storybook:
	yarn && yarn run storybook

