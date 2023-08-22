const fragmentShader = `
  uniform float time;

  void main() {
    float pulsing = 0.25 * sin(2.0 * time) + 0.25;
    gl_FragColor = vec4(vec3(pulsing), 1.0);
  }
`;

export default fragmentShader;
