
import * as bjs from 'babylonjs';
import { Vector3 } from 'babylonjs';
import { Scene } from '../../glsg';
import { PieMenuElement } from '../Elements/PieMenuElement';
import { TextMeshModelLoader } from '../../glsg/lib/TextMeshModelLoader';
import { TextMeshString } from '../../glsg/lib/TextMeshString';
const CANNON = require('cannon');
const OIMO = require('oimo');

export class PieMenuScene extends Scene
{
    itemCount : number = 9;
    menu:PieMenuElement
    //menuPosition : Vector3 = new Vector3(-4,3.15,0);
    //menuPosition : Vector3 = new Vector3(-4.25,4.25,10);
    menuPosition : Vector3 = new Vector3(-1.5,0,0);

    centerBox : bjs.Mesh;



    constructor(public title: string, public canvas: HTMLElement, hdrSkyboxTexture: string) {
        super(title,canvas,hdrSkyboxTexture);
    } 
    
    protected async createScene()
    {
        await TextMeshModelLoader.Instance.init(this);
        //this.camera = new bjs.ArcRotateCamera("Camera", 0, 0, 15, new bjs.Vector3(0.0, 0, 100), this.bjsScene);

        //let canvasAspectRatio = (this.canvas.clientWidth/this.canvas.clientHeight);
        let aspectRatio = ( this.canvas.clientHeight * this.camera.viewport.height) / ( this.canvas.clientWidth * this.camera.viewport.width);

        this.camera.radius = 10;
       
        /*
        this.camera.mode = bjs.Camera.ORTHOGRAPHIC_CAMERA;
        this.camera.orthoTop = 5 * aspectRatio;
        this.camera.orthoBottom = -5 * aspectRatio;
        this.camera.orthoLeft = -5;
        this.camera.orthoRight = 5;
    */
        this.camera.setTarget(bjs.Vector3.Zero());

        //let testString : TextMeshString = new TextMeshString("test",0,0,5,this,"GLSG");
        //this.AddSceneElement(testString);
        

        this.bjsScene.gravity = new bjs.Vector3(0, 0, 0);
        this.bjsScene.enablePhysics(this.bjsScene.gravity, new bjs.CannonJSPlugin(true, undefined, CANNON));
        //this.bjsScene.enablePhysics(this.bjsScene.gravity, new bjs.OimoJSPlugin());
        this.bjsScene.collisionsEnabled = true;
		//this.bjsScene.workerCollisions = true;


        var light = new bjs.HemisphericLight("sun", new bjs.Vector3(0,1,0), this.bjsScene);

        this.menu = new PieMenuElement("menu",
                                        this.menuPosition.x,
                                        this.menuPosition.y,
                                        this.menuPosition.z,
                                        this,
                                        this.itemCount);
        //this.menu.rotation.y = Math.PI/8;  
        this.AddSceneElement(this.menu);
        this.camera.wheelPrecision = 15;        
        //this.centerBox = bjs.MeshBuilder.CreateBox("box", { height: 1, width: 1, depth: 1 }, this.bjsScene);
    }

    protected onPreRender()
    {
        if(this.menu && this.menu.pivot && this.menu.axle){

            var menuRay = this.bjsScene.createPickingRay(
                0,
                this.canvas.clientHeight / 2,
                bjs.Matrix.Identity(),
                this.camera
            )
            this.menuPosition = menuRay.origin.add(menuRay.direction.scale(10))
    
            this.menu.position = this.menuPosition;

            this.menu.pivot.position = this.menuPosition;
            this.menu.axle.position = this.menuPosition;

            let axis1 : Vector3 = new Vector3(-1.5,0,0);
            //let axis1 = new bjs.Vector3(this.camera.upVetor());
        }
    }

    protected onRender()
    { 
        /*
        let aspectRatio = ( this.canvas.clientHeight * this.camera.viewport.height) / ( this.canvas.clientWidth * this.camera.viewport.width);

        this.camera.radius = 10;
       
        this.camera.mode = bjs.Camera.ORTHOGRAPHIC_CAMERA;
        this.camera.orthoTop = 5 * aspectRatio;
        this.camera.orthoBottom = -5 * aspectRatio;
        this.camera.orthoLeft = -5;
        this.camera.orthoRight = 5;
        this.camera.setTarget(bjs.Vector3.Zero());
        */
    }
}
