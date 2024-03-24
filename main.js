import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';


var scene, camera, fov, aspect, near, far, controls,
    renderer, canvas, Star, Sky, cylinder, sky, sky2, Cat,
	Shuttle, shuttle, Mochi, mochi, cube, Fish, count, Helmet, helmet;

var HEIGHT, WIDTH, mousePos = { x: 0, y: 0 };


canvas = document.querySelector( '#c' );
renderer = new THREE.WebGLRenderer( { antialias: true, canvas, alpha: true, premultipliedAlpha: false, } );
renderer.shadowMap.enabled = true;

// Camera
fov = 60;
aspect = 2; // the canvas default
near = 1;
far = 10000;
camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
camera.position.x = 0;
camera.position.z = 185;
camera.position.y = 100;

scene = new THREE.Scene();

// Fog
scene.fog = new THREE.Fog(0xF2E9BD, 400, 950);

// Light
const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, 3.2);
const light = new THREE.DirectionalLight( 0xffffff, 2.5);
light.position.set( 150, 350, 350);
light.castShadow = true;
light.shadow.camera.left = -400;
light.shadow.camera.right = 400;
light.shadow.camera.top = 400;
light.shadow.camera.bottom = -400;
light.shadow.camera.near = 1;
light.shadow.camera.far = 1000;
light.shadow.mapSize.width = 4096;
light.shadow.mapSize.height = 4096;
const ambientLight = new THREE.AmbientLight(0xF2E9BD, .5);
var ch = new THREE.CameraHelper(light.shadow.camera);
scene.add( hemisphereLight );
scene.add( light );
scene.add(ambientLight);


count = 0;



// FISH
var a = getRandomInt(50, 150);
var b = getRandomInt(50, 150);
var c = getRandomInt(50, 150);
var d = getRandomInt(50, 150);
var e = getRandomInt(50, 150);

Fish = function(){
	this.mesh = new THREE.Object3D();
		const objLoader = new OBJLoader();
		objLoader.load( '/models/fish.obj', ( root ) => {
			root.applyMatrix4(new THREE.Matrix4().makeRotationY(-Math.PI/2));
			root.scale.setScalar(.5);
			this.mesh.add(root);
			this.mesh.traverse((mesh) => {
				mesh.material = new THREE.MeshStandardMaterial({ color: 0x7DDBC9 });
			  });
		} );
}


//FISH 1
const fish = new Fish();
fish.mesh.position.set(300,a,0);
fish.name = 'fish';
scene.add(fish.mesh);

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(15,10,10),
    new THREE.MeshPhongMaterial({color:0xff0000, transparent:true, opacity:0.0})
    );
cube1.position.set(300+96,a-14,0);
scene.add(cube1);

let cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
cube1BB.setFromObject(cube1);


//FISH 2
const fish2 = new Fish();
fish2.mesh.position.set(1500,b,0);
fish2.name = 'fish2';
scene.add(fish2.mesh);

const cube2 = new THREE.Mesh(
	new THREE.BoxGeometry(15,10,10),
    new THREE.MeshPhongMaterial({color:0xff0000, transparent:true, opacity:0.0})
    );
cube2.position.set(1500+96,b-14,0);
scene.add(cube2);

let cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
cube2BB.setFromObject(cube2);

//FISH 3
const fish3 = new Fish();
fish3.mesh.position.set(2500,c,0);
fish3.name = 'fish3';
scene.add(fish3.mesh);

const cube3 = new THREE.Mesh(
	new THREE.BoxGeometry(15,10,10),
    new THREE.MeshPhongMaterial({color:0xff0000, transparent:true, opacity:0.0})
    );
cube3.position.set(2500+96,c-14,0);
scene.add(cube3);

let cube3BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
cube3BB.setFromObject(cube3);


//FISH 4
const fish4 = new Fish();
fish4.mesh.position.set(4500,d,0);
scene.add(fish4.mesh);

const cube4 = new THREE.Mesh(
	new THREE.BoxGeometry(20,15,10),
    new THREE.MeshPhongMaterial({color:0xff0000, transparent:true, opacity:0.0})
    );
cube4.position.set(4500+96,d-14,0);
scene.add(cube4);

let cube4BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
cube4BB.setFromObject(cube4);

//FISH 5
const fish5 = new Fish();
fish5.mesh.position.set(7000,e,0);
scene.add(fish5.mesh);

const cube5 = new THREE.Mesh(
	new THREE.BoxGeometry(25,20,10),
    new THREE.MeshPhongMaterial({color:0xff0000, transparent:true, opacity:0.0})
    );
cube5.position.set(7000+96,e-14,0);
scene.add(cube5);

let cube5BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
cube5BB.setFromObject(cube5);




//MochiBB
cube = new THREE.Mesh(
    new THREE.BoxGeometry(30,23,20),
    new THREE.MeshPhongMaterial({color:0xff0000, transparent:true, opacity:0.0})
    );
