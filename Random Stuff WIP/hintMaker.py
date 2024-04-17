import google.generativeai as genai
import json
import time

genai.configure(api_key="API")

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
with open('./helper/updatedHints.json', 'r') as file:
    data = json.load(file)

c=0
wordCount = 0
# Iterate over all keys at the top level of the JSON structure
for key in data:
    # Iterate over each item in the list associated with the current key
    for item in data[key]:
        
        # if wordCount>=2341:
        word = item['word']

        user_input = f'''You have to generate a hint for the word {word} make sure to make the hint for a {key} level. 
        Do not mention the word in the hint. Also make the hint ambiguous to make it hard for the user to understand.
        And your reply should only be the short hint nothing more.'''

        if item['hint']=='':
            try:
                response = model.generate_content(user_input).text
                # Assuming 'response' is a string or has a 'text' attribute that can be checked for emptiness
                if response and response.strip(): # Check if response is not empty and not just whitespace
                    print("Bot:", response)
                    item['hint'] = response
                else:
                    print("No response generated for word:", word)
            except Exception as e:
                print(f"An error occurred: {e}")
                wordCount+=1
                
                # Handle the error, e.g., by logging it, retrying, or setting a default response

            # Write the modified JSON back to a file
            with open('./helper/output.json', 'w') as file:
                json.dump(data, file, indent=4)

            time.sleep(1)
            
            c+=1
        print('count = ',c)
        print('loading = ',wordCount)
        print(item)
        

print("Modified JSON has been written")
