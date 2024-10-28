import logic
import os
from flask import Flask, render_template
from markupsafe import Markup

logic.generate_random_verse()
data = logic.fetch_bible_verse(str(logic.book),str(logic.chapter),str(logic.verse))

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('landing_page.html')

@app.route('/BibleGuessr')
def bibleguessr():
    global data
    return render_template('bibleguessr.html', text_content=Markup(data), hint1=f"Book: {str(logic.book)}", hint2=f"Book and Chapter: {str(logic.book)} {str(logic.chapter)}")  

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000)) 
    app.run(host='0.0.0.0', port=port)
