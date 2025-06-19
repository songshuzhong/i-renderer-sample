const CSS_INTEGER = '[-\\+]?\\d+%?';
const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
const CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
const PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
const matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
  hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
const hueStep = 2; // 色相阶梯
const saturationStep = 0.1; // 饱和度阶梯，浅色部分
const brightnessStep1 = 0.1; // 亮度阶梯，浅色部分
const lightColorCount = 8; // 浅色数量，主色上
function bound01(n, max) {
  if (isOnePointZero(n)) {
    n = '100%';
  }
  let isPercent = isPercentage(n);
  n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
  if (isPercent) {
    n = parseInt(String(n * max), 10) / 100;
  }
  if (Math.abs(n - max) < 0.000001) {
    return 1;
  }
  if (max === 360) {
    n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max));
  }
  else {
    n = (n % max) / parseFloat(String(max));
  }
  return n;
}
function pad2(c) {
  return c.length === 1 ? '0' + c : String(c);
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  let i = Math.floor(h);
  let f = h - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);
  let mod = i % 6;
  let r = [v, q, p, p, t, v][mod];
  let g = [t, v, v, q, p, p][mod];
  let b = [p, p, t, v, v, q][mod];
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255,
  };
}
function inputToRGB(color) {
  let rgb = { r: 0, g: 0, b: 0 };
  let s = null;
  let v = null;
  if (typeof color === 'string') {
    color = stringInputToObject(color);
  }
  if (typeof color === 'object') {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
    }
    else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
    }
  }
  return {
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
  };
}
function stringInputToObject(color) {
  color = color.trim().toLowerCase();
  let match = matchers.rgb.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3] };
  }
  match = matchers.hsv.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3] };
  }
  match = matchers.hex6.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
    };
  }
  return false;
}
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h = 0;
  let v = max;
  let d = max - min;
  let s = max === 0 ? 0 : d / max;
  if (max === min) {
      h = 0; // achromatic
  }
  else {
      switch (max) {
          case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
          case g:
              h = (b - r) / d + 2;
              break;
          case b:
              h = (r - g) / d + 4;
              break;
          default:
              break;
      }
      h /= 6;
  }
  return { h: h, s: s, v: v };
}
function isValidCSSUnit(color) {
  return Boolean(matchers.CSS_UNIT.exec(String(color)));
}
function convertToPercentage(n) {
  if (n <= 1) {
    return "".concat(Number(n) * 100, "%");
  }
  return n;
}
function isPercentage(n) {
  return typeof n === 'string' && n.indexOf('%') !== -1;
}
function rgbToHex(r, g, b, allow3Char) {
  let hex = [
      pad2(Math.round(r).toString(16)),
      pad2(Math.round(g).toString(16)),
      pad2(Math.round(b).toString(16)),
  ];
  if (allow3Char &&
      hex[0].startsWith(hex[0].charAt(1)) &&
      hex[1].startsWith(hex[1].charAt(1)) &&
      hex[2].startsWith(hex[2].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join('');
}
function isOnePointZero(n) {
  return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
}
function toHsv({ r, g, b }) {
  const hsv = rgbToHsv(r, g, b);
  return {h: hsv.h * 360, s: hsv.s, v: hsv.v};
}
function toHex({ r, g, b }) {
  return `#${rgbToHex(r, g, b, false)}`;
}
function getHue(hsv, i) {
  let hue;
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = Math.round(hsv.h) - hueStep * i;
  } else {
    hue = Math.round(hsv.h) + hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}

function getSaturation(hsv, i) {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  let saturation;
  saturation = hsv.s - saturationStep * i;

  // 边界值修正
  if (saturation > 1) {
    saturation = 1;
  }
  // 第一格的 s 限制在 0.06-0.1 之间
  if (i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Number(saturation.toFixed(2));
}

function getValue(hsv, i) {
  let value;
  value = hsv.v + brightnessStep1 * i;

  if (value > 1) {
    value = 1;
  }
  return Number(value.toFixed(2));
}

export default function generate(color){
  const patterns= [];
  const pColor = inputToRGB(color);
  for (let i = lightColorCount; i > 0; i -= 1) {
    const hsv = toHsv(pColor);
    const colorString = toHex(
      inputToRGB({
        h: getHue(hsv, i),
        s: getSaturation(hsv, i),
        v: getValue(hsv, i),
      }),
    );
    patterns.unshift(colorString);
  }
  patterns.unshift(toHex(pColor));
  return patterns;
}