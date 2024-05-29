CREATE TABLE IF NOT EXISTS public.referral (
    referral_code VARCHAR(6) UNIQUE NOT NULL,
    user_id UUID NOT NULL,
    referrer_id UUID NOT NULL,
    PRIMARY KEY (referral_code),
    FOREIGN KEY (user_id) REFERENCES public.user(user_id),
    FOREIGN KEY (referrer_id) REFERENCES public.user(user_id)
);