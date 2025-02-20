from mongoengine import connect


class DBManager:
    @staticmethod
    def initialize_db(app):
        try:
            connect(
                db=app.config['MONGODB_SETTINGS']['db'],
                host=app.config['MONGODB_SETTINGS']['host']
            )
            # app.logger.info('MongoDB connection established successfully')
            print('MongoDB connection established successfully')
        except Exception as e:
            app.logger.error(f"Failed to connect to MongoDB: {str(e)}")
            raise RuntimeError("MongoDB connection failed") from e
