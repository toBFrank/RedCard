import json
import sqlite3
from flask import Flask, render_template, request, redirect, url_for, make_response
import datetime
import os
import bcrypt
import uuid
from flask_cors import CORS


con = sqlite3.connect("main.db", check_same_thread=False)

cur = con.cursor()
#res = cur.execute("select * from class")

#con.close()
template_dir = os.path.abspath('../front/templates')
app = Flask(__name__, template_folder=template_dir)
CORS(app)

@app.route('/')
def main():
	res = cur.execute("select * from user")
	hold = res.fetchall()
	return render_template('index.html', in_val=hold)
	

@app.route('/classlist')
def classList():
	res =  cur.execute("select * from class")
	return res.fetchall()

@app.route('/userlist')
def userList():
	res = cur.execute("select * from user")
	return res.fetchall()

@app.route('/flashlist/<id>')
def flashlist(id=None):
	res = cur.execute("select * from qa where flashID="+id+"")
	tempArray = []
	#x={[]}
	DBarray = res.fetchall()
	for i in range(0, len(DBarray)):
		tempArray.append({"questionID":i+1,"question":DBarray[i][1],"answer":DBarray[i][2]})
	return json.dumps(tempArray)


@app.route('/checkDoot', methods = ['GET'])
def checkDoot(userVoter:str):
	res = cur.execute("SELECT voted FROM checkVote WHERE name = '"+ userVoter +"'")
	arrayOfVotes = res.fetchall()
	return json.dumps(arrayOfVotes)

@app.route('/login', methods=['GET', 'POST'])
def login():
	err = None
	res = cur.execute("select * from user")

	if request.method == 'POST':
		userNameGivenBy = request.form['username']
		passGivenBy = request.form['password']
		nameOfUser = isUser(passGivenBy, userNameGivenBy)
		if nameOfUser != False:
			resp = make_response(render_template('index.html'))
			cookieID = uuid.uuid4()
			resp.set_cookie('UserID', str(cookieID).encode('utf-8'))
			cur.execute("UPDATE user SET cookie = '" + str(cookieID) + "' WHERE name ='" + userNameGivenBy + "'")
			return resp
		else:
			return redirect('/')
	return render_template('login.html', error=err)

@app.route('/register', methods=['GET', 'POST'])
def register():
	err = None
	res = cur.execute("select * from user")
	if request.method == 'POST':
		userNameGivenBy = request.form['username']
		passGivenBy = request.form['password']

		salted = bcrypt.gensalt() 
		res = cur.execute("INSERT INTO user (name) VALUES ('" + userNameGivenBy + "')")
		res = cur.execute("UPDATE user SET salt ='" + str(salted)[2:len(salted)+2] + "' where name= '" + userNameGivenBy + "'") 
		HashedPassword = bcrypt.hashpw(passGivenBy.encode('utf-8'),salted) 
		res = cur.execute("UPDATE user SET passHash ='" + str(HashedPassword)[2:len(HashedPassword)+2] + "' where name = '" + userNameGivenBy + "'") 

		resp = make_response(render_template('index.html'))
		cookieID = uuid.uuid4()
		resp.set_cookie('UserID', str(cookieID).encode('utf-8'))
		cur.execute("UPDATE user SET cookie = '" + str(cookieID) + "' WHERE name ='" + userNameGivenBy + "'")
		return resp
	return render_template('login.html', error=err)

@app.route('/logOut', methods=['GET', 'POST'])
def logOut():
	err = None
	res = cur.execute("select * from user")
	if request.method == 'POST':
		resp = make_response("Cookie Removed")
		resp.set_cookie('UserID', '', max_age = 0)
		return resp

@app.route('/classes', methods = ['GET'])
def classDisp():
	res = cur.execute("SELECT name FROM class")
	return render_template('classes.html', class_list = res.fetchall() )

@app.route('/flashpost', methods=['POST'])
def flashpost():
    print(request.get_data())
    return 'cool'


@app.route('/quizMake', methods=['POST'])
def quizMake(whichClass:str):
	return 'success'

@app.route('/flashes/<id>')
def flashes(id=None):
	res = cur.execute("select user from flash where class='"+id+"'")
	a=[]
	b=res.fetchall()
	for i in range(0, len(b)):
		a[i]=cur.execute("select name from user where rowid='"+b[i]+"'")
	return render_template('flashlist.html', flash_list=a)
		

@app.route('/classes')
def classes():
	return render_template('classes.html', class_list=cur.execute("select name from class").fetchall())



@app.route('/doot', methods=['POST'])
def doot():
	print(request.get_data())
	y = json.loads(request.get_data())
	uID = y['UserID']
	qID = y['qID']
	allVotes = cur.execute("SELECT votes from checkvote where user = '"+ uID +"'").fetchall()
	if qID in allVotes:
		return 'already'
	allVotes.append(qID)
	currentKarma = cur.execute("SELECT doots from qa where ID = '" + qID + "'").fetchone()
	currentKarma = currentKarma + 1
	cur.execute("UPDATE qa set doots = '" + currentKarma + "' where ID = '" + qID + "'")
	cur.execute("UPDATE checkvote set votes = '" + allVotes + "' where user = '" + uID + "'")
	return 'success'

def isUser(passGiven:str, userGiven:str) -> bool:
	cur.execute("SELECT passHash, salt FROM user WHERE name = '" + userGiven + "'")
	arrayToWork = cur.fetchone()
	if len(arrayToWork) == 0:
		return False
	passHashed, salted = arrayToWork
	hashedCheck = bcrypt.hashpw(passGiven.encode('utf-8'), salted.encode('utf-8'))
	if passHashed == str(hashedCheck)[2:len(hashedCheck)+2] :
		return True
	return False



app.run(host='0.0.0.0', port=8000)

#lol=bcrypt.gensalt() 
#res=cur.execute("UPDATE user SET salt ='"+str(lol)[2:len(lol)+2]+"' where name= 'josh'") 
#bcrypt.hashpw("ass32",hashToDo[0][0].encode('utf-8'))
#HashedPassword = bcrypt.hashpw("ass32".encode('utf-8'),hashToDo[0][0].encode('utf-8')) 
#res = cur.execute("UPDATE user SET salt = '" + str(lol)[2:len(lol)+2] + "' WHERE name = 'josh'")
#str(HashedPassword)[2:len(HashedPassword)+2]    
