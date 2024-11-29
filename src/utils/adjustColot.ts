export const adjustColor = (color, amount) => {
  const clamp = (num) => Math.min(Math.max(num, 0), 255);

  // Convert hex to RGB
  let hex = color.replace("#", "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Darken each component
  r = clamp(r + amount);
  g = clamp(g + amount);
  b = clamp(b + amount);

  // Convert back to hex
  const toHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return "#" + toHex(r) + toHex(g) + toHex(b);
};