cube.position.set(0,-3,0);
scene.add(cube);
let mochiBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
mochiBB.setFromObject(cube);



// Render
function render(time) {

    if ( resizeRendererToDisplaySize( renderer ) ) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    //Animation
    time *= 0.0009;

    sky.mesh.position.x -= 8;
    sky2.mesh.position.x -= 8;

    if (sky.mesh.position.x < -2500){
        scene.remove(sky.mesh);
        createsky();
    }

    if (sky2.mesh.position.x < -1800){
        scene.remove(sky2.mesh);
        createsky2();
    }

    //FISH 1
	fish.mesh.position.x -= 3;
    cube1.position.x -= 3;
	cube1BB.copy(cube1.geometry.boundingBox).applyMatrix4(cube1.matrixWorld);

    //FISH 2
	fish2.mesh.position.x -= 4;
	cube2.position.x -= 4;
	cube2BB.copy(cube2.geometry.boundingBox).applyMatrix4(cube2.matrixWorld);

    //FISH 3
	fish3.mesh.position.x -= 5.5;
   	cube3.position.x -= 5.5;
	cube3BB.copy(cube3.geometry.boundingBox).applyMatrix4(cube3.matrixWorld);

    //FISH 4
	fish4.mesh.position.x -= 7;
    cube4.position.x -= 7;
	cube4BB.copy(cube4.geometry.boundingBox).applyMatrix4(cube4.matrixWorld);

    //FISH 5
	fish5.mesh.position.x -= 8;
    cube5.position.x -= 8;
	cube5BB.copy(cube5.geometry.boundingBox).applyMatrix4(cube5.matrixWorld);

	mochiBB.copy(cube.geometry.boundingBox).applyMatrix4(cube.matrixWorld);
	updateMochi();

    checkCollisions();
    renderer.render( scene, camera );

	if (count === 5){
		document.getElementById("message").innerHTML = "YOU WIN!";
		document.getElementById("replay").innerHTML = "Click Here to Replay";
		document.getElementById("replay").addEventListener("click", myFunction);
	}else
	if (fish5.mesh.position.x < -1800 && count < 5){
		document.getElementById("message").innerHTML = "YOU LOST";
		document.getElementById("replay").innerHTML = "Click Here to Replay";
		document.getElementById("replay").addEventListener("click", myFunction);
	}

    requestAnimationFrame( render );
}

requestAnimationFrame( render );

function myFunction() {
	location.reload();
  }

// Resize
function resizeRendererToDisplaySize( renderer ) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if ( needResize ) {
		renderer.setSize( width, height, false );
	}
	return needResize;
}


// HANDLE MOUSE EVENTS
function handleMouseMove(event) {
	var tx = -1 + (event.clientX / canvas.clientWidth)*2;
	var ty = 1 - (event.clientY / canvas.clientHeight)*2;
	mousePos = {x:tx, y:ty};
  }


//SPACESHUTTLE & CAT
Shuttle = function shuttle() {
	this.mesh = new THREE.Object3D();
	const mtlLoader = new MTLLoader();
	mtlLoader.load( '/models/shuttle.mtl', ( mtl ) => {
		mtl.preload();
		const objLoader = new OBJLoader();
		objLoader.setMaterials( mtl );
		objLoader.load( '/models/shuttle.obj', ( root ) => {
			root.applyMatrix4(new THREE.Matrix4().makeRotationY(-Math.PI/2));
			//root.position.set(-100,100,-50);
			root.castShadow = true;
			root.receiveShadow = true;
			root.scale.setScalar(.35);
			this.mesh.add(root);

		} );
	} );
}

Cat = function cat(){
	this.mesh = new THREE.Object3D();
	const mtlLoader = new MTLLoader();
	mtlLoader.load( '/models/cat.mtl', ( mtl ) => {
		mtl.preload();
		const objLoader = new OBJLoader();
		objLoader.setMaterials( mtl );
		objLoader.load( '/models/cat.obj', ( root ) => {
			root.applyMatrix4(new THREE.Matrix4().makeRotationY(-Math.PI/1.65));
			root.castShadow = true;
			root.receiveShadow = true;
			root.scale.setScalar(.48);
			this.mesh.add(root);
		} );
	} );

}

Helmet = function helmet(){
	this.mesh = new THREE.Object3D();
		const objLoader = new OBJLoader();
		objLoader.load( '/models/cat.obj', ( root ) => {
			root.applyMatrix4(new THREE.Matrix4().makeRotationY(-Math.PI/1.65));
			root.castShadow = true;
			root.receiveShadow = true;
			root.scale.setScalar(.55);
			root.position.set(0,-.5,0);
			this.mesh.add(root);
			this.mesh.traverse((mesh) => {
				mesh.material = new THREE.MeshPhongMaterial({ color: 0xd7d9da, transparent:true, opacity:.07, specular: 0x999999, shininess: 100 });
			  });
		} );
}


