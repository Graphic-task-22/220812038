import * as THREE from 'three';

const group = new THREE.Group();

function createLine(type){
    const points =[
        new THREE.Vector3(0,0,0),
        type ==='y' ? new THREE.Vector3(0, 100, 0): new THREE.Vector3(100,0,0),
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff}); 
    const line = new THREE.Line(geometry,material); 
    return line;
}

function createScaleLine(type){
     const points =[];
    for (let i = 0;i< 100;i+=10){ 
        if (type ==='y'){
            points.push ( new THREE.Vector3(0,i,0)); 
            points.push ( new THREE.Vector3(-5,i,0));
        }else {
            points.push(new THREE.Vector3(i,0,0)); 
            points.push(new THREE.Vector3(i,-5,0));
        }
    }
    const geometry = new THREE.BufferGeometry(); 
    geometry.setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff}); 
    const line = new THREE.LineSegments(geometry,material); 
    return line;
}

function createBar(dataArr){
    const bars = new THREE.Group();
    dataArr.forEach((data,index) =>{
        const geometry = new THREE.PlaneGeometry(10, data,1,20);
        const material = new THREE.MeshBasicMaterial({vertexColors: true }); 

        const positions = geometry.getAttribute('position');
        const height= 100; 
        const colorArr =[];
        const color1 = new THREE.Color(0xff0000); 
        const color2 = new THREE.Color(0x0000ff); 
        const color3 = new THREE.Color(0x00ff00); 
        for (let i=0; i < positions.count; i++){ 
            const y = positions.getY(i) + data / 2; 
            if (y> 50) {
                const percent = (y - 50)/ 50;
                const c= color2.clone().lerp(color1,percent); 
                colorArr.push(c.r,c.g,c.b);
            }else{
                const percent = y / 50;
                const c = color3.clone().lerp(color2,percent); 
                colorArr.push(c.r,c.g,c.b);
            }
        }
    const colors = new Float32Array(colorArr);
    geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));
    const bar=new THREE.Mesh(geometry,material);
    bar.position.x = index * 20 + 10 + 5;
    bar.position.y = data / 2;
    bars.add(bar);
    });
    return bars;
}
[10,20,30,100]
const xLine = createLine('x');
const yLine = createLine('y');
const yScaleLine = createScaleLine('y');
const xScaleLine = createScaleLine('x');

const bar = createBar([10,20,30,70,50]);
group.add(xLine,yLine,yScaleLine,xScaleLine,bar);

export default group;