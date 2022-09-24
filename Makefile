.PHONY: init
init:
	git submodule update --init --recursive
	npm install yarn -g

.PHONY: release_prerelease
release_prerelease:
	npm version prerelease

.PHONY: release_patch
release_patch:
	npm version patch

.PHONY: release_minor
release_minor:
	npm version minor

.PHONY: release_major
release_major:
	npm version major

.PHONY: analyze
analyze:
	yarn && yarn run analyze

.PHONY: build
build: build_js build_css

.PHONY: build_js
build_js:
	yarn && yarn run build

.PHONY: build_css
build_css:
	yarn
	yarn run build-chesterish-css
	yarn run build-grade3-css
	yarn run build-gruvboxd-css
	yarn run build-gruvboxl-css
	yarn run build-monokai-css
	yarn run build-oceans16-css
	yarn run build-onedork-css
	yarn run build-solarizedd-css
	yarn run build-solarizedl-css

.PHONY: storybook
storybook:
	yarn && yarn run storybook

