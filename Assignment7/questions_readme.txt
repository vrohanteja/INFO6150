Assignment 7 - Criteria:

- Create a two-page website of your favorite Concept. You can use the same as Assignment-01 or develop 
a new one.

- The assignment aims to learn about CSS Grid layout/Flexbox and SASS/SCSS Features.

- Implement a CSS Grid and a flexbox in your pages wherever that fits accordingly.

- Implement All the below SASS Features

- Variables, Custom Properties, Nesting, Interpolation, Placeholder Selectors, Mixins, Functions. Feel 
free to use more SASS/SCSS Features.

- SASS/SCSS Files need to be organized into multiple files based on UI Features, Common Elements or 
Themes

- UI Should be Rich and will be considered for grading

- A Readme file should be included explaining the features implemented and how and where in your pages 
they were implemented.

Readme:

- CSS Grid was used to make the main page box layout. (4 boxes - a, b, c, and d)

- The box b, to the right contains flexbox elements aligned vertically. 

- mainStyle is simple css, while mainStyle2 is SCSS -> compiled css scripts.

- Variables are only available at the level of nesting where they are defined. Used here for styling body of main page.

- Custom properties are scoped to the element(s) they are declared on, and participate in the cascade: the value of such a custom property is that from the declaration decided by the cascading algorithm. Custom property used to style the descP class of text beneath the chips images.

- Used nesting in the navigation bar of scndPage.

- Interpolation(Insertion) used to interpolate SASS expressions into CSS code; with selectors, properties, CSS rules, and strings as variable. Used to add the background image for scndPage.

- Mixins allow you to define styles that can be re-used throughout your stylesheet; make easy to distribute collections of styles in libraries. Used along with Interpolation in 2nd page.

- Used a function to map variables to font weights, which return specified values on calling function in scndStyle.

- reference: https://www.w3schools.com/sass 