import { motion, useAnimate, useDragControls, useMotionValue } from "framer-motion"
import useMeasure from "react-use-measure";

export const Modal = ({open, setOpen, children}) =>{
    const y = useMotionValue(0);    
    const [ref, animate] =useAnimate()
    const controls = useDragControls()
    const [drawerRef, {height}] = useMeasure()
    const handleClose = async () =>{
        
         animate(ref.current, {
            opacity: [1,0]
        })
        const yStart = typeof y.get() === "number" ? y.get(): 0
        await animate("#masterDiv", {
            y: [yStart, height]
        })
        setOpen(false)
    }

    const handleDrag =(e)=>{
        controls.start(e)
    }
  return(
    <>
    {open && <motion.div className="z-50 fixed inset-0 bg-neutral-950/70"
    initial={{opacity:0}}
    animate={{opacity:1}}
    onClick={handleClose}
    ref={ref}
    > <motion.div
        id="masterDiv"
        ref={drawerRef}
        onClick={(e)=>{e.stopPropagation()}}
        initial={{y:"100%"}}
        animate={{y:"0%"}}
        
        
        style={{y}}
        transition={
            { type: "Inertia", stiffness: 100 }
        }
        onDragEnd={()=>{
            if (y.get() >= 100) handleClose();
        }}
        drag="y"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{bottom: 0.7, top:0 }}

        className="absolute bottom-0 h-[75vh] w-full overflow-hidden bg-neutral-900 rounded-t-3xl"
    >
        <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-neutral-900 p-5"
        onPointerDown={handleDrag}
        >
            <button className="rounded-full bg-neutral-600 h-2 w-14 cursor-grab touch-none" 
            onPointerDown={handleDrag}
            /></div>
        <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12" > {children}</div>

    </motion.div>
        
    </motion.div> }
    </>
  )

}
 