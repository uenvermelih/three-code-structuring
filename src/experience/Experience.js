import * as THREE from "three"
import Sizes from "./utils/Sizes.js"
import Time from "./utils/Time.js"
import Camera from "./Camera.js"
import Renderer from "./Renderer.js"
import World from "./World/World.js"
import Resources from "./utils/Resources.js"
import Sources from "./Sources.js"
import Debug from "./utils/Debug.js"

let instance = null

export default class Experience {
    constructor(canvas)
    {

        if(instance)
        {
            return instance
        }
        
        instance = this

        //Global access
        window.experience = this

        //Options
        this.canvas = canvas //saving the canvas prop for later use
        
        //Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(Sources)
        this.camera = new Camera(/* this */) //sending window.experience over
        this.renderer = new Renderer()
        this.world = new World()
        

        // Sizes resize event
        this.sizes.on("resize", () => 
        {
            this.resize()
        })

        // Time tick event
        this.time.on("tick", () =>
        {
            this.update()
        })

    }

    resize() 
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy()
    {

        this.sizes.off("resize")
        this.time.off("tick")

        // Traverse the whole Scene
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                for(const key in child.material)
                {
                    const value = child.material[key]
                    
                    if(value && typeof value.dispose === "function")
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
        {
            this.debug.ui.destroy()
        }
    }



}