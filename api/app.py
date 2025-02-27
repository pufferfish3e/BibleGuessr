
import os
from flask import Flask, render_template, request, redirect, url_for, session, flash
from markupsafe import Markup
import logic

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")

@app.route('/')
def home():
    """Home page route"""
    return render_template('landing_page.html')

@app.route('/BibleGuessr', methods=["GET"])
def bibleguessr():
    """Main game page route"""
    # Generate a new random verse
    verse_data = logic.generate_random_verse()
    
    # Fetch the verse content from the API
    verse_text = logic.fetch_bible_verse(
        verse_data["book"], 
        str(verse_data["chapter"]), 
        str(verse_data["verse"])
    )
    
    # Store in session for later use
    session['current_verse_text'] = verse_text
    
    # Generate hints
    hint1 = f"Book: {verse_data['book']}"
    hint2 = f"Book and Chapter: {verse_data['book']} {verse_data['chapter']}"
    
    return render_template(
        'bibleguessr.html', 
        text_content=Markup(verse_text),
        hint1=hint1, 
        hint2=hint2,
        book_list=logic.get_book_names()  # For validation
    )

@app.route('/guess', methods=["POST"])
def guess():
    """Handle the user's verse guess"""
    if request.method != "POST":
        return redirect(url_for('bibleguessr'))
    
    # Get user's guess
    user_book = request.form.get("book", "")
    user_chapter = request.form.get("chapter", "1")
    user_verse = request.form.get("verse", "1")
    
    # Get the verse text from session
    verse_text = session.get('current_verse_text', '')
    
    # Validate inputs
    if not user_book:
        flash("Please enter a book name", "error")
        return redirect(url_for('bibleguessr'))
    
    try:
        user_chapter = int(user_chapter)
        user_verse = int(user_verse)
    except ValueError:
        flash("Chapter and verse must be numbers", "error")
        return redirect(url_for('bibleguessr'))
    
    # Calculate score
    score = logic.calculate_score(user_book, user_chapter, user_verse)
    percentage = logic.calculate_average(score)
    
    # Get correct answer details
    correct_book = logic.current_verse["book"]
    correct_chapter = logic.current_verse["chapter"]
    correct_verse = logic.current_verse["verse"]
    
    return render_template(
        'guess.html',
        text_content=Markup(verse_text),
        score=score,
        percentage=percentage,
        user_book=user_book,
        user_chapter=user_chapter,
        user_verse=user_verse,
        book=correct_book,
        chapter=correct_chapter,
        verse=correct_verse
    )

@app.errorhandler(404)
def page_not_found(e):
    """Handle 404 errors"""
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    """Handle 500 errors"""
    return render_template('500.html'), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
