import Phaser from "phaser";

interface PlayerConfig {
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
}

export default class Player {
  public sprite: Phaser.Physics.Arcade.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor({ scene, x, y, texture }: PlayerConfig) {
    this.sprite = scene.physics.add.sprite(x, y, texture);

    this.sprite.setOrigin(0.5, 1);
    this.sprite.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard!.createCursorKeys();
  }

  update() {
    const speed = 150;
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;

    body.setVelocity(0);

    if (this.cursors.left?.isDown) body.setVelocityX(-speed);
    else if (this.cursors.right?.isDown) body.setVelocityX(speed);

    if (this.cursors.up?.isDown) body.setVelocityY(-speed);
    else if (this.cursors.down?.isDown) body.setVelocityY(speed);
  }
}
