-- Function to update thread's updated_at timestamp when messages are modified
CREATE OR REPLACE FUNCTION update_thread_timestamp() 
RETURNS TRIGGER AS $$
BEGIN
  -- Update the thread's updated_at timestamp when a message is inserted, updated, or deleted
  UPDATE thread 
  SET updated_at = NOW() 
  WHERE thread_id = COALESCE(NEW.thread_id, OLD.thread_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for INSERT operations on message table
CREATE TRIGGER trigger_update_thread_on_message_insert
  AFTER INSERT ON message
  FOR EACH ROW
  EXECUTE FUNCTION update_thread_timestamp();

-- Create trigger for UPDATE operations on message table
CREATE TRIGGER trigger_update_thread_on_message_update
  AFTER UPDATE ON message
  FOR EACH ROW
  EXECUTE FUNCTION update_thread_timestamp();

-- Create trigger for DELETE operations on message table
CREATE TRIGGER trigger_update_thread_on_message_delete
  AFTER DELETE ON message
  FOR EACH ROW
  EXECUTE FUNCTION update_thread_timestamp();
