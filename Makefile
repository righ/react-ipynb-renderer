.PHONY: build
build:
	yarn && yarn run build

.PHONY: build_css
build_css:
	yarn\
	&& yarn run build-chesterish-css \
	&& yarn run build-grade3-css \
	&& yarn run build-gruvboxd-css \
	&& yarn run build-gruvboxl-css \
	&& yarn run build-monokai-css \
	&& yarn run build-oceans16-css \
	&& yarn run build-onedork-css \
	&& yarn run build-solarizedd-css \
	&& yarn run build-solarizedl-css

.PHONY: storybook
storybook:
	yarn && yarn run storybook

