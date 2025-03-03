from flask import current_app
from flask_mail import Mail, Message


class MailService:
    def __init__(self):
        self.mail = Mail()

    def init_app(self, app):
        self.mail.init_app(app)

    # @staticmethod
    def send_otp_email(self, email, otp):
        try:
            msg = Message(
                subject="Your Truest Ride OTP Code",
                recipients=[email],
                sender=current_app.config['MAIL_USERNAME'],
                html=f"""
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #1a237e;">Truest Ride Verification Code</h2>
                            <p>Your one-time access code is: <strong>{otp}</strong></p>
                            <p style="font-size: 0.9em; color: #666;">
                                This code will expire in 5 minutes. Do not share this code with anyone.
                            </p>
                        </div>"""
            )
            self.mail.send(msg)
            return True
        except Exception as e:
            return False
