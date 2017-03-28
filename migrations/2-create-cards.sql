CREATE TABLE cards (
  id INTEGER PRIMARY KEY,
  album_id INTEGER,
  message TEXT,
  data TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
