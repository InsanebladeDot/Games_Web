/** Game Experience Payload/Interface */
export interface GameExperience {
  title: string | undefined;
  id: number | null; // Assuming an ID for the experience entry
  userId: number | null; // To link the experience to a user (corresponding to 'user_id')
  username: string; // Corresponding to '用户名'
  experienceImageUrl: string | null; // Corresponding to '游戏体验图片', allowing null if no image
  experienceContent: string; // Corresponding to '感慨内容游戏体验'
  // You might want to add fields like submission date, game ID, etc.
  gameId: number | null; // Optional: link to a specific game
  createdAt: string; // Optional: timestamp of submission
}