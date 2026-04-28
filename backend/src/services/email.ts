import { Resend } from 'resend'
import config from '../config/config'

const resend = new Resend(config.EMAIL_API_KEY)
console.log("EMAIL KEY EXISTS:", !!config.EMAIL_API_KEY)


export default {
   sendEmail: async (to: string[], subject: string, text: string) => {
    try {
        console.log("📨 EMAIL TRIGGER CALLED")
        console.log("TO:", to)
        console.log("SUBJECT:", subject)

        const result = await resend.emails.send({
            from: `Coderatory <onboarding@resend.dev>`,
            to,
            subject,
            text
        })

        console.log("📩 RESEND RESPONSE:", result)

        return result
    } catch (error) {
        console.error("❌ EMAIL ERROR:", error)
        throw error
    }
    }
}

/*
export default {
   sendEmail: async (to: string[], subject: string, text: string) => {
        try {
            await resend.emails.send({
                from: `Coderatory <onboarding@resend.dev>`,
                to,
                subject,
                text
            })
        } catch (error) {
            throw error
        }
    }
}
*/
