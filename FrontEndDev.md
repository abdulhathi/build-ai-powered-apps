## Chatbot front end development.
---
### 4. Building the Front End
---
#### 4.1. Building chatbot component
- [x] Create chatbot component in components
- [x] Design the text area and send button
- [x] Remove the border in text area and disable the resize.
- [x] Set the border to whole div which contains text area and button
- [x] Use the react icons to decorate the up arrow button font
- [x] Use the placeholder text in the text area 'Ask anything'

#### 4.2. Handling form submission
- [x] Installing react-hook-form in front-end
- [x] Create form data type with 'prompt'
- [x] Using the register, handleSubmit
- [x] Register the text area and destructure
- [x] Using the form
- [x] onSubmit to use the handleSubmit and reset the form
- [x] When key press 'Enter' button to call the handle submit
- [x] Disable button enable only if the form is valid.
- [x] Disable button even if the text area has the empty text.

#### 4.3. Calling the backend
- [x] Install the axios in client
- [x] Calling the 'api/chat' endpoint
- [x] use the cypto randomUUID for conversation id
- [x] use the useRef hook to hold the randomUUID and Because useRef hook will not rerender component even when the value is keeps on changing. 

#### 4.4. Rendering the messages
- [x] Rendering chat response message in div.
- [x] Receive the chat messages as ChatMessage type.
- [x] Maintain the mssages in useState hook.
  
#### 4.5. Styling messages
- [x] Differentiate user and bot messages by defining a new type
- [x] Style the user mesages to right with different color
- [x] Style the bot messages to left with different color
- [x] Apply overall padding and margin to look better. 
  
#### 4.6. Rendering Mark down text
- [x] Installing react-markdown
- [x] Render the content inside the markdown component

#### 4.7. Adding typing indicator
- [x] useState to maintain the aninmation when bot typing
- [x] set bot typing state value true and false
- [x] Using tailwind animate pulse and animation delay aribitrary value delay the animation.

#### 4.8. Auto scrolling to the latest message
- [x] declare a useRef hook with the refence of HTMLFormElement
- [x] refer the declared useRef hook in to the form
- [x] Create a new useEffect hook. And inside hook the formRef element to behave smooth scrolling whenever the change of messages.

#### 4.9. Improving copy behaviour
- [x] Window.getSelection method to select and trim the selected text
- [x] onCopy event from the paragraph element to set the clipboard data to the trimmed selected values as 'text/plain' format.
- [x] prevent default to the deffault behaviour in onCopy Event
  
#### 4.10. Imporoving the look and feel
- [x] Apply horizontal view port height to the app level
- [x] Keep text area and button container div bottom of the page
- [x] Change the auto scroll to chat message div
- [x] Change the paragraph element to div element because of error showing the 'ol' element inside the 'p' element.
- [x] Set the auto focus to the textarea by default
  
#### 4.11. Handling Errors
- [x] Handle the error using the try catch block inside the handleSubmit
- [x] Make some changes on the api side to create an error
- [x] useState hook to have the error message and display after the loading indicator.
- [x] Clear the error message every time when make the request.


### Prompt Engineering
---
#### Improving Chatbot Responses
- [x] create the prompt text two summarize about the topic
- [x] Load the summarized topic text file in to the server
- [x] pass the summarized text to the openAi client request instructions attribute
  
#### Adding sound effects
- [x] Adding a sound files
- [x] Import the sound file
- [x] Create a seprate audio object for pop message and notifications
- [x] Reduce the object volume to 0.2
- [x] Place the sount when prompt and response received.

#### Exercise 1: Fixing Poorly Formatted Ticket Prices

- [x] 1.Ask your chatbot: “How much are tickets?”
- [x] 2.Pay attention to the response. Right now, it probably tries to dump a table into the chat - not very user-friendly!
- [x] 3.Your challenge: update your prompt so the chatbot summarizes ticket prices in a simple list.
- [x] 4.You might notice that when the chatbot outputs a bulleted list, the bullets don’t actually show up in your app. That’s because Tailwind removes default list styles. To  fix this, you can use the Tailwind Typographyplugin, which restores nice defaults for lists, headings, and other rich text

#### Exercise 2: Adding a Ticket Link

- [x] 1.Ask: “Where can I buy tickets?” or “How much are tickets?”
- [x] 2.Notice that the chatbot gives you prices, but it doesn’t actually help you buy them.
- [x] 3.Your task: refine the prompt so whenever tickets are mentioned, the chatbot includes this link: https://wonderworld.com/tickets

#### Exercise 3: Adding a Ticket Link

- [x] 1.Ask your chatbot: “What rides do you have?”
- [x] 2.Notice how it just throws out a huge list for every age group. That’s overwhelming!
- [x] 3.Your job: tweak the prompt so the chatbot first asks a quick clarifying question to identify the rider profile.
- [x] 4.Once the user picks, the chatbot should only show the rides for that group. Much cleaner and more helpful. 
