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
    this.speed = 0.03;
    this.turnSpeed = 0.1;
    this.wheelSpin = 5 * this.speed;
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
    this.model.rotation.set(0, Math.PI / 2, 0);
  }

  move(dx, dy, dz, dir) {
    this.model.position.x += dx;
    this.model.position.y += dy;
    this.model.position.z += dz;
    //this.speed = Math.sqrt(dx * dx + dy * dy + dz * dz);
    //this.wheelSpin = this.speed * 5;
    this.fl.rotation.x += dir * this.wheelSpin;
    this.fr.rotation.x += dir * this.wheelSpin;
    this.rl.rotation.x += dir * this.wheelSpin;
    this.rr.rotation.x += dir * this.wheelSpin;
  }

  updateCar(keysPressed) {
    if (!this.model) {
      return;
    }
    if (keysPressed.ArrowUp) {
      this.move(Math.sin(this.model.rotation.y) * this.speed, 0 , Math.cos(this.model.rotation.y) * this.speed, 1)
    }
    if (keysPressed.ArrowDown) {
      this.move(-Math.sin(this.model.rotation.y) * this.speed, 0 , -Math.cos(this.model.rotation.y) * this.speed, -1)
    }
    if (keysPressed.ArrowLeft) {
      this.model.rotation.y += this.turnSpeed;
    }
    if (keysPressed.ArrowRight) {
      this.model.rotation.y -= this.turnSpeed;
    }
  }

}