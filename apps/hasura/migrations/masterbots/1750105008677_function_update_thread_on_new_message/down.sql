-- Drop the triggers
DROP TRIGGER IF EXISTS trigger_update_thread_on_message_insert ON message;
DROP TRIGGER IF EXISTS trigger_update_thread_on_message_update ON message;
DROP TRIGGER IF EXISTS trigger_update_thread_on_message_delete ON message;

-- Drop the function
DROP FUNCTION IF EXISTS update_thread_timestamp();