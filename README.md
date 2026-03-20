# Question-to-Practice Test

This project converts a text file with questions and answers into an interactive web test.
Built with **HTML**, **CSS**, and **JavaScript**.

## How to run
Just open `index.html` in your browser.

## How It Works

### Data Structure (`questions.js`)
The `questions` variable is a 2D array:
- Each inner array represents a different test.
- Each question is an object:
```javascript
{
  "question": "What is the primary quality indicator?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct": 0 // index of the correct answer
}

### Game Logic
The app displays one question at a time.
Selection process:
- It picks one random question from the first test array.
- Then it shuffles the options before displaying them.
- The next question is picked from the second test array, and so on.
- The cycle repeats until all questions are answered.
- Uses a separate shuffled index array to track and pick questions.

## Development
I use [TODO.md](TODO.md) to manage my tasks.
Commit messages are linked to tasks:
- `[#N]` — the task number from the TODO list.
- Example: `git commit -m "[#1] feat: add question array"`

## Current Goal
- [ ] #1 feat: combine many tests into one test
