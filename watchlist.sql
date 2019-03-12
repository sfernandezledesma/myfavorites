CREATE TABLE watchlist (
  id TEXT PRIMARY KEY, -- id = mediaType[0]_TMDbItemId_userId = itemId_userId. Por ejemplo: m_543_34
  name TEXT NOT NULL,
  item_id VARCHAR(20) NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id)
);