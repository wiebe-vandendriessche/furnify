1. import the stl file into blender
2. scale is 1/1000 (0.001)
3. export as .gltf 2.0
4. when exporting choose for .gltf 2.0 with seperate files (textures + bin + mesh)
5. use this command on the exported .gltf file: ```bash npx gltfjsx {.gltf file} ```
6. this creates a .jsx file that represents the model
7. inside the useGltf() function, insert the right path to the gltf and bin files
8. Rename the component with a clear name (probably best to use the same one as the model)
9. You can now use this component in three js