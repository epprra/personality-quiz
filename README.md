# personality-quiz

This is a static, tag-based personality quiz.

## What it does
- Presents a multi-question personality quiz
- Calculates trait scores locally in the browser
- Generates a unique tag only after quiz completion
- Displays the tag and results to the user
- Does NOT store partial progress
- Does NOT handle purchasing

## How it works
- Pure HTML / CSS / JavaScript
- All quiz state exists only in memory
- Data is only saved after explicit completion (future Supabase integration)

## Purpose
The generated tag is used on a separate purchasing site to manually match
quiz results for customized orders.

## Status
Early development. Storage not yet enabled.
