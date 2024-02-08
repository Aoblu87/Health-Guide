"use client"
import animation from "@/public/assets/Animation - 1705694936059.json";
import LottiePlayer from "react-lottie-player";
import { HelloAnimation } from "./helloAnimation";
export default function Animation() {
  return (
    <div className="flex justify-center relative">
      <LottiePlayer
        animationData={animation}
        play
        loop
        style={{ width: 350, height: 350 }}
      />
      <div className="absolute">
      {/* <HelloAnimation/> */}

      </div>
    </div>
  );
}
