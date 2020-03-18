export default `
uniform lowp float iTime;

// Values received from the vertex shader
varying lowp vec4 vColor;

void main() {
    // Prussian Blue
    gl_FragColor = vColor * mod(iTime / 5000.0, 1.0);
}
`;
