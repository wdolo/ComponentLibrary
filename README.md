# Tempus Component Library
An (open source?) library of reusable, opinionated, React components.
They are styled in material design and will be adjusted based on our design
principles, however, they should be as flexible as possible.

|`npm run <script>`|Description|
|------------------|-----------|
|`storybook`| Isolates each component in the library into 'stories'. Serves app on at `locahost:9001`|
|`build`|Compiles the application to disk (`~/lib` by default). Would like to modify this to build only the react components and their index file|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|TODO: Need to publish the build to npm/wherever we want to host the components|
