-- Create the prompt_user table
CREATE TABLE IF NOT EXISTS public.prompt_user (
    user_id UUID NOT NULL,
    prompt_id INTEGER NOT NULL
);

-- Create object relationships
ALTER TABLE ONLY public.prompt_user
    ADD CONSTRAINT prompt_user_pkey PRIMARY KEY (prompt_id, user_id);

ALTER TABLE ONLY public.prompt_user
    ADD CONSTRAINT prompt_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.prompt_user
    ADD CONSTRAINT prompt_user_prompt_id_fkey FOREIGN KEY (prompt_id) REFERENCES public.prompt(prompt_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
