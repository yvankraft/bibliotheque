import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import nodemailer from "nodemailer";

// Configuration du transporteur pour l'envoi d'emails avec Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const emailFooter = `
  <div style="margin-top: 40px; border-top: 1px solid #333; padding-top: 20px; text-align: center; color: #888; font-family: sans-serif; font-size: 12px;">
    <p style="margin: 0; font-weight: bold; color: #fff;">Visual Web Builder for Developers</p>
    <p style="margin: 5px 0;">Reinventing no-code for engineers.</p>
    <p style="margin-top: 15px; font-style: italic;">
      Design visually like Figma, export clean production-ready fullstack source code.
    </p>
  </div>
`;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!user.username) {
            const baseUsername = user.email ? user.email.split("@")[0] : "user";
            const randomSuffix = Math.floor(1000 + Math.random() * 9000);

            return {
              data: {
                ...user,
                username: `${baseUsername}_${randomSuffix}`,
              },
            };
          }
          return {
            data: user,
          };
        },
      },
    },
  },

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  appName: "Visual Web Builder",
  allowSubDomains: true,

  emailAndPassword: {
    enabled: true,
    revokeSessionsOnPasswordReset: true,

    onExistingUserSignUp: async ({ user }) => {
      const isFrench = true;

      const subject = isFrench
        ? "Tentative d'inscription avec votre email"
        : "Sign-up attempt with your email";

      const body = isFrench
        ? `
      <p>Quelqu'un a tenté de créer un compte avec votre adresse e-mail.</p>
      <p>Si c'était vous, veuillez essayer de vous connecter directement.</p>
      <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.</p>`
        : `
      <p>Someone tried to create an account using your email address.</p>
      <p>If this was you, please try signing in instead.</p>
      <p>If you did not initiate this request, you can safely ignore this email.</p>`;

      await transporter.sendMail({
        from: `"Visual Web Builder" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: subject,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 20px;">
        <h1 style="text-align: center; font-family: serif; letter-spacing: 2px;">VISUAL BUILDER</h1>
        <div style="padding: 20px 0;">
          ${body}
        </div>
        ${emailFooter} 
      </div>`,
      });
    },

    sendResetPassword: async ({ user, url }, request) => {
      const lang = request?.headers.get("accept-language")?.startsWith("en")
        ? "en"
        : "fr";

      const content = {
        fr: {
          subject: "Réinitialisation de votre mot de passe",
          title: "RÉINITIALISATION",
          message: "Une demande de réinitialisation de mot de passe a été émise pour votre compte.",
          button: "Réinitialiser",
          ignore: "Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.",
        },
        en: {
          subject: "Reset your password",
          title: "PASSWORD RESET",
          message: "A password reset request has been initiated for your account.",
          button: "Reset Password",
          ignore: "If you did not request this, you can safely ignore this email.",
        },
      };

      const t = content[lang];

      await transporter.sendMail({
        from: `"Visual Web Builder" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: t.subject,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 40px; border: 1px solid #333;">
          <h1 style="text-align: center; font-family: serif; letter-spacing: 4px; font-size: 24px;">VISUAL BUILDER</h1>
          <h2 style="text-align: center; font-size: 16px; margin: 30px 0; letter-spacing: 2px;">${t.title}</h2>
          <p style="font-size: 14px; margin-bottom: 30px; text-align: center;">${t.message}</p>
          <div style="text-align: center;">
            <a href="${url}" style="border: 1px solid #fff; color: #fff; padding: 12px 30px; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; display: inline-block;">${t.button}</a>
          </div>
          <p style="font-size: 11px; color: #666; margin-top: 40px; text-align: center;">${t.ignore}</p>
          ${emailFooter}
      </div>`,
      });
    },

    onPasswordReset: async ({ user }, request) => {
      const lang = request?.headers.get("accept-language")?.startsWith("en")
        ? "en"
        : "fr";

      const content = {
        fr: {
          subject: "Sécurité de votre compte",
          title: "SÉCURITÉ",
          message: "Votre mot de passe a été mis à jour avec succès.",
          warning: "Si cette modification n'est pas de votre fait, contactez immédiatement notre support.",
        },
        en: {
          subject: "Account Security",
          title: "SECURITY",
          message: "Your password has been successfully updated.",
          warning: "If this change was not initiated by you, please contact our support team immediately.",
        },
      };

      const t = content[lang];

      await transporter.sendMail({
        from: `"Visual Web Builder" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: t.subject,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 40px; border: 1px solid #333; text-align: center;">
          <h1 style="font-family: serif; letter-spacing: 4px; font-size: 24px;">VISUAL BUILDER</h1>
          <h2 style="font-size: 16px; margin: 30px 0; letter-spacing: 2px;">${t.title}</h2>
          <p style="font-size: 14px; margin-bottom: 20px;">${t.message}</p>
          <p style="font-size: 12px; color: #666; margin-top: 20px;">${t.warning}</p>
          ${emailFooter}
      </div>`,
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, token }, request) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/verify-email?token=${token}`;
      const lang = request?.headers.get("accept-language")?.startsWith("en")
        ? "en"
        : "fr";

      const content = {
        fr: {
          subject: "Vérification de votre compte",
          title: "BIENVENUE",
          message: "Veuillez confirmer votre adresse e-mail pour activer votre compte.",
          button: "Confirmer",
        },
        en: {
          subject: "Verify your account",
          title: "WELCOME",
          message: "Please confirm your email address to activate your account.",
          button: "Confirm",
        },
      };

      const t = content[lang];

      await transporter.sendMail({
        from: `"Visual Web Builder" <${process.env.SMTP_USER}>`,
        to: user.email,
        subject: t.subject,
        html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 40px; border: 1px solid #333; text-align: center;">
            <h1 style="font-family: serif; letter-spacing: 4px; font-size: 24px;">VISUAL BUILDER</h1>
            <h2 style="font-size: 16px; margin: 30px 0; letter-spacing: 2px;">${t.title}</h2>
            <p style="font-size: 14px; margin-bottom: 30px;">${t.message}</p>
            <a href="${verificationUrl}" style="background: #fff; color: #000; padding: 12px 30px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; display: inline-block;">${t.button}</a>
            ${emailFooter}
        </div>`,
      });
    },
  },

  user: {
    // Activation de la suppression de compte ici
    deleteUser: {
      enabled: true,
    },

    additionalFields: {
      username: {
        type: "string",
        required: false,
        input: false,
      },
      lastActiveAt: {
        type: "date",
        required: false,
        input: false,
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "DEVELOPER",
      },
      coverImage: {
        type: "string",
        required: false,
      },
    },

    changeEmail: {
      enabled: true,
      sendVerificationEmail: async (
        { user, url }: { user: any; url: string; token: string },
        request?: Request,
      ) => {
        const newEmail = user.email;
        const lang = request?.headers.get("accept-language")?.startsWith("en")
          ? "en"
          : "fr";

        const content = {
          fr: {
            subject: "Validation de votre nouvelle adresse",
            title: "CHANGEMENT D'ADRESSE",
            message: `Veuillez confirmer le changement vers votre nouvelle adresse e-mail : ${newEmail}`,
            button: "Valider le changement",
          },
          en: {
            subject: "Verify your new email address",
            title: "EMAIL CHANGE",
            message: `Please confirm the change to your new email address: ${newEmail}`,
            button: "Confirm change",
          },
        };

        const t = content[lang];

        await transporter.sendMail({
          from: `"Visual Web Builder" <${process.env.SMTP_USER}>`,
          to: newEmail,
          subject: t.subject,
          html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 40px; border: 1px solid #333; text-align: center;">
            <h1 style="font-family: serif; letter-spacing: 4px; font-size: 24px;">VISUAL BUILDER</h1>
            <h2 style="font-size: 16px; margin: 30px 0; letter-spacing: 2px;">${t.title}</h2>
            <p style="font-size: 14px; margin-bottom: 30px;">${t.message}</p>
            <a href="${url}" style="border: 1px solid #fff; color: #fff; padding: 12px 30px; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; display: inline-block;">${t.button}</a>
            ${emailFooter}
        </div>`,
        });
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 3,
    updateAge: 60 * 60 * 24,
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowLinking: true,
      pkce: true,
    },
  },
});