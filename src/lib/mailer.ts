import "server-only";
import nodemailer from "nodemailer";

type SendEmailOptions = {
	to: string | string[];
	subject: string;
	html: string;
	text?: string;
	fromEmail?: string;
	fromName?: string;
};

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
	if (cachedTransporter) return cachedTransporter;

	const host = process.env.SMTP_HOST;
	const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
	const user = process.env.SMTP_USER;
	const pass = process.env.SMTP_PASS;
	const secure =
		typeof process.env.SMTP_SECURE !== "undefined"
			? String(process.env.SMTP_SECURE).toLowerCase() === "true"
			: port === 465;

	if (!host || !user || !pass) {
		throw new Error(
			"SMTP is not configured. Please set SMTP_HOST, SMTP_USER, SMTP_PASS (and optionally SMTP_PORT, SMTP_SECURE)."
		);
	}

	console.log(`[DEBUG_EMAIL] Configuring SMTP with Host: ${host}, Port: ${port}, User: ${user}, Secure: ${secure}`);

	cachedTransporter = nodemailer.createTransport({
		host,
		port,
		secure,
		auth: { user, pass },
	});

	return cachedTransporter;
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
	const transporter = getTransporter();

	const fromEmail = options.fromEmail || process.env.FROM_EMAIL || "lorniotmarcel@gmail.com";
	const fromName = options.fromName || process.env.FROM_NAME || "Application Navette";
	const from = `"${fromName}" <${fromEmail}>`;

	await transporter.sendMail({
		from,
		to: Array.isArray(options.to) ? options.to.join(",") : options.to,
		subject: options.subject,
		html: options.html,
		text: options.text,
	});
}

export function isEmailConfigured(): boolean {
	return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}


