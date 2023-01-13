const vertexShader = `varying vec2 vUv;
uniform float u_time;
uniform vec2 mousePos; 


void main()
{
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);



    // vUv = uv;

    vUv = uv;
      vec3 pos = position;

    //   pos.x += sin(length(mousePos - vec2(pos.x, pos.y)) * 3.14 * 2.0) * 0.1;
    // pos.y += cos(length(mousePos - vec2(pos.x, pos.y)) * 3.14 * 2.0) * 0.1;
    // pos.z += cos(length(mousePos - vec2(pos.x, pos.y)) * 3.14 * 2.0) * 0.1;

     pos.x += sin(length(mousePos - uv) * 3.14 * 1.0) * 0.5; // Modify the x position based on the distance to the mouse position
      pos.y += cos(length(mousePos - uv) * 3.14 * 1.0) * 0.5; // Modify the y position based on the distance to the mouse position
      pos.z += sin(length(mousePos - uv) * 3.14 * 1.0  * 0.5) * 0.5; // Modify the z position based on the distance to the mouse position


    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

}`;

export default vertexShader;
