import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiEffect({ setShowConfetti }) {

  useEffect(() => {
    const end = Date.now() + 1 * 100;
    const colors = ["#29ff45", "#25c1fa", "#f52296"]; // Цвета
    // const colors = ["#fc4921", "#34ebdb", "#faf0ff"]; // Цвета

    function frame() {
      confetti({
        particleCount: 7,
        angle: 65,
        spread: 55,
        origin: { x: 0 }, // Слева
        colors: colors,
      });
      
      confetti({
        particleCount: 7,
        angle: 125,
        spread: 55,
        origin: { x: 1 }, // Справа
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
      if (Date.now() >= end) {
        setTimeout(() => setShowConfetti(false), 3000)
      }
    }

    frame(); // Запуск анимации

    // Очистка эффекта при размонтировании компонента
    return () => confetti.reset();
  }, []);

  return null; // Компонент не отображает ничего в DOM
};

