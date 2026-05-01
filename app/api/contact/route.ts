import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, unit, moveIn, message } = body

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL

    if (!apiKey || !contactEmail) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: 'RMRZ Legacy <inquiries@rmrzlegacymanagement.com>',
      to: contactEmail,
      replyTo: email,
      subject: `New Screening Request: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #b8860b; border-bottom: 2px solid #b8860b; padding-bottom: 10px;">
            New Screening Request from ${name}
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="tel:${phone}">${phone}</a>
              </td>
            </tr>
            ${unit ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Preferred Unit:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${unit}</td>
            </tr>
            ` : ''}
            ${moveIn ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Move-in Date:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${moveIn}</td>
            </tr>
            ` : ''}
          </table>
          
          ${message ? `
          <div style="margin-top: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This inquiry was submitted via rmrzlegacymanagement.com</p>
          </div>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
