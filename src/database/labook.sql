-- Active: 1676554120173@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT,
    likes INTEGER,
    deslikes INTEGER,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
);

INSERT INTO users (id, name, email, password, role)
VALUES
	("u001", "vanessa", "vr@gmail.com", "blablabla333", "adm" ),
	("u002", "hugo", "hugo@gmail.com", "batata222", "user"),
	("u003", "igor", "igor@gmail.com", "iku123", "user");

INSERT INTO posts (id, creator_id, content)
VALUES ("p001", "u001", "Imprime 'hello world'");

SELECT * FROM posts