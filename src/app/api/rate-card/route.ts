import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, company, phone, email, adType, budget, message } = body;

    // ── Validation ──────────────────────────────────────────────────────────
    if (!name || !phone || !email || !adType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ── Log to console (replace with Supabase/DB insert below) ─────────────
    console.log("[RATE CARD ENQUIRY]", {
      name, company, phone, email, adType, budget, message,
      timestamp: new Date().toISOString(),
    });

    /*
    ── SUPABASE INTEGRATION (uncomment when ready) ────────────────────────────
    import { createClient } from "@supabase/supabase-js";
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    await supabase.from("rate_card_enquiries").insert([{
      name, company, phone, email, ad_type: adType, budget, message
    }]);

    ── EMAIL NOTIFICATION (e.g. Resend) ──────────────────────────────────────
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "noreply@werudigital.co.ke",
        to: "sales@werudigital.co.ke",
        subject: `New Rate Card Enquiry from ${name}`,
        text: `Name: ${name}\nCompany: ${company}\nPhone: ${phone}\nEmail: ${email}\nAd Type: ${adType}\nBudget: ${budget}\nMessage: ${message}`,
      }),
    });

    ── WHATSAPP ALERT (WhatsApp Business API) ─────────────────────────────────
    // See: https://developers.facebook.com/docs/whatsapp/cloud-api/
    */

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[RATE CARD ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
