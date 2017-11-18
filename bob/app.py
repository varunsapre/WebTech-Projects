from flask import Flask,render_template,json, request,redirect,url_for, jsonify
from flaskext.mysql import MySQL
from werkzeug import generate_password_hash, check_password_hash
import glob,pprint,datetime
from mutagen.mp3 import MP3

app = Flask(__name__)
mysql = MySQL()
 
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'sapre'
app.config['MYSQL_DATABASE_DB'] = 'Bob'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()
cursor = conn.cursor()


lib = dict()
songs = list()
User = None
def populate_lib():
	global lib
	lib = {}
	artist_list = glob.glob('static/music/*')
	artist_list = [x.split('/')[2] for x in artist_list]
	for artist in artist_list:
		album_list = glob.glob('static/music/'+artist+'/*/')
		album_list = [x.split('/')[3] for x in album_list]
		lib[artist]=dict()
		for album in album_list:
			song_dir = glob.glob('static/music/'+artist+'/'+album+'/*.mp3')
			lib[artist][album] = dict()
			for song in song_dir:
				song_info = MP3(song)
				song_title = song_info['TIT2'].text[0]
				song_length = str(datetime.timedelta(seconds=song_info.info.length)).split(':')[1:3]	
				song_length = str((':').join(song_length).split('.')[0])
				if '/' in song_info['TRCK'].text[0]:
					song_trck = int(str(song_info['TRCK'].text[0]).split('/')[0])
				else:
					song_trck = int(song_info['TRCK'].text[0])
				songs.append([song_title,song])
				lib[artist][album][song_title] = [song_trck,song_length,song]
	#pprint.pprint(songs)
@app.route("/home")
def main():
	populate_lib()
	#pprint.pprint(lib) 
	return render_template('index.html')
#--------------------LOGIN--------------------
@app.route("/")
@app.route("/login",methods=["GET"])
def login():
	return render_template('login.html')
    
    
@app.route('/signup',methods=['POST'])
def signup():
	
	fname = request.form['fname']
	lname = request.form['lname']
	email = request.form['email']
	password = request.form['passwd']
	hash_password = generate_password_hash(password)
	if fname and email and password:
		cursor.execute("INSERT INTO User (fname,lname,email,password) VALUES ('"+fname+"','"+lname+"','"+email+"','"+hash_password+"');")
		conn.commit()
		return redirect(url_for('login'),code=303)
	else:
		return json.dumps({'html':'<span>Enter the required fields</span>'})
@app.route('/loginUser',methods=['POST'])
def logUser():
	global User
	email = request.form['email']	
	password = request.form['password']
	hash_password = generate_password_hash(password)
	if email and password:
		res = cursor.execute("SELECT password FROM User WHERE email= '"+email+"';")
		data = cursor.fetchone()
		print(data,password)
		if data:
			if check_password_hash(data[0],password):
				User = data[0]
				return redirect(url_for('main'),code=303)	
			else:
				return redirect(url_for('login'),code=303)	
		else:
			return redirect(url_for('login'),code=303)
	else:
			return redirect(url_for('login'),code=303)	
#--------------------stuff--------------------
@app.route('/splash',methods=["GET"])
def splashScreen():
	global User
	return render_template('splash.html',user=User)
@app.route('/artists',methods=["GET"])
def showArtist():
	return render_template('artist.html',artists=sorted(lib))

@app.route('/<artst>/albums',methods=["GET"])
def showAlbum(artst):
	if '%20' in artst:
		artst.split('%20').join(" ")
	return render_template('album.html',albums=sorted(lib[artst]),artist=artst,all=False)

@app.route('/albums',methods=["GET"])
def showAllAlbums():
	all_albums = []
	for each in lib:
		for al in lib[each]:
			all_albums.append([each,al])
	all_albums.sort(key=lambda x: x[1])
	pprint.pprint(all_albums)
	return render_template('album.html',albums=all_albums,all=True)

@app.route('/search',methods=["GET"])
def search():
	f = open("music.txt","r")
	query = request.args.get('name')
	data = []
	for song in f.readlines():
		if(is_ascii(song)):
			if(song.lower().startswith(query.lower())):
				data.append(song.strip())
			
	if(len(data)>10):
			return json.dumps(data[:10])
	return json.dumps(data)

def is_ascii(s):
	return all(ord(c) < 128 for c in s)

@app.route('/songs',methods=['GET'])
def showAllSongs():
	song_list = list()
	count = 0
	rank = 1
	for artist in lib:
		for album in lib[artist]:
			for song in lib[artist][album]:
				count +=1
				if count%3 == 0 and rank<=15:
					song_list.append([rank,song,lib[artist][album][song][1],lib[artist][album][song][2]])
					rank +=1
	return render_template('song.html',song_=sorted(song_list),all=True)

@app.route('/select/<song_name>',methods=['GET'])
def showSelected(song_name):
	print song_name
	if '%20' in song_name:
		song_name.split("%20")
		" ".join(song_name)
	song_dir = [x for x in songs if x[0].lower()==song_name.lower()][0]
	print song_dir
	
	artist = song_dir[1].split("/")[2]
	album = song_dir[1].split("/")[3]
	cover_src = song_dir[1].split("/")[:-1]
	cover_src = "/".join(cover_src)+"/cover.jpg"
	return render_template('single_song.html',loc=song_dir[1],name=song_name,artist=artist,album=album,src=cover_src)


@app.route('/<artist>/<album>/songs',methods=['GET'])
def showSongs(artist,album):
	song_list = list()
	for song in lib[artist][album]:
		song_list.append([lib[artist][album][song][0],song,lib[artist][album][song][1],lib[artist][album][song][2].decode('utf-8')])
	#print sorted(song_list)
	return render_template('song.html',song_=sorted(song_list),artist=artist,album=album,all=False)

@app.route('/stream')
def newSongSend():
	global oldtime
	while(1):
		newtime = os.path.getmtime("newsongs.txt")
		if(newtime>oldtime):
			d = sendData()
			oldtime = newtime
			return Response(d,mimetype="text/event-stream")
	
def sendData():
	f = open('newsongs.txt','r')
	f.seek(0)
	t = f.read().strip()
	#print("Inside func : "+t)
	dat = "event:received\n" + 'data: %s\n\n' % t
	f.close()
	return dat

if __name__ == "__main__":
	app.run(debug=True, threaded=True,host='0.0.0.0')