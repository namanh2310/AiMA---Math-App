from flask import Flask
from flask_cors import CORS
from routes.Router import Router
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# db setting
username = "postgres"
password = "admin"
dbname = "aima_forum"
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{username}:{password}@localhost:5432/{dbname}"
db = SQLAlchemy(app)

@app.route("/", methods=["GET"])
def index():
    return 'Restful API Successfully Called!!!'

Router.run(app)

if __name__ == '__main__':
    # with app.app_context():
    #     db.create_all() # <--- create db object.
    app.run(host='localhost', port='8081')

#===============

# from flask import Flask,request,render_template,url_for,jsonify,redirect,flash
# from flask_sqlalchemy import SQLAlchemy

# Init App
# app = Flask(__name__)
# our database uri


# Create A Model For Table
# class User(db.Model):
#     _tablename_ = 'user'
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(1000))
#     password = db.Column(db.String(6000))

# @app.route('/',methods=['GET'])
# def index():
#     posts = User.query.all()

# @app.route('/posts',methods=['GET','POST'])
# def add_posts():
#     if request.method == 'POST':
#         data = request.json
#         email = data['emailSignIn']
#         password = data['passwordSignIn']
#         # createdAt = datetime.today().date()
#         new_user = User(email = email, password = password)
#         db.session.add(new_user)
#         db.session.commit()
#         print(new_user)
#     return jsonify(str(new_user))

