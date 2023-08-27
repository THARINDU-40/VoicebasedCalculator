import speech_recognition as sr
import pyttsx3
import re

def get_voice_input():
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("Speak something...")
        recognizer.adjust_for_ambient_noise(source)  # Optional: Adjust for ambient noise
        audio = recognizer.listen(source)

    try:
        text = recognizer.recognize_google(audio)
        print("You said:", text)
        return text
    except sr.UnknownValueError:
        print("Sorry, could not understand audio.")
        return ""
    except sr.RequestError as e:
        print("Error occurred; {0}".format(e))
        return ""

def evaluate_math_expression(expression):
    # Remove non-mathematical characters
    expression = re.sub(r'[^\d+\-*/().]', '', expression)

    try:
        result = eval(expression)
        return result
    except Exception as e:
        print("Error occurred during calculation:", e)
        return None

def set_female_voice():
    engine = pyttsx3.init()

    # Set the voice ID for a female voice (change the voice ID based on your system)
    female_voice_id = "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech_OneCore\Voices\Tokens\MSTTS_V110_taIN_Kala"

    engine.setProperty('voice', female_voice_id)
    return engine

def speak_text(text):
    engine = set_female_voice()
    engine.say(text)
    engine.runAndWait()

def is_stop_command(text):
    return "stop" in text.lower()

# Prompt the user to enter a calculation
speak_text("Please enter a calculation.")

# Main loop to handle user calculations
while True:
    # Call the functions for speech-to-text and text-to-speech
    input_text = get_voice_input()

    # Check if the user said "stop"
    if is_stop_command(input_text):
        speak_text("Thank you for using the calculator app. Goodbye!")
        break

    # Detect the language from the input text
    language_code = 'si' if any(ord(char) > 128 for char in input_text) else 'en'

    # Perform calculations
    result = evaluate_math_expression(input_text)

    if result is not None:
        # Speak the result in the detected language
        speak_text("The result of the calculation is: " + str(result))
    else:
        # Speak the error message
        speak_text("Sorry, an error occurred during the calculation.") 
