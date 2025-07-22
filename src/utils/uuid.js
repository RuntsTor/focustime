/**
 * uuidv4 generates a random UUID (version 4) string.
 * Example output: '3b12f1df-5232-4804-897e-917bf397618a'
 * Uses Math.random for randomness (not cryptographically secure).
 */
export const uuidv4 = () => {
  // Replace x/y in the template with random hex digits
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0, // Random integer from 0 to 15
      v = c == "x" ? r : (r & 0x3) | 0x8 // Set bits for version and variant
    return v.toString(16)
  })
}
