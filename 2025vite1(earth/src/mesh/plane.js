import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry(200, 100); //矩形平面
// const geometry = new THREE.BoxGeometry(100, 100, 100); //长方体
// const geometry = new THREE.SphereGeometry(100, 30, 30);//球体
console.log('uv',geometry.attributes.uv);

/**纹理坐标0~1之间随意定义*/
const uvs = new Float32Array([
    0, 0, //图片左下角
    1, 0, //图片右下角
    1, 1, //图片右上角
    0, 1, //图片左上角
]);
// 设置几何体attributes属性的位置normal属性
geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2); //2个为一组,表示一个顶点的纹理坐标



//const geometry=new THREE.PlaneGeometry(200,100,100,100);
// const material=new THREE.MeshPhongMaterial({
//     color:0x00ff00,
//     opacity:0.8,
//     transparent:true,
// });

const texLoader=new THREE.TextureLoader();
const texture=texLoader.load('./src/assets/earth.jpg');
const material=new THREE.MeshLambertMaterial({map:texture});
const plane=new THREE.Mesh(geometry,material);
plane.position.z=-50
export default plane;