import {
  AddEquation,
  BufferAttribute,
  BufferGeometry,
  Color,
  CustomBlending,
  Mesh,
  OrthographicCamera,
  Scene,
  ShaderMaterial,
  SrcAlphaFactor,
  Vector2,
  ZeroFactor,
} from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

function fullScreenTriangle() {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  return geometry;
}

function pass(material: ShaderMaterial) {
  const scene = new Scene();
  const mesh = new Mesh(fullScreenTriangle(), material);
  mesh.frustumCulled = false;
  scene.add(mesh);
  return { scene, material };
}

export const passCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

// Reproduces the CSS mask-image and opacity that the dual-canvas layout applies to the director canvas,
// by multiplying the premultiplied colour and alpha already in the framebuffer.
export function createDirectorMask() {
  const material = new ShaderMaterial({
    uniforms: { uResolution: { value: new Vector2(1, 1) }, uMobile: { value: 0 } },
    vertexShader,
    fragmentShader: /* glsl */ `
      uniform vec2 uResolution;
      uniform float uMobile;
      float desktopMask(float x) {
        if (x < 0.28) return mix(0.06, 0.16, x / 0.28);
        if (x < 0.54) return mix(0.16, 0.56, (x - 0.28) / 0.26);
        if (x < 0.78) return mix(0.56, 0.94, (x - 0.54) / 0.24);
        return mix(0.94, 1.0, (x - 0.78) / 0.22);
      }
      float mobileMask(vec2 p) {
        vec2 centre = vec2(1.04, 0.82) * uResolution;
        float t = length(p - centre) / length(centre);
        if (t < 0.34) return 1.0;
        if (t < 0.5) return mix(1.0, 0.58, (t - 0.34) / 0.16);
        if (t < 0.76) return mix(0.58, 0.0, (t - 0.5) / 0.26);
        return 0.0;
      }
      void main() {
        vec2 p = gl_FragCoord.xy;
        float m = uMobile > 0.5 ? mobileMask(p) * 0.416 : desktopMask(p.x / uResolution.x) * 0.688;
        gl_FragColor = vec4(0.0, 0.0, 0.0, m);
      }
    `,
    blending: CustomBlending,
    blendEquation: AddEquation,
    blendSrc: ZeroFactor,
    blendDst: SrcAlphaFactor,
    blendSrcAlpha: ZeroFactor,
    blendDstAlpha: SrcAlphaFactor,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
  return pass(material);
}

// The gallery stage's radial background and accent glow, drawn inside the gallery viewport.
export function createGalleryBackdrop() {
  const material = new ShaderMaterial({
    uniforms: { uSize: { value: new Vector2(1, 1) }, uAccent: { value: new Color("#00D9FF") } },
    vertexShader,
    fragmentShader: /* glsl */ `
      uniform vec2 uSize;
      uniform vec3 uAccent;
      varying vec2 vUv;
      void main() {
        vec2 p = vUv * uSize;
        vec2 centre = vec2(0.5, 0.55) * uSize;
        float t = length(p - centre) / length(centre);
        vec3 colour = mix(vec3(0.0745, 0.1255, 0.2118), vec3(0.0275, 0.0392, 0.0627), clamp(t / 0.7, 0.0, 1.0));
        float third = uSize.y / 3.0;
        if (p.y < third) {
          vec2 d = vec2((p.x - 0.5 * uSize.x) / (0.7071 * uSize.x), p.y / (1.4142 * third));
          colour = mix(colour, uAccent, 0.12 * (1.0 - clamp(length(d) / 0.7, 0.0, 1.0)));
        }
        gl_FragColor = vec4(colour, 1.0);
      }
    `,
    depthTest: false,
    depthWrite: false,
  });
  return pass(material);
}
