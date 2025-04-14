import { Resend } from 'npm:resend@3.2.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email) {
      throw new Error('Email is required');
    }

    console.log('Attempting to send email to:', email);
    console.log('Using Resend API key:', Deno.env.get('RESEND_API_KEY')?.slice(0, 5) + '...');

    const { data, error } = await resend.emails.send({
      from: 'Clankr Intelligence <general@clankrintelligence.com>',
      to: email,
      subject: 'Welcome to Clankr Intelligence Waitlist',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <img src="https://raw.githubusercontent.com/djl10886/image-hosting/refs/heads/main/processed_logo_black_on_transparent.png" 
               alt="Clankr Intelligence Logo" 
               style="width: 100px; height: auto; margin-bottom: 20px;"
          />
          <h1 style="color: #1e40af; margin-bottom: 20px;">Welcome to Clankr Intelligence!</h1>
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            Thank you for joining our waitlist! We're thrilled to have you on board and can't wait to share our innovative AI-powered NPC framework with you.
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            Stay tuned for updates on our progress and early access opportunities!
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #374151; margin-bottom: 5px;">Best regards,</p>
            <p style="color: #1e40af; font-weight: bold;">The Clankr Intelligence Team</p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Resend API error:', error);
      throw error;
    }

    console.log('Email sent successfully:', data);

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.response?.data || error.response || 'No additional details available'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});