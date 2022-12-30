import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { Vector2 } from "three";

const ShaderPlane = () => {
  const planeRef = useRef();

  const SphereShaderMaterial = {
    uniforms: {
      u_time: { value: 0.0 },
      u_linear: { value: 0.0 },
      mousePos: { value: new Vector2() },
    },
    vertexShader: `varying vec2 vUv;
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

}`,
    fragmentShader: `#define PI 3.1415926535897932384626433832795

varying vec2 vUv;
uniform float u_time;
uniform float u_linear;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main()
{
    

    // Pattern 50
    float strength = step(0.8, sin(cnoise(vUv * 10.0) * 20.0+u_time));

    // Final color
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);

    // gl_FragColor = vec4(vec3(strength), 1.0);
    gl_FragColor = vec4(mixedColor, 1.0);
}`,
  };

  useEffect(() => {
    console.log(planeRef.current.material);
    function updateMousePos(event) {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth) * 2 - 1;
      const y = -(clientY / innerHeight) * 2 + 1;
      if (planeRef.current.material.uniforms) {
        planeRef.current.material.uniforms.mousePos.value.x = x;
        planeRef.current.material.uniforms.mousePos.value.y = y;
      }
    }
    window.addEventListener("mousemove", updateMousePos);
    return () => {
      window.removeEventListener("mousemove", updateMousePos);
    };
  }, []);

  useFrame((state) => {
    planeRef.current.material.uniforms.u_time.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={planeRef}>
      <planeGeometry args={[20, 20]} />
      {/* <meshNormalMaterial /> */}
      <shaderMaterial attach="material" args={[SphereShaderMaterial]} />
    </mesh>
  );
};

export default ShaderPlane;
