import Phaser from "phaser";
import CameraController from "../camera/CameraController";
import Player from "../objects/Player";
import type { AvatarSchema, PlayerIdentity } from "@/types/type";

export default class MainScene extends Phaser.Scene {
  private mapUrl: string;
  private avatarMap: Record<string, AvatarSchema>;
  private localPlayerInfo: PlayerIdentity;

  private localPlayer?: Player;

  constructor(
    mapUrl: string,
    avatarMap: Record<string, AvatarSchema>,
    localPlayerInfo: PlayerIdentity
  ) {
    super("MainScene");
    this.mapUrl = mapUrl;
    this.avatarMap = avatarMap;
    this.localPlayerInfo = localPlayerInfo;
  }


  preload() {
    this.load.tilemapTiledJSON("map", this.mapUrl);

    TILESETS.forEach((name) => {
      this.load.image(name, `/tiles/${name}.png`);
    });

    // Load all avatars
    Object.values(this.avatarMap).forEach((avatar) => {
      this.load.image(`avatar-${avatar.id}`, avatar.idle);
    });
  }


  create() {
    const map = this.make.tilemap({ key: "map" });

    const tilesets = map.tilesets
      .map((ts) => map.addTilesetImage(ts.name, ts.name))
      .filter(Boolean) as Phaser.Tilemaps.Tileset[];

    map.layers.forEach((layerData) => {
      const layer = map.createLayer(layerData.name, tilesets);
      if (!layer) return;

      if (layerData.properties?.some((p: any) => p.name === "collides")) {
        layer.setCollisionByProperty({ collides: true });
      }
    });

    // ✅ Correct avatar lookup
    const avatar = this.avatarMap[this.localPlayerInfo.avatarId];

    if (!avatar) {
      console.error("Local avatar not found");
      return;
    }

    this.localPlayer = new Player({
      scene: this,
      x: 400,
      y: 400,
      texture: `avatar-${avatar.id}`,
    });

    this.cameras.main.startFollow(this.localPlayer.sprite);

    new CameraController(this, map.widthInPixels, map.heightInPixels);
  }

  update() {
    this.localPlayer?.update();
  }
}

const TILESETS = [
  "booth",
  "booth big black [5x5]",
  "botanical_garden",
  "cabinet_chippendale_thin_arch",
  "chair_neonoir",
  "chair_small (1)",
  "chair_space",
  "cushion",
  "desk_cyberpunk (1)",
  "desk_round",
  "dresser_1x2_drawers",
  "flag_jolly_roger",
  "floor-1",
  "Frame 1",
  "Frame 31",
  "free_overview",
  "g1",
  "g2",
  "ikea_shelf",
  "lamp_floor",
  "life support",
  "m-bg",
  "more walls",
  "office_filecabinets",
  "officeplants[1x1]",
  "officeplants[2x1]",
  "plant_potted_skinny_terracotta",
  "planter_boxes",
  "Room_Builder_free_32x32",
  "roundtable",
  "shelf-1",
  "sofa",
  "straigh table1",
  "table_round_marble",
  "vending_machine",
  "vending_machine@2x",
  "WallpaperExploration"
];
