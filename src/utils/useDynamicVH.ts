import { useEffect } from "react";

const useDynamicVH = () => {

    function update() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    useEffect(() => {
        update();
    },[])
}

export default useDynamicVH;