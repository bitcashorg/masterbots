-- Step 1: Create the user_role ENUM type
CREATE TYPE user_role AS ENUM ('admin', 'user', 'moderator', 'anonymous');

-- Step 2: Add the role column to the users table
ALTER TABLE "user" ADD COLUMN role user_role NOT NULL DEFAULT 'user';

-- Step 3: Create an index on the role column for better query performance
CREATE INDEX idx_users_role ON "user"(role);

-- Step 4: Update existing users with whitelisted emails to moderator role
UPDATE "user"
SET role = 'moderator'
WHERE email IN (
    'anouk@bitcash.org',
    'andler@bitcash.org',
    'jimoh@bitcash.org'
    -- Add more email addresses as needed
);

-- Step 5: Create a function to change user roles safely
CREATE OR REPLACE FUNCTION change_user_role(user_email VARCHAR(255), new_role user_role)
RETURNS VOID AS $$
BEGIN
    UPDATE "user"
    SET role = new_role
    WHERE email = user_email;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'User with email % not found', user_email;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Step 6: Create a function to add a new moderator
CREATE OR REPLACE FUNCTION add_moderator(moderator_email VARCHAR(255))
RETURNS VOID AS $$
BEGIN
    UPDATE "user"
    SET role = 'moderator'
    WHERE email = moderator_email;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'User with email % not found', moderator_email;
    END IF;
END;
$$ LANGUAGE plpgsql;