# Matter vertices editor

Simple visual tool for creating matter-js bodies from image

![editor-example](https://github.com/Samgeven/matter-vertices-editor/assets/53538618/e90f098e-0a5e-4412-86ff-76d9a2f56d2b)

## About the tool

Vertices editor allows for creating matter bodies from different shapes, and it also provides code for rendering concave shapes. Most engines have limitations when working with concave shapes, and Matter is no exception. Vertices set should be decomposed into convexes, and default render method won't work as expected, if you intend to use concave shape with texture. There are some valid workarounds, such as:

1. Rewriting render method of Matter.js
2. Creating a composite from concave shape and texture-holding shape.
3. Using svg texture, which allows to create shape via Matter.Svg module

The third approach won't fit if you intend to create something pixel-artish, for example, and first one implies replacing some source code of Matter. I chose second approach for the editor, which seemed more flexible than others.

## Usage

1. Load image on starting screen.
2. Create an outline for image with line or auto-line tool.
3. Hit the export code button. There you will find an export code for creating matter body, based on your shape.
4. If your shape is concave, you may want to add additional settings on simulation page. Then you can return to step 3.

## Limitations

The auto-line tool works not as good as it could, and works especially bad when working with complex concave shapes and small resolutions. If you're not satisfied with result, you'd better try placing points manually.
