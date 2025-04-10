from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# Initialize app and database
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "sqlite:///marketeers_database.db"  # Use SQLite for simplicity
)
CORS(app)   
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)

# Create a User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(80), nullable=False)


# Create a Number model
class Number(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    number = db.Column(db.Integer, nullable=False, unique=True)


# Create the DB tables (only needed once to set up the database)
with app.app_context():
    db.create_all()


# Route to get all numbers
@app.route("/numbers", methods=["GET"])
def get_numbers():
    numbers = Number.query.all()
    return jsonify([{"number": number.number,"id": number.id} for number in numbers])


# Route to post numbers
@app.route("/numbers", methods=["POST"])
def add_number():
    data = request.json  # Get data from the request body
    existing_number = Number.query.filter_by(number=data["number"]).first()
    if existing_number:
        return jsonify({"error": "Number already exists"}), 400
    new_num = Number(number=data["number"])  # Create new num
    db.session.add(new_num)

    db.session.commit()
    return jsonify({"id": new_num.id, "number": new_num.number}), 201


# Route to clear numbers
@app.route("/clear_numbers", methods=["GET"])
def clear_numbers():
    Number.query.delete()
    db.session.commit()
    return jsonify({"message": "numbers cleared"})


# Route to get all users
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([{"name": user.name, "email": user.email} for user in users])


# Route to add a new user
@app.route("/register", methods=["POST"])
def add_user():
    data = request.json  # Get data from the request body
    existing_email = User.query.filter_by(email=data["email"]).first()
    print(existing_email)
    if existing_email:
        return jsonify({"message": "Email already exists"}), 400
        # Hash the password
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    db.session.add(
        User(name=data["name"], email=data["email"], password=hashed_password)
    )
    db.session.commit()
    return (
        jsonify(
            {
                "name": data["name"],
                "email": data["email"],
                "password": hashed_password,
            }
        ),
        201,
    )


# Route to login
@app.route("/login", methods=["POST"])
def login():
    data = request.json  # Get data from the request body
    # Check if user exists
    user = User.query.filter_by(email=data["email"]).first()

    if user and bcrypt.check_password_hash(user.password, data["password"]):
        return (
            jsonify(
                {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                }
            ),
            200,
        )
    else:
        return jsonify({"message": "Invalid email or password"}), 401


if __name__ == "__main__":
    app.run(debug=True)
