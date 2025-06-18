// 导入模块      
import * as THREE from 'three';      
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';      
import Stats from 'three/addons/libs/stats.module.js';      
import cube from './mesh/cube';      
import sphere from './mesh/sphere';   
import plane from './mesh/plane';   
import { GUI } from 'dat.gui';  // 导入 dat.GUI 库
   
let renderer, camera, scene; // 全局变量 场景、相机、渲染器      
let animateId;       
let ambientLight;  // 环境光      
// 新增点光源      
let pointLight;
   
// 初始化场景、相机、渲染器等      
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
   // scene.add(cube);
    scene.add(sphere);
    scene.add(plane);

    // 创建环境光
    ambientLight = new THREE.AmbientLight(0xffffff, 1);  // 初始光强为 1
    scene.add(ambientLight);

    // 新增点光源初始化
    pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(100, 100, 100);
    scene.add(pointLight);

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(400, 400, 400);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    document.body.appendChild(renderer.domElement);      
}
   
// 窗口大小改变时重新调整      
window.onresize = function () {
    if (!renderer) return;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();      
};
   
// 初始化辅助工具（坐标轴、控制器等）      
function initHelper() {
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    });

    const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
    scene.add(gridHelper);      
}
   
// 动画循环      
function animate() {
    animateId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;      
}
   
// 性能统计      
function initStats() {
    const stats = new Stats();
    document.body.appendChild(stats.domElement);
    function render() {
        stats.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    render();      
}
   
// 初始化所有功能      
init();      
initHelper();      
initStats();
   
// GUI界面设置      
const gui = new GUI();
   
// 定义默认值      
const defaults = {
    cubePosition: { x: 0, y: 0, z: 0 },
    cubeMaterial: {
        color: cube.material.color.getHex(),
        transparent: cube.material.transparent,
        opacity: cube.material.opacity,
        emissive: cube.material.emissive.getHex()
    },
    ambientLight: {
        color: ambientLight.color.getHex(),
        intensity: ambientLight.intensity
    },
    pointLight: {
        color: pointLight.color.getHex(),
        intensity: pointLight.intensity,
        position: { x: pointLight.position.x, y: pointLight.position.y, z: pointLight.position.z }
    }   
};
   
// 创建恢复函数      
function resetToDefaults() {
    // 恢复立方体位置
    cube.position.set(
        defaults.cubePosition.x,
        defaults.cubePosition.y,
        defaults.cubePosition.z
    );

    // 恢复立方体材质
    cube.material.color.setHex(defaults.cubeMaterial.color);
    cube.material.transparent = defaults.cubeMaterial.transparent;
    cube.material.opacity = defaults.cubeMaterial.opacity;
    cube.material.emissive.setHex(defaults.cubeMaterial.emissive);

    // 恢复环境光
    ambientLight.color.setHex(defaults.ambientLight.color);
    ambientLight.intensity = defaults.ambientLight.intensity;

    // 恢复点光源
    pointLight.color.setHex(defaults.pointLight.color);
    pointLight.intensity = defaults.pointLight.intensity;
    pointLight.position.set(
        defaults.pointLight.position.x,
        defaults.pointLight.position.y,
        defaults.pointLight.position.z
    );

    // 更新 GUI 控件的值
    gui.__controllers.forEach(controller => controller.updateDisplay());      
}
// 创建分组 - 重置   
const controlsFolder = gui.addFolder('Controls');   
controlsFolder.add({ reset: resetToDefaults }, 'reset').name('setDefault');   
controlsFolder.open();
   
// 创建分组 - 物体      
const objectFolder = gui.addFolder('物体');
   
// 创建分组 - 位置      
const positionFolder = objectFolder.addFolder('位置');      
positionFolder.add(cube.position, 'x', -50, 50).name('x坐标');      
positionFolder.add(cube.position, 'y', -50, 50).name('y坐标');      
positionFolder.add(cube.position, 'z', -50, 50).name('z坐标');      
positionFolder.open();
   
// 创建分组 - 材质      
const materialFolder = objectFolder.addFolder('材质');      
materialFolder.addColor(cube.material, 'color').name('颜色');      
materialFolder.add(cube.material, 'transparent').name('是否透明');      
materialFolder.add(cube.material, 'opacity', 0, 1).name('透明度');      
materialFolder.addColor(cube.material, 'emissive').name('高光');      
materialFolder.open();
   
// 创建分组 - 光源      
const lightFolder = gui.addFolder('光源');
   
// 创建分组 - 环境光      
const ambientLightFolder = lightFolder.addFolder('环境光');      
ambientLightFolder.addColor(ambientLight, 'color').name('颜色');      
ambientLightFolder.add(ambientLight, 'intensity', 0.1, 2).name('强度').step(0.1);      
ambientLightFolder.open();
   
// 创建分组 - 点光源      
const pointLightFolder = lightFolder.addFolder('点光源');      
pointLightFolder.addColor(pointLight, 'color').name('颜色');      
pointLightFolder.add(pointLight, 'intensity', 0.1, 2).name('强度').step(0.1);
   
// 创建分组 - 点光源位置      
const pointLightPositionFolder = pointLightFolder.addFolder('位置');      
pointLightPositionFolder.add(pointLight.position, 'x', -100, 100).name('x坐标');      
pointLightPositionFolder.add(pointLight.position, 'y', -100, 100).name('y坐标');      
pointLightPositionFolder.add(pointLight.position, 'z', -100, 100).name('z坐标');      
pointLightPositionFolder.open();
   
pointLightFolder.open();      
lightFolder.open();      
objectFolder.open(); 
   
// // 创建分组 - 重置   
// const controlsFolder = gui.addFolder('Controls');   
// controlsFolder.add({ reset: resetToDefaults }, 'reset').name('setDefault');   
// controlsFolder.open();
