import { Mesh, MeshStandardMaterial, SphereBufferGeometry, TextureLoader } from "three";

function createMaterial() {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load("../../assets/textures/mars.jpg");
  const material = new MeshStandardMaterial({
    map: texture,
    // color: "green",
  });

  return material;
}

export function createSphere({ position, geometry }) {
  const { x, y, z } = position;
  const { radius, widthSegments, heightSegments } = geometry;
  const geometryDef = new SphereBufferGeometry(radius, widthSegments, heightSegments);
  const material = createMaterial();
  const sphere = new Mesh(geometryDef, material);
  sphere.position.set(x, y, z);

  sphere.tick = (delta) => {};

  return sphere;
}
