/**
 * A small utility function to determine if a color should be black or white based on another color.
 *
 * Credits: https://gist.github.com/jurv/bff64ce786dd5f6058f9d94e3c70fe47
 * @returns true if the color should be black, false if the color should be white.
 */

export function shouldTextBeBlack(backgroundColor: string) {
  return computeLuminence(backgroundColor) > 0.179;
}

function computeLuminence(backgroundColor: string) {
  const colors = hexToRgb(backgroundColor);
  if (!colors) return 0;

  const components = ['r', 'g', 'b'] as const;
  for (const i in components) {
    const c = components[i];

    colors[c] = colors[c] / 255.0;

    if (colors[c] <= 0.03928) {
      colors[c] = colors[c] / 12.92;
    } else {
      colors[c] = Math.pow((colors[c] + 0.055) / 1.055, 2.4);
    }
  }

  const luminence = 0.2126 * colors.r + 0.7152 * colors.g + 0.0722 * colors.b;

  return luminence;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

/**
 * Generates a random hsl pastel color.
 * Credits: https://stackoverflow.com/questions/43193341/how-to-generate-random-pastel-or-brighter-color-in-javascript
 * @returns a random hsl object
 */
export function generateRandomPastelHsl() {
  return {
    h: 360 * Math.random(),
    s: 25 + 70 * Math.random(),
    l: 85 + 10 * Math.random()
  };
}

/**
 * Converts any hsl color to an hex string.
 * Credits: https://stackoverflow.com/a/44134328
 * @param0 the hsl object.
 * @returns a hex this of the hsl color
 */
export function hslToHex({ h, s, l }: { h: number; s: number; l: number }) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * combines {@link generateRandomPastelHsl()} and {@link hslToHex()}
 * @returns a random pastel string in hex format
 */
export function generateRandomPastelHex() {
  return hslToHex(generateRandomPastelHsl());
}
