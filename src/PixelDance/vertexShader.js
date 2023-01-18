const vertexShader = `
uniform float uTime;
uniform float uRadius;
uniform vec2 mousePos; 

varying float currSize;



void main() {
  vec3 particlePosition = position ;

  float dist = distance(vec2(position.x*-1.0,position.y),mousePos);

  //   particlePosition.x += sin(particlePosition.x * 5.0 + uTime * 3.0) * 0.1;
  // particlePosition.z += sin(particlePosition.y * 6.0 + uTime * 2.0) * 0.1;
  // particlePosition.y += sin(particlePosition.y * 6.0 + uTime * 2.0) * 0.1;

  particlePosition.z +=(10.0-dist)/3.0;

  vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize = 22.0-dist;

  currSize = 38.0-dist;
  
}

`;

export default vertexShader;
