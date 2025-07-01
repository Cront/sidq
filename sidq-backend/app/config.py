from datetime import timedelta


class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://sidq_dev:786Y3liS!dq@localhost:5432/sidq_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "YaAli786!"  # TODO: update to random string for security
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=6)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=14)
