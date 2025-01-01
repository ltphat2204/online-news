CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE "users" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "username" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "role" text CHECK ("role" IN ('admin', 'editor', 'writer', 'subscriber')) NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "is_blocked" boolean DEFAULT false,
  "is_premium" boolean DEFAULT false,
  "premium_expired" timestamp,
  "email" varchar UNIQUE NOT NULL,
  "fullname" varchar NOT NULL,
  "pen_name" varchar,
  "dob" date
);

CREATE TABLE "social_networks" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "provider" text CHECK ("provider" IN ('facebook', 'google', 'github')),
  "social_id" varchar
);

CREATE TABLE "category_groups" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "name" varchar,
  "description" text
);

CREATE TABLE "categories" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "name" varchar NOT NULL,
  "description" text,
  "group_id" UUID,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE TABLE "articles" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "title" varchar UNIQUE NOT NULL,
  "abstract" text,
  "content" text NOT NULL,
  "thumbnail" varchar,
  "is_premium" boolean DEFAULT false,
  "view_count" int DEFAULT 0,
  "status" text CHECK ("status" IN ('draft', 'approved', 'published', 'rejected')) DEFAULT 'draft',
  "published_at" timestamp,
  "category_id" UUID,
  "author_id" UUID,
  "editor_id" UUID,
  "reject_reason" text,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE TABLE "hashtags" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "tag_name" varchar UNIQUE NOT NULL,
  "usage" int DEFAULT 0,
  "created_at" timestamp DEFAULT now()
);

CREATE TABLE "article_tag" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "article_id" UUID,
  "tag_id" UUID
);

CREATE TABLE "comment" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "author_id" UUID,
  "article_id" UUID NOT NULL,
  "guest_name" varchar,
  "content" text,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

CREATE TABLE "editor_category" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "editor_id" UUID NOT NULL,
  "category_id" UUID
);

-- Indexes
CREATE INDEX ON "users" ("username");
CREATE INDEX ON "users" ("email");
CREATE INDEX ON "users" ("fullname");
CREATE INDEX ON "users" ("pen_name");
CREATE INDEX ON "articles" ("status", "published_at");
CREATE INDEX ON "articles" ("view_count");


-- Foreign Keys
ALTER TABLE "social_networks" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "categories" ADD FOREIGN KEY ("group_id") REFERENCES "category_groups" ("id");
ALTER TABLE "articles" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
ALTER TABLE "articles" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");
ALTER TABLE "articles" ADD FOREIGN KEY ("editor_id") REFERENCES "users" ("id");
ALTER TABLE "article_tag" ADD FOREIGN KEY ("article_id") REFERENCES "articles" ("id");
ALTER TABLE "article_tag" ADD FOREIGN KEY ("tag_id") REFERENCES "hashtags" ("id");
ALTER TABLE "comment" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");
ALTER TABLE "comment" ADD FOREIGN KEY ("article_id") REFERENCES "articles" ("id");
ALTER TABLE "editor_category" ADD FOREIGN KEY ("editor_id") REFERENCES "users" ("id");
ALTER TABLE "editor_category" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

-- Setup for FTSearch
-- Add search_vector column
ALTER TABLE articles ADD COLUMN search_vector tsvector;
-- Create extension remove accents
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Create extension pg_trgm
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create vietnamese config
CREATE TEXT SEARCH CONFIGURATION vietnamese (COPY = simple);

-- Use unaccent for vietnamese config
ALTER TEXT SEARCH CONFIGURATION vietnamese
ALTER MAPPING FOR asciiword, word
WITH unaccent, simple;

-- Create immutable function for unaccent
CREATE OR REPLACE FUNCTION immutable_unaccent(text)
RETURNS text AS $$
BEGIN
  RETURN unaccent($1);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create index for articles using immutable_unaccent
CREATE INDEX idx_title_trgm ON articles USING gin (immutable_unaccent(title) gin_trgm_ops);
CREATE INDEX idx_abstract_trgm ON articles USING gin (immutable_unaccent(abstract) gin_trgm_ops);
CREATE INDEX idx_content_trgm ON articles USING gin (immutable_unaccent(content) gin_trgm_ops);

-- Create trigger for articles
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('vietnamese', immutable_unaccent(NEW.title || ' ' || NEW.abstract || ' ' || NEW.content));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_search_vector
BEFORE INSERT OR UPDATE ON articles
FOR EACH ROW
EXECUTE FUNCTION update_search_vector();