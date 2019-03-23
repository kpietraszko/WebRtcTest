import React, { FC, useRef } from "react";
import Scene, { SceneEventArgs } from "./Scene";
import * as BABYLON from "babylonjs";
import { style } from "typestyle";
import { viewWidth, viewHeight, px } from "csx";

const canvasStyle = {
    width: viewWidth(100),
    height: viewHeight(100), // overwritten
    maxWidth: viewWidth(100),
    maxHeight: viewHeight(100), // overwritten
    display: "block"
};

const Game : FC = () => {
    
	const onSceneMount = (e: SceneEventArgs) => {
        const { canvas, scene, engine } = e;
        
        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.ArcRotateCamera("camera1", 1, Math.PI/3, 8, new BABYLON.Vector3(0,0,0), scene); //new BABYLON.Vector3(0, 5, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });
    }
    canvasStyle.height = px(window.innerHeight);
    canvasStyle.maxHeight = px(window.innerHeight);
    const canvasStyleClass = style(canvasStyle);
	return (
		<Scene onSceneMount={onSceneMount} className={canvasStyleClass} adaptToDeviceRatio={true} width={window.innerWidth} height={window.innerHeight}/>
	)
}

export default Game;
