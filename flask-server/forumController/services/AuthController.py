import uuid
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from forumController.database.connection import db_connection
from forumController.utilities.query import QueryParamFunc

class AuthController:
    def Register():
        if request.method == 'POST':
            conn = db_connection()
            cursor = conn.cursor()
            table_name = "user"
            try:
                checkExistTable = QueryParamFunc('SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = %s)', (table_name,))
                if not checkExistTable[0]:
                    QueryParamFunc('CREATE TABLE "user" (id UUID PRIMARY KEY, email VARCHAR(255) UNIQUE, password VARCHAR(255), firstname VARCHAR(255)), lastname VARCHAR(255), role VARCHAR(255)', ())
            except ValueError:
                return ValueError
            
            data_old = request.json
            id = str(uuid.uuid4())
            data = data_old['payload']
            email = data['emailRegister']
            password = data['passwordRegister']
            firstname = data['firstName']
            lastname = data['lastName']
            role = data['role']


            #check exist email
            checkExistEmail = QueryParamFunc('SELECT EXISTS (SELECT 1 FROM "user" WHERE email = %s)', (email,))
            if checkExistEmail[0]:
                return jsonify('Email already exists')

            #check password
            if len(password) < 6:
                return jsonify('Password must be at least 6 characters')
            
            hashed_password = generate_password_hash(password)
            try:
                QueryParamFunc('INSERT INTO "user" (id, email, password, firstname, lastname, role) VALUES (%s, %s, %s, %s, %s, %s)', (id, email, hashed_password, firstname, lastname, role))
            except ValueError:
                return ValueError

            cursor.close()
            conn.close()
        return jsonify({'register': True})
    
    def Login():
        if request.method == 'POST':
            data_old = request.json
            data = data_old['payload']
            email = data['emailSignIn']
            password = data['passwordSignIn']

            #check exist email
            checkExistEmail = QueryParamFunc('SELECT EXISTS (SELECT 1 FROM "user" WHERE email = %s)', (email,))
            if not checkExistEmail[0]:
                # return jsonify('Email not exists')
                return jsonify({'status': False})

            #check password
            checkPasswordHased = QueryParamFunc('SELECT password FROM "user" WHERE email = %s', (email,))
            if not check_password_hash(checkPasswordHased[0], password):
                # return jsonify('Password incorrect')
                return jsonify({'status': False})
            
            result = QueryParamFunc('SELECT * FROM "user" WHERE email = %s', (email,))
            obj = {
                'id': result[0],
                'email': result[1],
                'status': True,
                'lastName': result[3],
                'firstName': result[4],
                'role': result[5]
                # 'message': 'Successfully login'
            }
        return jsonify(obj)
    
    
    
    
    