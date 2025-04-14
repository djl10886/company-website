-- Create the function that will be called by the trigger
CREATE OR REPLACE FUNCTION handle_new_waitlist_entry()
RETURNS TRIGGER AS $$
DECLARE
  supabase_url text;
  supabase_key text;
BEGIN
  -- Get the Supabase URL and key from environment variables
  supabase_url := current_setting('supabase.functions.url', true);
  supabase_key := current_setting('supabase.functions.key', true);

  -- Call the Edge Function
  PERFORM
    net.http_post(
      url := supabase_url || '/functions/v1/send-welcome-email',
      body := json_build_object('email', NEW.email)::text,
      headers := json_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || supabase_key
      )
    );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't prevent the insert
    RAISE WARNING 'Error sending welcome email: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_waitlist_entry_added ON waitlist;
CREATE TRIGGER on_waitlist_entry_added
  AFTER INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_waitlist_entry();