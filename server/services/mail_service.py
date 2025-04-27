from datetime import datetime
from flask import current_app, render_template
from flask_mail import Mail, Message


class MailService:
    def __init__(self):
        self.mail = Mail()

    def init_app(self, app):
        self.mail.init_app(app)

    # @staticmethod
    def send_otp_email(self, email, otp, name=None):
        try:
            # Use email username if name is not provided
            display_name = name if name else email.split('@')[0]

            # Prepare template context
            context = {
                'name': display_name,
                'otp': otp,
                'year': datetime.now().year,
            }

            # Render the template with context
            html_content = render_template("email/otp_verification.html", **context)

            msg = Message(
                subject="TruestRide: Here's the 6-digit verification code you requested",
                recipients=[email],
                sender=current_app.config['MAIL_USERNAME'],
                html=html_content
            )
            self.mail.send(msg)
            return True
        except Exception as e:
            return False
