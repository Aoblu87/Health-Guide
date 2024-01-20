"use client"
import LottiePlayer from "react-lottie-player";
import animation from "@/public/assets/hello.json"
export const HelloAnimation=()=>{
    return <div className="flex absolute">
    <LottiePlayer
      animationData={animation}
      play
      
      style={{ width: 250, height: 250 }}
    />
  </div>
}