Mochi = function(){
	this.mesh = new THREE.Mesh();
	mochi = new Cat();
	shuttle = new Shuttle();
	helmet = new Helmet();
	this.mesh.add(mochi.mesh);
	this.mesh.add(shuttle.mesh);
	this.mesh.add(helmet.mesh);
}

function createmochi(){
	mochi = new Mochi();
	scene.add(mochi.mesh);
}




//STARS
Star = function(){
	this.mesh = new THREE.Object3D();
		const objLoader = new OBJLoader();
		objLoader.load( '/models/star.obj', ( root ) => {
			root.applyMatrix4(new THREE.Matrix4().makeRotationY(-Math.PI/2));
			var nBlocs = 5+Math.floor(Math.random()*3);
			for (var i=0; i<nBlocs; i++ ){
				var m = root.clone();
				m.position.x = i*15;
				m.position.y = Math.random()*10;
				m.position.z = Math.random()*10;
				var s = .3 + Math.random()*.9;
				m.scale.setScalar(s,s,s);
				m.castShadow = true;
				m.receiveShadow = true;
				this.mesh.add(m);
				this.mesh.traverse((mesh) => {
					mesh.material = new THREE.MeshPhongMaterial({ color: 0xFCE828 });
				  });
			}
		} );

}


//SKY
Sky = function(){
	this.mesh = new THREE.Object3D();
	var stepAngle = Math.PI*2 / 10;
	for(var i=0; i<10; i++){
		var star = new Star();

	  	var a = stepAngle*i;
	  	var h = 750 + Math.random()*200;

	  	var y = Math.sin(a)*h;
	  	var x = Math.cos(a)*h;
	  	var z = -400-Math.random()*400;

		star.mesh.position.set(x,y,z);

	  	var s = 1+Math.random()*2;

		star.mesh.scale.set(s,s,s)

		this.mesh.add(star.mesh);
	}
}

function createsky(){
	sky = new Sky();
	sky.mesh.position.y = -500;
	sky.mesh.position.x = 1000;
	scene.add(sky.mesh);
}


function createsky2(){
	sky2 = new Sky();
	sky2.mesh.position.y = -700;
	sky2.mesh.position.x = 1200;
	scene.add(sky2.mesh);
}




function updateMochi(){

	var targetY = normalize(mousePos.y,-.75,.75,25, 175);
	var targetX = normalize(mousePos.x,-.75,.75,-100, 100);

	// Move the plane at each frame by adding a fraction of the remaining distance
	mochi.mesh.position.y += (targetY-mochi.mesh.position.y)*0.1;
	cube.position.y += (targetY-cube.position.y)*0.1;

	// Rotate the plane proportionally to the remaining distance
	mochi.mesh.rotation.z = (targetY-mochi.mesh.position.y)*0.0128;
	mochi.mesh.rotation.x = (mochi.mesh.position.y-targetY)*0.0064;
}


function normalize(v,vmin,vmax,tmin, tmax){

	var nv = Math.max(Math.min(v,vmax), vmin);
	var dv = vmax-vmin;
	var pc = (nv-vmin)/dv;
	var dt = tmax-tmin;
	var tv = tmin + (pc*dt);
	return tv;

}


function checkCollisions(){
	if(mochiBB.intersectsBox(cube1BB)){
		scene.remove(fish.mesh);
		cube1.position.set(-3000,0,0);
		count += 1;
		document.getElementById("scoreboard").innerHTML = count + "/ 5 fish ";
	}else
	if(mochiBB.intersectsBox(cube2BB)){
		scene.remove(fish2.mesh);
		cube2.position.set(-3000,0,0);
		count += 1;
		document.getElementById("scoreboard").innerHTML = count + "/ 5 fish ";
	}else
	if(mochiBB.intersectsBox(cube3BB)){
		scene.remove(fish3.mesh);
		cube3.position.set(-3000,0,0);
		count += 1;
		document.getElementById("scoreboard").innerHTML = count + "/ 5 fish ";
	}else
	if(mochiBB.intersectsBox(cube4BB)){
		scene.remove(fish4.mesh);
		cube4.position.set(-3000,0,0);
		count += 1;
		document.getElementById("scoreboard").innerHTML = count + "/ 5 fish ";
	}else
	if(mochiBB.intersectsBox(cube5BB)){
		scene.remove(fish5.mesh);
		cube5.position.set(-3000,0,0);
		count += 1;
		document.getElementById("scoreboard").innerHTML = count + "/ 5 fish ";
	}
}



function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }




createsky();
createsky2();
createmochi();

//add the listener
document.addEventListener('mousemove', handleMouseMove, false);
