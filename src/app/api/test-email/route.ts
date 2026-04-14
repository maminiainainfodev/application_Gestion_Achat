import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const testEmail = searchParams.get('to') || "marcelalyh@gmail.com";

        console.log(`[TEST_EMAIL] Attempting to send test email to ${testEmail}...`);

        await sendEmail({
            to: testEmail,
            subject: "Test Configuration Email Navette",
            html: "<h1>Ceci est un email de test</h1><p>Si vous recevez ceci, la configuration SMTP fonctionne correctement.</p>",
            text: "Ceci est un email de test. Si vous recevez ceci, la configuration SMTP fonctionne correctement.",
        });

        console.log(`[TEST_EMAIL] Email sent successfully to ${testEmail}`);

        return NextResponse.json({
            success: true,
            message: `Email de test envoyé avec succès à ${testEmail}. Vérifiez votre boîte de réception (et vos spams).`,
            targetEmail: testEmail
        });

    } catch (error: any) {
        console.error("[TEST_EMAIL] Error sending email:", error);
        return NextResponse.json({
            success: false,
            message: "Échec de l'envoi de l'email.",
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
