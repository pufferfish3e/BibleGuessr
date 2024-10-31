import logic
import os
from flask import Flask, render_template, request
from markupsafe import Markup

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('landing_page.html')

@app.route('/BibleGuessr',methods=["POST","GET"])
def bibleguessr():
   global data
   global my_book
   global my_chapter
   global my_verse
   global score
   logic.generate_random_verse()
   data = logic.fetch_bible_verse(str(logic.book),str(logic.chapter),str(logic.verse))
   return render_template('bibleguessr.html', text_content=Markup(data), hint1=f"Book: {str(logic.book)}", hint2=f"Book and Chapter: {str(logic.book)} {str(logic.chapter)}")

@app.route('/guess', methods=["GET","POST"])
def guess():
   score = None
   average = 0
   if request.method == "POST":
      my_book = request.form["book"]
      my_chapter = request.form["chapter"]
      my_verse = request.form["verse"]
      score = logic.points(my_book,my_chapter,my_verse)
      average = logic.average(score)
   return render_template('guess.html',average=average,text_content=Markup(data), score=score, book=str(logic.book), chapter=str(logic.chapter), verse=str(logic.verse))

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000)) 
    app.run(host='0.0.0.0', port=port, debug=True)
