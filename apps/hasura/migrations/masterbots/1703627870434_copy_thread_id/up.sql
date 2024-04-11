UPDATE message
SET thread_id = thread.thread_id
FROM thread
WHERE message.old_thread_id = thread.old_thread_id;
