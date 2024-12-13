
CREATE TABLE article_hashtags (
    article_id INT REFERENCES articles(id) ON DELETE CASCADE,
    hashtag_id INT REFERENCES hashtags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, hashtag_id)
);