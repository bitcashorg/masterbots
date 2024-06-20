ALTER TABLE public.thread
ADD COLUMN model VARCHAR(30) NOT NULL DEFAULT 'openAi',
ADD CONSTRAINT fk_model
FOREIGN KEY (model) REFERENCES public.models(model_name);