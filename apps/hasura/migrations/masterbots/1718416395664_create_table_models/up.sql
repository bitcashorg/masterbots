CREATE TABLE models (
    model_name TEXT UNIQUE NOT NULL
);
INSERT INTO models (model_name) VALUES ('perplexity'), ('anthropic'), ('openAi'), ('wordware');
