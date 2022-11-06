import json
import sqlite3
from flask import Flask, render_template
import datetime
import os

con = sqlite3.connect("main.db", check_same_thread=False)

cur = con.cursor()
#res = cur.execute("select * from class")

#con.close()
template_dir = os.path.abspath('../front/templates')
app = Flask(__name__, template_folder=template_dir)

@app.route('/')
def main():
	return render_template('index.html', in_val=datetime.datetime.utcnow())
	

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
	for i in range(0, len(k)):
		tempArray.append({"questionID":i+1,"question":DBarray[i][1],"answer":DBarray[i][2]})
	return json.dumps(tempArray)

app.run(host='0.0.0.0', port=8000)

