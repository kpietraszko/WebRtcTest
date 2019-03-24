import React, { FC, useRef, useEffect, useContext, useState } from "react";
import Scene, { SceneEventArgs } from "./Scene";
import * as BABYLON from "babylonjs";
import { style } from "typestyle";
import { viewWidth, viewHeight, px, percent } from "csx";
import { SetFpsContext } from "../contexts";
import Fullscreen from "react-full-screen";

const canvasStyle = style({
    width: percent(100),
    height: percent(100),
    maxWidth: percent(100),
    maxHeight: percent(100),
    display: "block"
});

const Game: FC = () => {
    const setFps = useContext(SetFpsContext);
    const [fullscreen, setFullscreen] = useState(false);
    const onSceneMount = (e: SceneEventArgs) => {
        const { canvas, scene, engine } = e;

        // BABYLON.SceneOptimizer.OptimizeAsync(scene);

        // This creates and positions a camera (non-mesh)
        var camera = new BABYLON.ArcRotateCamera("camera1", 1, Math.PI / 3, 8, new BABYLON.Vector3(0, 0, 0), scene); //new BABYLON.Vector3(0, 5, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light
        var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(0, -1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'sphere' shape.
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", { segments: 16, diameter: 2} , scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        // Our built-in 'ground' shape.
        var ground = BABYLON.MeshBuilder.CreateGround("ground1", { width: 6, height: 6, subdivisions: 2}, scene);

        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
                setFps(engine.performanceMonitor.averageFPS);
            }
        });
    }

    return (
        <Scene onSceneMount={onSceneMount} className={canvasStyle} adaptToDeviceRatio={true} width={window.innerWidth} height={window.innerHeight} />
    )
}

export default React.memo(Game, () => true);
