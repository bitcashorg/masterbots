-- This will allow for more human-readable URLs for threads
-- Function to remove SEO-unfriendly words from the slug
CREATE OR REPLACE FUNCTION filter_seo_words(input_text text) RETURNS text AS $$
DECLARE
  words text[];
  result text := '';
  word text;
  word_count integer := 0;
  max_words integer := 10;
  filtered_words text[];
BEGIN
  -- Convert text to lowercase and split into words
  input_text := lower(input_text);
  words := regexp_split_to_array(input_text, '-');
  
  -- Create an array of words to remove
  filtered_words := ARRAY[
    -- Articles
    'a',
    'an',
    'the',

    -- Coordinating Conjunctions
    'and',
    'but',
    'or',
    'nor',
    'for',
    'so',
    'yet',

    -- Subordinating Conjunctions
    'although',
    'because',
    'since',
    'unless',
    'whereas',
    'while',

    -- Correlative Conjunctions
    'both',
    'either',
    'neither',
    'whether',
    'not',
    'only',

    -- Prepositions
    'about',
    'above',
    'across',
    'after',
    'against',
    'along',
    'amid',
    'among',
    'around',
    'as',
    'at',
    'before',
    'behind',
    'below',
    'beneath',
    'beside',
    'besides',
    'between',
    'beyond',
    'by',
    'concerning',
    'despite',
    'down',
    'during',
    'except',
    'for',
    'from',
    'in',
    'inside',
    'into',
    'like',
    'near',
    'of',
    'off',
    'on',
    'onto',
    'out',
    'outside',
    'over',
    'past',
    'per',
    'regarding',
    'round',
    'since',
    'through',
    'throughout',
    'to',
    'toward',
    'towards',
    'under',
    'underneath',
    'until',
    'unto',
    'up',
    'upon',
    'with',
    'within',
    'without',

    -- Auxiliary Verbs
    'am',
    'are',
    'is',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'having',
    'do',
    'does',
    'did',
    'doing',
    'can',
    'could',
    'shall',
    'should',
    'will',
    'would',
    'may',
    'might',
    'must',

    -- Common Verb Forms
    'get',
    'gets',
    'getting',
    'got',
    'gotten',
    'make',
    'makes',
    'making',
    'made',
    'take',
    'takes',
    'taking',
    'took',
    'taken',
    'go',
    'goes',
    'going',
    'went',
    'gone',
    'come',
    'comes',
    'coming',
    'came',
    'use',
    'uses',
    'using',
    'used',

    -- Pronouns
    'i',
    'me',
    'my',
    'mine',
    'myself',
    'you',
    'your',
    'yours',
    'yourself',
    'he',
    'him',
    'his',
    'himself',
    'she',
    'her',
    'hers',
    'herself',
    'it',
    'its',
    'itself',
    'we',
    'us',
    'our',
    'ours',
    'ourselves',
    'they',
    'them',
    'their',
    'theirs',
    'themselves',
    'this',
    'that',
    'these',
    'those',
    'who',
    'whom',
    'whose',
    'which',
    'what',
    'whatever',
    'whoever',
    'whomever',

    -- Relative Pronouns
    'that',
    'which',
    'whichever',
    'who',
    'whoever',
    'whom',
    'whomever',
    'whose',

    -- Adverbs (common non-descriptive ones)
    'just',
    'also',
    'then',
    'too',
    'very',
    'rather',
    'quite',
    'somewhat',
    'more',
    'most',
    'less',
    'least',
    'again',
    'almost',
    'already',
    'always',
    'never',
    'ever',
    'perhaps',
    'often',
    'seldom',
    'usually',
    'sometimes',

    -- Interjections
    'oh',
    'ah',
    'wow',
    'ouch',
    'oops',
    'hey',
    'hi',
    'hello',

    -- Quantifiers/Determiners
    'all',
    'any',
    'both',
    'each',
    'every',
    'few',
    'many',
    'much',
    'some',
    'several',
    'no',
    'none',
    'first',
    'second',
    'third',

    -- Common Transition Words
    'additionally',
    'consequently',
    'furthermore',
    'however',
    'meanwhile',
    'moreover',
    'nevertheless',
    'therefore',
    'thus',
    'still',
    'instead',

    -- Filler Words/Phrases
    'actually',
    'basically',
    'certainly',
    'definitely',
    'essentially',
    'generally',
    'literally',
    'probably',
    'really',
    'simply',
    'truly',

    -- Common Question Words (when not used as keywords)
    'how',
    'when',
    'where',
    'why',

    -- Web/Content-Specific Fillers
    'click',
    'read',
    'learn',
    'discover',
    'find',
    'see',
    'view',
    'check',
    'explore',
    'visit',
    'browse',
    'search',
    'look',
    'here',
    'now',
    'today',
    'welcome',
    'please',

    -- Time-Related Words (when not central to content)
    'today',
    'yesterday',
    'tomorrow',
    'now',
    'then',
    'always',
    'never',
    'often',
    'sometimes',
    'soon',
    'later',
    'early',
    'late',
    'daily',
    'weekly',
    'monthly',
    'yearly',
    'annually',

    -- Common Endings
    'ly',
    'ing',
    'ed',
    's',
    'es'
  ];

  -- Filter words and keep up to max_words
  FOREACH word IN ARRAY words
  LOOP
    -- Check if word is not in the filtered_words array and not empty
    IF word != '' AND NOT (word = ANY(filtered_words)) THEN
      IF word_count > 0 THEN
        result := result || '-';
      END IF;
      result := result || word;
      word_count := word_count + 1;
      
      -- Stop after max_words
      IF word_count >= max_words THEN
        EXIT;
      END IF;
    END IF;
  END LOOP;
  
  -- If no words left after filtering, return a default
  IF result = '' THEN
    result := 'untitled-thread';
  END IF;
  
  -- Trim to 100 characters max
  result := substring(result, 1, 100);
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Modify the slugify function to use the filter_seo_words function
-- Function to convert text into a URL-friendly slug
CREATE OR REPLACE FUNCTION slugify(input_text text) RETURNS text AS $$
DECLARE
  slug text;
BEGIN
  -- Convert to lowercase
  slug := lower(input_text);
  
  -- Replace spaces with hyphens
  slug := regexp_replace(slug, '\s+', '-', 'g');
  
  -- Remove special characters
  slug := regexp_replace(slug, '[^a-z0-9\-]', '', 'g');
  
  -- Remove duplicate hyphens
  slug := regexp_replace(slug, '-+', '-', 'g');
  
  -- Trim hyphens from beginning and end
  slug := trim(both '-' from slug);
  
  -- Apply SEO word filtering
  slug := filter_seo_words(slug);
  
  -- If slug is empty, use a fallback
  IF length(slug) = 0 THEN
    slug := 'untitled-thread';
  END IF;
  
  RETURN slug;
END;
$$ LANGUAGE plpgsql;
