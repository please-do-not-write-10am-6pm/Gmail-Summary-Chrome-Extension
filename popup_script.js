document.querySelector('div').innerHTML = `Gmail Summary<p>
<form>
  <label for="apiKeyInput">API Key:</label><br>
  <input type="text" id="apiKeyInput" value=""><br>
  <button id="saveButton">Save</button>
</form> 
<script>
const saveButton = document.getElementById('saveButton');

// Add an event listener to the button to listen for clicks
saveButton.addEventListener('click', function() {
  // Get the input element
  const apiKeyInput = document.getElementById('apiKeyInput');

  // Change the value of the input field to "API SAVED"
  apiKeyInput.value = 'API SAVED';

  // Save the value of the input field in the extension's local storage
  chrome.storage.local.set({ apiKey: apiKeyInput.value }, function() {
    console.log('API key saved');
  });
});

</script>
<ol style="font-size:14px">
  <li>Install the extension from the <a href="https://chrome.google.com/webstore/">Chrome Web Store</a>.</li>
  <li>Once installed, the extension will add an orange icon next to the email headers in your Gmail or Google Workspace account.</li>
  <li>To view the summary of an email, simply hover your mouse over the orange icon.</li>
  <li>The summary will appear in a tooltip next to the icon.</li>
</ol></p><p>Feel free to send any feedback to gmailsummary@epicmegacorp.com</p>`;
