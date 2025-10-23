import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * How to include in a scene:
 * 
 * const ferrari = new Ferrari_Testarossa();
 * await ferrari.load(); // wait until it's fully loaded
 * scene.add(ferrari.model);
 * 
 * Possible movement:
 * 
 * ferrari.move(0.05, 0, 0);
 */

export default class Ferrari_Testarossa {

  constructor() {
    this.vel = 0;
    this.wheelSpin = 0;
    this.direction = {
        x: 1,
        y: 0,
        z: 0
    }
  }

  async load() {
    const loader = new GLTFLoader();

    const gltf = await new Promise((resolve, reject) => {
      loader.load(
        './models/ferrari_testarossa.glb',
        resolve,
        undefined,
        reject
      );
    });

    console.log("✅ Successfully loaded Ferrari Testarossa model!");

    // Find the main car object
    this.model = gltf.scene.children.find(item => item.name === "Ferrari_Testarossa");

    if (!this.model) {
      console.warn("Ferrari_Testarossa node not found!");
    }

    this.fl = this.model.children.find(item => item.name === "FL");
    this.fr = this.model.children.find(item => item.name === "FR");
    this.rl = this.model.children.find(item => item.name === "RL");
    this.rr = this.model.children.find(item => item.name === "RR");

    this.model.position.set(0, 0.1, 0);
    this.model.rotation.set(0, Math.PI/2, 0);
  }

  move(dx, dy, dz) {
    this.model.position.x += dx;
    this.model.position.y += dy;
    this.model.position.z += dz;
    this.vel = Math.sqrt(dx * dx + dy * dy + dz * dz);
    this.setDirection(dx, dy, dz);
    this.wheelSpin = this.vel * 5;
    this.fl.rotation.x += this.wheelSpin;
    this.fr.rotation.x += this.wheelSpin;
    this.rl.rotation.x += this.wheelSpin;
    this.rr.rotation.x += this.wheelSpin;
  }

  setDirection(x, y, z) {
    this.direction.x = x;
    this.direction.y = y;
    this.direction.z = z;
  }
}