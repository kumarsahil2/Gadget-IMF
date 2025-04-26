const codenames = [
  "The Nightingale",
  "The Kraken",
  "The Phantom",
  "Ghost Protocol",
  "Shadow Hawk"
];

export function generateCodename() {
  return codenames[Math.floor(Math.random() * codenames.length)];
}
