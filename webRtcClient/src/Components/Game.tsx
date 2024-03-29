import React, { useEffect, useState } from "reactn";
import Scene, { SceneEventArgs } from "./Scene";
import * as BABYLON from "babylonjs";
import { style } from "typestyle";
import { viewWidth, viewHeight, px, percent } from "csx";
import { Color3 } from "babylonjs";
import GlobalState from "../GlobalState";
import { useGlobal } from "reactn";

const canvasStyle = style({
    width: percent(100),
    height: percent(100),
    maxWidth: percent(100),
    maxHeight: percent(100),
    display: "block"
});

const Game = () => {
    const [fps, setFps] = useGlobal<GlobalState>('fps');
    const [fullscreen, setFullscreen] = useGlobal<GlobalState>('fullscreen');
    const onSceneMount = (e: SceneEventArgs) => {
        const { canvas, scene, engine } = e;

        // BABYLON.SceneOptimizer.OptimizeAsync(scene);

        // This creates and positions a camera (non-mesh)
        const camera = new BABYLON.ArcRotateCamera("camera1", 1, Math.PI / 3, 8, new BABYLON.Vector3(0, 0, 0), scene); //new BABYLON.Vector3(0, 5, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light
        const light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(0, -1, 0), scene);

        const ambientLight = new BABYLON.HemisphericLight("ambientLight", new BABYLON.Vector3(0, 1, 0), scene);
        ambientLight.intensity = 0.1;

        // Default intensity is 1.
        light.intensity = 2;

        const sphereMaterial = new BABYLON.ShaderMaterial("unlitShader", scene, "./unlit", {
            attributes: ["position"],
            uniforms: ["worldViewProjection"]
        });
        sphereMaterial.setColor3("color", Color3.Green());
        // sphereMaterial.wireframe = true;

        // Our built-in 'sphere' shape.
        const sphere = BABYLON.MeshBuilder.CreateSphere("sphere1", { segments: 16, diameter: 2} , scene);
        const sphereMat = new BABYLON.PBRMetallicRoughnessMaterial("sphereMat", scene);
        sphereMat.baseColor = new BABYLON.Color3(0.206, 0.94, 1);
        sphereMat.metallic = 0;
        sphereMat.roughness = 0.1;
        sphere.material = sphereMat;
        sphere.material.freeze();

        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;

        const groundMaterial = new BABYLON.ShaderMaterial("unlitShader", scene, "./unlit", {
            attributes: ["position"],
            uniforms: ["worldViewProjection"]
        });
        groundMaterial.setColor3("color", Color3.Gray());
        // groundMaterial.wireframe = true;
        // Our built-in 'ground' shape.
        const ground = BABYLON.MeshBuilder.CreateGround("ground1", { width: 6, height: 6, subdivisions: 2}, scene);
        const groundMat = new BABYLON.PBRMetallicRoughnessMaterial ("groundMat", scene);
        groundMat.baseColor = Color3.Gray();
        groundMat.metallic = 0;
        groundMat.roughness = 0.4;


        ground.material = groundMat;
        ground.material.freeze();
        
        ground.freezeNormals();
        
        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
                setFps(engine.performanceMonitor.averageFPS);
            }
        });
        
        var optimizerOptions = BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed();
        optimizerOptions.targetFrameRate = 30;
        BABYLON.SceneOptimizer.OptimizeAsync(scene, optimizerOptions);
    }

    return (
        <>
        <button style={{position: "absolute"}} onClick={() => setFullscreen(true)}>Fullscreen</button>
        <Scene onSceneMount={onSceneMount} className={canvasStyle} adaptToDeviceRatio={true} width={window.innerWidth} height={window.innerHeight} />
        </>
    )
}

export default React.memo(Game, () => true);
