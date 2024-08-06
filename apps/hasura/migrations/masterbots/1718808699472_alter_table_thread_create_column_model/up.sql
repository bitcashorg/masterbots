DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='thread' AND column_name='model') THEN
        ALTER TABLE public.thread
        ADD COLUMN model VARCHAR(30) NOT NULL DEFAULT 'openAi';
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                   WHERE constraint_name = 'fk_model' AND table_name = 'thread') THEN
        ALTER TABLE public.thread
        ADD CONSTRAINT fk_model
        FOREIGN KEY (model) REFERENCES public.models_enum(name);
    END IF;
END $$;