TAG = $$(git describe --tags --abbrev=0)


.PHONY: init
init:
	git submodule update --init --recursive
	npm install pnpm -g

.PHONY: audit_fix
audit_fix:
	pnpm run pnpm-audit-fix

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
	pnpm run analyze

.PHONY: analyze_katex
analyze_katex:
	cd katex && pnpm run analyze

.PHONY: build
build: build_js build_css build_js_katex build_css_katex

.PHONY: build_js
build_js:
	pnpm build

.PHONY: build_js_katex
build_js_katex:
	mv src/index.tsx src/index.tsx.tmp
	cd katex && pnpm run build
	mv src/index.tsx.tmp src/index.tsx

.PHONY: build_css
build_css:
	pnpm build-css

.PHONY: build_css_katex
build_css_katex:
	cd katex && pnpm build-css

.PHONY: storybook
storybook:
	pnpm storybook

