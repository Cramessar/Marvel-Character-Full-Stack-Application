from flask import Flask, request, jsonify
from sqlalchemy import String, Text, Integer, select, create_engine, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker
from flask_sqlalchemy import SQLAlchemy
from marshmallow import ValidationError, fields
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import urllib.parse

app = Flask(__name__)

raw_password = "OKMijn098)(*"
encoded_password = urllib.parse.quote_plus(raw_password)

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://root:{encoded_password}@localhost/marvel"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
db.init_app(app)
ma = Marshmallow(app)
CORS(app)

class Character(Base):
    __tablename__ = "characters"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    alias: Mapped[str] = mapped_column(String(100), nullable=False)
    alignment: Mapped[str] = mapped_column(String(50), nullable=False)
    powers: Mapped[str] = mapped_column(Text, nullable=True)
    image_url: Mapped[str] = mapped_column(String(255), nullable=True)

class CharacterSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "alias", "alignment", "powers", "image_url")

character_schema = CharacterSchema()
characters_schema = CharacterSchema(many=True)

def create_database():
    root_engine = create_engine(f"mysql+mysqlconnector://root:{encoded_password}@localhost")
    with root_engine.connect() as connection:
        connection.execute(text("CREATE DATABASE IF NOT EXISTS marvel"))

with app.app_context():
    create_database()
    db.create_all()

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Marvel Characters API!"}), 200

@app.route('/favicon.ico')
def favicon():
    return '', 204

@app.route('/characters', methods=['GET'])
def get_characters():
    query = select(Character)
    characters = db.session.execute(query).scalars().all()
    return characters_schema.jsonify(characters), 200

@app.route('/characters/<int:id>', methods=['GET'])
def get_character(id):
    character = db.session.get(Character, id)
    if not character:
        return jsonify({"message": "Character not found"}), 404
    return character_schema.jsonify(character), 200

@app.route('/characters', methods=['POST'])
def create_character():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 415

    character_data = request.get_json()
    existing_character = db.session.execute(select(Character).where(Character.name == character_data['name'])).scalar_one_or_none()
    
    if existing_character:
        return jsonify({"error": "Character already exists!"}), 400

    new_character = Character(
        name=character_data['name'], 
        alias=character_data['alias'], 
        alignment=character_data['alignment'], 
        powers=character_data['powers'], 
        image_url=character_data['image_url']
    )

    db.session.add(new_character)
    db.session.commit()

    return jsonify({"message": "Character added successfully", "character": character_schema.dump(new_character)}), 201

@app.route('/characters/<int:id>', methods=['PUT'])
def update_character(id):
    print(f"Received PUT request for character ID: {id}")  # Debugging Log
    character = db.session.get(Character, id)

    if not character:
        print(f"Character with ID {id} not found!")  # Debugging Log
        return jsonify({"message": "Character not found"}), 404

    try:
        character_data = request.get_json()
        print(f"Data received: {character_data}")  # Debugging Log
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    character.name = character_data.get('name', character.name)
    character.alias = character_data.get('alias', character.alias)
    character.alignment = character_data.get('alignment', character.alignment)
    character.powers = character_data.get('powers', character.powers)
    character.image_url = character_data.get('image_url', character.image_url)

    db.session.commit()
    print(f"Character {id} updated successfully!")  # Debugging Log

    return jsonify({"message": "Character updated successfully", "character": character_schema.dump(character)}), 200


@app.route('/characters/<int:id>', methods=['DELETE'])
def delete_character(id):
    character = db.session.get(Character, id)
    if not character:
        return jsonify({"message": "Character not found"}), 404

    db.session.delete(character)
    db.session.commit()
    return jsonify({"message": "Character successfully deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
