from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime, timezone

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///C:/Users/lenovo/OneDrive/Desktop/soul-script/src/components/backend/static/journal.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class JournalEntry(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    desc = db.Column(db.String(500), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def __repr__(self) -> str:
        return f"{self.sno} - {self.desc}"


def tableCreation():
    db.drop_all()
    db.create_all()

@app.route('/', methods=['POST'])
def add_entry():
    # db.drop_all()
    # db.create_all()
    data = request.get_json()
    desc = data['desc']
    journal_entry = JournalEntry(desc=desc)
    db.session.add(journal_entry)
    db.session.commit()
    return jsonify({'message': 'Entry added successfully'}), 201

@app.route('/show', methods=['GET'])
def show_entries():
    journal_entries = JournalEntry.query.all()
    entries = [{'sno': entry.sno, 'desc': entry.desc, 'date_created': entry.date_created} for entry in journal_entries]
    return jsonify(entries)


@app.route('/api/update-entry/<int:sno>', methods=['PUT'])
def update_journal_entry(sno):
    data = request.json
    entry = JournalEntry.query.filter_by(sno=sno).first()
    if not entry:
        return jsonify({"message": "Entry not found!"}), 404
    entry.desc = data['desc']
    db.session.commit()
    return jsonify({"message": "Entry updated successfully!"})

@app.route('/api/delete-entry/<int:sno>', methods=['DELETE'])
def delete_journal_entry(sno):
    entry = JournalEntry.query.filter_by(sno=sno).first()
    if not entry:
        return jsonify({"message": "Entry not found!"}), 404
    db.session.delete(entry)
    db.session.commit()
    return jsonify({"message": "Entry deleted successfully!"})

if __name__ == "__main__":
    tableCreation()
    app.run(debug=True)


