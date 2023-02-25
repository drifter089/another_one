const fragmentShader = `
varying float currSize;
void main() {
  gl_FragColor = vec4(0.34+(currSize/12.0), 0.53, 0.96, 1.0);
}
`;

export default fragmentShader;
