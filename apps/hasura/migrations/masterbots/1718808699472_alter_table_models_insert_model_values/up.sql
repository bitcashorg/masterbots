UPDATE public.models
SET model_value = CASE model_name
    WHEN 'perplexity' THEN 'llama3_7B'
    WHEN 'anthropic' THEN 'claude3_haiku'
    WHEN 'openAi' THEN 'gtp-3.5_turbo'
    WHEN 'wordware' THEN 'wordware'
    ELSE model_value
END;