import google.generativeai as genai
import json
import time

genai.configure(api_key="API_KEY")

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


c=0
# Iterate over all keys at the top level of the JSON structure
for key in data:
    # Iterate over each item in the list associated with the current key
    for item in data[key]:
        word = item['word']
        lst = ["Nature", "Sports", "Science & Technology", "Travel", "Music and Arts", "History"]

        user_input = f"You have to chose a subcatagory for the word {word} form these subcatagory {lst}."

        if item['subcategory']==[]:
            response = model.generate_content(user_input).text
            print("Bot:", response)
            for i in lst:
                if i in response:
                    item['subcategory'].append(i)

            # Write the modified JSON back to a file
            with open('output.json', 'w') as file:
                json.dump(data, file, indent=4)

            time.sleep(1)
            
        c+=1
        print('loading = ',c)
        print(item)
        

print("Modified JSON has been written to 'output.json'.")