import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {
    constructor() 
    {
        super() //inheriting from EventEmitter
        //Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event (update size)
        window.addEventListener("resize", () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger("resize")
            
        })

    }
}