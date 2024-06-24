import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import { loadGLTF } from './libs/loader.js'


let p = document.getElementById("planet");
p.style.display = "none";

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/ar-planets.mind',
    }); // 1
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    // const venus = await loadGLTF('../../assets/models/planets/Venus.glb');
    // venus.scene.scale.set(0.1, 0.1, 0.1);
    // venus.scene.position.set(0, -0.4, 0);

    // const anchor = mindarThree.addAnchor(0);
    // anchor.group.add(venus.scene);

    // const mixer = new THREE.AnimationMixer(robot.scene);

    // const idleAction = mixer.clipAction(robot.animations[2]);
    // const jumpAction = mixer.clipAction(robot.animations[3]);
    // const dieAction = mixer.clipAction(robot.animations[1]);
    // const thumbsUpAction = mixer.clipAction(robot.animations[9]);
    // const waveAction = mixer.clipAction(robot.animations[12]);
    // thumbsUpAction.loop = THREE.LoopOnce;
    // waveAction.loop = THREE.LoopOnce;
    // jumpAction.loop = THREE.LoopOnce;
    // dieAction.loop = THREE.LoopOnce;


    const modelURL = "./model.json";
    const metadataURL = "./metadata.json";

    const model = await tmImage.load(modelURL, metadataURL);
    const maxPredictions = model.getTotalClasses();

    // const waveGesture = new fp.GestureDescription('wave');
    // for(let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    //   waveGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    //   waveGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
    // }

    // const dieGesture = new fp.GestureDescription('die');
    // for(let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    //   dieGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
    //   dieGesture.addDirection(finger, fp.FingerDirection.HorizontalLeft, 1.0);
    //   dieGesture.addDirection(finger, fp.FingerDirection.HorizontalRight, 1.0);
    // }
    // const jumpGesture = new fp.GestureDescription('jump');
    // jumpGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
    // jumpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
    // jumpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
    // jumpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
    // for(let finger of [fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    //   jumpGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    //   jumpGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
    //   jumpGesture.addDirection(finger, fp.FingerDirection.VerticalDown, 1.0);
    // }

    // const GE = new fp.GestureEstimator([
    //   fp.Gestures.ThumbsUpGesture,
    //   waveGesture,
    //   jumpGesture,
    //   dieGesture,
    // ]);

    // start
    // const clock = new THREE.Clock();
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      // const delta = clock.getDelta();
      // mixer.update(delta);
      renderer.render(scene, camera);
    });

    // let activeAction = idleAction;
    // activeAction.play();
    // const fadeToAction = (action, duration) => {
    //   if (activeAction === action) return;
    //   activeAction = action;
    //   activeAction.reset().fadeIn(duration).play();
    // }
    // mixer.addEventListener('finished', () => {
    //   fadeToAction(idleAction, 0.2);
    // });

    const video = mindarThree.video;
    let skipCount = 0;
    const detect = async () => {
        //     if (activeAction !== idleAction) {
        // window.requestAnimationFrame(detect);
        // return;
        //     }
      if (skipCount < 10) {
        skipCount += 1;
        window.requestAnimationFrame(detect);
        return;
      }
      skipCount = 0;

      const prediction = await model.predict(video)
      for (let i = 0; i < maxPredictions; i++) {
        if(prediction[i].className === 'venus' && prediction[i].probability.toFixed(2) >= 0.75){
          p.style.display = "block";
          p.innerHTML = "Venus";
        } else if(prediction[i].className === 'saturn' && prediction[i].probability.toFixed(2) >= 0.75){
          console.log("saturn")
          p.style.display = "block";
          p.innerHTML = "Saturn";
        } else if(prediction[i].className === 'earth' && prediction[i].probability.toFixed(2) >= 0.80){
          console.log("earth")
          p.style.display = "block";
          p.innerHTML = "Earth";
        } else if(prediction[i].className === 'jupiter' && prediction[i].probability.toFixed(2) >= 0.75){
          console.log("jupiter")
          p.style.display = "block";
          p.innerHTML = "Jupiter";
        } else if(prediction[i].className === 'mars' && prediction[i].probability.toFixed(2) >= 0.75){
          console.log("mars")
          p.style.display = "block";
          p.innerHTML = "Mars";
        } else if(prediction[i].className === 'mercury' && prediction[i].probability.toFixed(2) >= 0.75){
          console.log("mercury")
          p.style.display = "block";
          p.innerHTML = "Mercury";
        } else if(prediction[i].className === 'neptune' && prediction[i].probability.toFixed(2) >= 0.75){
          console.log("neptune")
          p.style.display = "block";
          p.innerHTML = "Neptune";
        } else if(prediction[i].className === 'uranus' && prediction[i].probability.toFixed(2) >= 0.75){
          console.log("uranus")
          p.style.display = "block";
          p.innerHTML = "Uranus";
        }
        
        
        
      }
      window.requestAnimationFrame(detect);
    };
    window.requestAnimationFrame(detect);
  };
  start();
});
