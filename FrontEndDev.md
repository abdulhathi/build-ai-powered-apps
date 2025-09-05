<h1 style="text-decoration:underline;">Chatbot front end development.</h1>

## 4. Building the Front End

## 4.1. Building chatbot component
- [x] Create chatbot component in components
- [x] Design the text area and send button
- [x] Remove the border in text area and disable the resize.
- [x] Set the border to whole div which contains text area and button
- [x] Use the react icons to decorate the up arrow button font
- [x] Use the placeholder text in the text area 'Ask anything'

## 4.2. Handling form submission
- [x] Installing react-hook-form in front-end
- [x] Create form data type with 'prompt'
- [x] Using the register, handleSubmit
- [x] Register the text area and destructure
- [x] Using the form
- [x] onSubmit to use the handleSubmit and reset the form
- [x] When key press 'Enter' button to call the handle submit
- [x] Disable button enable only if the form is valid.
- [x] Disable button even if the text area has the empty text.

## 4.3. Calling the backend
- [x] Install the axios in client
- [x] Calling the 'api/chat' endpoint
- [x] use the cypto randomUUID for conversation id
- [x] use the useRef hook to hold the randomUUID and Because useRef hook will not rerender component even when the value is keeps on changing. 

## 4.4. Rendering the messages
- [x] Rendering chat response message in div.
- [x] Receive the chat messages as ChatMessage type.
- [x] Maintain the mssages in useState hook.