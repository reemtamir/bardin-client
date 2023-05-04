export function getRandomColor() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  // check if the color is black and generate a new one if it is
  while (red === 0 && green === 0 && blue === 0) {
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
  }

  return `rgb(${red}, ${green}, ${blue})`;
}
