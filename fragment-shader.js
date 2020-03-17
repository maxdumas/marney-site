export default `
// Value received from the vertex shader
varying lowp vec4 vColor;

void main() {
    // Prussian Blue
    gl_FragColor = vColor;
}
`;
