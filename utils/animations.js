// src/utils/animations.js
export const diagonalTilt = {
  initial: { 
    rotate: 0, 
    filter: "drop-shadow(0px 0px 0px rgba(74, 222, 128, 0))" 
  },
  hover: { 
    rotate: 3, 
    filter: "drop-shadow(0px 10px 20px rgba(74, 222, 128, 0.2))",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 15 
    }
  }
};