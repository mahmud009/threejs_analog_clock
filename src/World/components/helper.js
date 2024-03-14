import {
  AxesHelper,
  BufferGeometry,
  GridHelper,
  Group,
  Line,
  LineBasicMaterial,
  Vector3,
} from "three";

export function createAxesHelper() {
  const helper = new AxesHelper(6.5);
  // const helper = createGridHelper();
  helper.position.set(-3.5, 0, -3.5);
  return helper;
}

export function createLine({ from, to, color }) {
  const material = new LineBasicMaterial({ color });
  const points = [from, to];
  const geometry = new BufferGeometry().setFromPoints(points);
  return new Line(geometry, material);
}

export function createGridHelper(width) {
  // const helper = new GridHelper(16, 16, "red", "white");
  const group = new Group();

  for (let x = -(width / 2); x <= width / 2; x++) {
    const line = createLine({
      from: new Vector3(-(width / 2), 0, x),
      to: new Vector3(width / 2, 0, x),
      color: x === 0 ? "red" : "#333333",
    });
    group.add(line);
  }

  for (let z = -(width / 2); z <= width / 2; z++) {
    const line = createLine({
      from: new Vector3(z, 0, -(width / 2)),
      to: new Vector3(z, 0, width / 2),
      color: z == 0 ? "#0000FF" : "#333333",
    });
    group.add(line);
  }

  const yLine = createLine({
    from: new Vector3(0, -(width / 2)),
    to: new Vector3(0, width / 2, 0),
    color: "#7FFF00",
  });
  group.add(yLine);

  // const line = createLine({
  //   from: new Vector3(-(width / 2), 0, 0),
  //   to: new Vector3(width / 2, 0, 0),
  //   color: "white",
  // });
  // group.add(line);

  return group;
}
