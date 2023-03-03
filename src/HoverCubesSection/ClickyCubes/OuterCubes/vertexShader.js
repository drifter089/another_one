const vertexShader = `
varying vec2 vUv;
uniform float u_time;

void main()
{
    
    vUv = uv;
    vec3 pos = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

}`;

export default vertexShader;
