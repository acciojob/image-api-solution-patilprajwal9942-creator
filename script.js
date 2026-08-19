//your code here
const processImage = () => {
  const fileInput = document.getElementById('imageInput');
  const file = fileInput.files[0];
  
  if (!file) {
    alert("Please select an image file first.");
    return;
  }

  // Display local original image preview
  const originalImage = document.getElementById('originalImage');
  originalImage.src = URL.createObjectURL(file);

  const url = 'https://api.imagga.com/v2/colors';
  const formData = new FormData();
  formData.append('image', file);

  fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
      // Replace with your actual encoded Imagga API key and secret
      'Authorization': 'Basic ' + btoa('YOUR_API_KEY:YOUR_API_SECRET')
    }
  })
    .then(response => {
      if (!response.ok) throw new Error('API Request Failed');
      return response.json();
    })
    .then(data => {
      // Get the extracted hex color code from API response
      const hexColor = data.result.colors.image_colors[0].closest_palette_color_html;
      
      // Update UI element with the returned color code
      const processedImage = document.getElementById('processedImage');
      processedImage.style.backgroundColor = hexColor;
      processedImage.style.width = '200px';
      processedImage.style.height = '200px';
    })
    .catch(error => console.error('Error:', error));
};
