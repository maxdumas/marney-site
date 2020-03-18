export default `
uniform lowp float time;
uniform lowp vec2 resolution;

// Values received from the vertex shader
varying lowp vec4 vColor;

void main() {
    // Prussian Blue
    gl_FragColor = vColor * mod(time / 5000.0, 1.0);
}
`;
