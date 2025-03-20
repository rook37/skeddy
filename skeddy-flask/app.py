from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import skeddy

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET','POST'])
def index():
    try:
        if request.method == 'POST':
            data = request.json
            team_id = data.get('id')
            season = data.get('season')
            tz = data.get('timezone')
        if(team_id and season and tz):
            output = skeddy.fetch_schedule(season,team_id,tz)
        else:
            return jsonify({"success": False, "error": "Missing required parameters"}), 400
        
        if not output or not output["success"]:
                return jsonify({"success": False, "error": output["error"]}), 500

        csv_path = output["csv_path"]
        return send_file(csv_path, as_attachment=True)

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000, debug=True)

