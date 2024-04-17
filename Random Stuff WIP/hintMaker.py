import google.generativeai as genai
import json
import time

genai.configure(api_key="APk")

# Set up the model
generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  }
]

model = genai.GenerativeModel(model_name="gemini-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)


# Read the JSON file
with open('output.json', 'r') as file:
    data = json.load(file)


# Iterate over all keys at the top level of the JSON structure

# while True:
c=0
wordCount = 0

# for key in data:
  # Iterate over each item in the list associated with the current key

for item in data['advanced']:
    # if wordCount>=2341:
    word = item['word']

    user_input = f'''Summerize this {item['hint']} within 4 words'''

    if len(item['hint']) > 50:
        try:
            response = model.generate_content(user_input).text
            # Assuming 'response' is a string or has a 'text' attribute that can be checked for emptiness
            if response and response.strip(): # Check if response is not empty and not just whitespace
                # print("Bot:", response)
                item['hint'] = response
                c+=1
            else:
                print("No response generated for word:", word)
        except Exception as e:
            print(f"An error occurred: {e}")
            wordCount+=1
            print(word, item)
            
            # Handle the error, e.g., by logging it, retrying, or setting a default response

        # Write the modified JSON back to a file
        with open('output.json', 'w') as file:
            json.dump(data, file, indent=4)

        time.sleep(1)
        
        
    # print('done = ',c)
    # print('problem = ',wordCount)
    # print(item)
# if wordCount==0:
#   print('game over')
#   break

      

print("Modified JSON has been written")
