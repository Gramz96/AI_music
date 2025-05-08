import streamlit as ui
from langchain.llms import OpenAI #to make use of ai

#create UI for APP
ui.title("💃🕺 AI Music Generator")

#input from user 
input_section =ui.text_input("Enter Music Title")
