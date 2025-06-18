import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

// 创建地形几何体（更高细分度使山脉更细腻）
const geometry = new THREE.PlaneGeometry(2000, 2000, 250, 250);
const noise2D = createNoise2D();

// 更新地形高度的函数
export function updatePosition() {
    const positions = geometry.attributes.position;
    const time = Date.now() * 0.001; // 转换为秒

    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);

        // 使用多层噪声创建复杂山脉
        const baseNoise = noise2D(x * 0.005, y * 0.005) * 100; // 基础高度
        const detailNoise = noise2D(x * 0.02, y * 0.02) * 10;  // 细节噪声
        const waveEffect = Math.sin(time + x * 0.005) * 10;      // 动态波动

        positions.setZ(i, baseNoise + detailNoise + waveEffect);
    }
    positions.needsUpdate = true;
}

const material = new THREE.MeshBasicMaterial({
    color: 0x90A4AE,
    wireframe: true,
    opacity: 0.6,  // 较低透明度增强层次感
    transparent: true
});
// 创建网格并旋转至水平
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = -Math.PI / 2; // 旋转为地面
mesh.position.y = -100;         // 下移位置

export default mesh;
