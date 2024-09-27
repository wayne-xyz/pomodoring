let audio;

export const initializeAudio = () => {
  audio = new Audio('/sounds/piano-sound.mp3');
};

export const playSound = () => {
  if (audio) {
    audio.play().catch(error => console.error('Error playing sound:', error));
  } else {
    console.warn('Audio not initialized');
  }
};
