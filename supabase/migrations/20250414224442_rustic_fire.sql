-- Create the function that will be called by the trigger
CREATE OR REPLACE FUNCTION handle_new_waitlist_entry()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the Edge Function
  PERFORM
    net.http_post(
      url := CURRENT_SETTING('app.settings.supabase_url') || '/functions/v1/send-welcome-email',
      body := json_build_object('email', NEW.email)::text,
      headers := json_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || CURRENT_SETTING('app.settings.supabase_anon_key')
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_waitlist_entry_added ON waitlist;
CREATE TRIGGER on_waitlist_entry_added
  AFTER INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_waitlist_entry();