CREATE TABLE wants_to_watch (
  media_tmdb_id INTEGER,
  media_type VARCHAR(10),
  media_name TEXT,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES app_user(user_id),
  FOREIGN KEY (media_tmdb_id, media_type) REFERENCES media(media_tmdb_id, media_type),
  PRIMARY KEY (media_tmdb_id, media_type, user_id)
);