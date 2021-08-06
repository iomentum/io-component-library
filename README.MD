# io-component-library

## developpement

### install project

```
npm install
npm run prepare
```

### workflow

```
npm run test
npm run updateSnapshot
```

## storybook

### start

```
npm run storybook
```

`http://localhost:6006/` into your favorite browser

### build

```
npm run build-storybook
```

## rollup

### build

Complile & pubslish your components by running
`npm run build-lib`

(You may need to run `sudo npm install --global rollup` before)

Then commit the generated files ans push them.

### external installation

`npm install --save iomentum/io-component-library#main`

Import the library into your `.tsx` or `.jsx` file:

`import {} from 'io-component-library'`
