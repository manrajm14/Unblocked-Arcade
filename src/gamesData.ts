/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Game {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  category: string;
  description: string;
}

/**
 * HOW TO ADD GAMES MANUALLY:
 * 1. Add a new object to the GAMES array below.
 * 2. Each object must have:
 *    - id: A unique string (e.g., "my-game-1")
 *    - title: The display name of the game
 *    - thumbnail: URL to an image for the game card
 *    - url: The URL of the game (usually an iframe link)
 *    - category: (Optional) e.g., "Action", "Puzzle"
 *    - description: (Optional) A short blurb about the game
 * 
 * Example:
 * {
 *   id: "example-game",
 *   title: "Example Game",
 *   thumbnail: "https://picsum.photos/seed/game/400/300",
 *   url: "https://example.com/game-embed",
 *   category: "Action",
 *   description: "A fun example game."
 * }
 */

export const GAMES: Game[] = [
  // Start with an empty array as requested.
  // Add games here following the format above.
];
