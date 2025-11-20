// Global Variables
let imageURL = null;         
let currentFile = null;      

// --- DOM Elements ---
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const uploadBtn = document.getElementById('uploadBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resultsSection = document.getElementById('resultsSection');
const loading = document.getElementById('loading');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// --- DOM Elements (Result Images) ---
const resultOriginal = document.getElementById("originalPreview");   
const resultProcessed = document.getElementById("processedPreview"); 

// --- Event Listeners ---
fileInput.addEventListener('change', handleFileSelect);
uploadArea.addEventListener('dragover', handleDragOver);
uploadArea.addEventListener('drop', handleDrop);

// --- Initialize Gallery Sliders ---
document.addEventListener('DOMContentLoaded', () => {
    const allImgBoxes = document.querySelectorAll(".img-box");
    allImgBoxes.forEach(box => initSlider(box));
});

// --- Notifications ---
function showNotification(message, isError = false) {
    notificationText.textContent = message;
    notification.classList.remove('error');
    if (isError) notification.classList.add('error');

    notification.classList.remove('show');
    void notification.offsetWidth; // trigger reflow
    notification.classList.add('show');

    setTimeout(() => notification.classList.remove('show'), 4000);
}

// --- File Handling ---

// 1. Handle "Browse" Button
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        currentFile = file; // Store the file globally
        processFile(file);
    }
}

// 2. Handle Drag Over visuals
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

// 3. Handle Drop
function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    
    if (file && file.type.startsWith('image/')) {
        currentFile = file; // <--- IMPORTANT: Store the dropped file globally
        processFile(file);
    } else {
        showNotification('Please drop a valid image file.', true);
    }
}

function processFile(file) {
    // Validate size
    if (file.size > 10 * 1024 * 1024) {
        showNotification('File size too large. Please select an image under 10MB.', true);
        return;
    }
    
    // RESET EVERYTHING
    imageURL = null;
    if(resultProcessed) resultProcessed.src = ""; // Wipe old result
    resultsSection.style.display = 'none';        // Hide result section
    downloadBtn.disabled = true;

    // Update Info Text
    fileInfo.textContent = `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    
    // Show new Original Image
    const originalImageURL = URL.createObjectURL(file);
    if(resultOriginal) resultOriginal.src = originalImageURL;

    uploadBtn.disabled = false;
    showNotification('Image ready for processing!');
}

// --- API Submission ---
function submitHandler() {
    // <--- FIX: Use 'currentFile' instead of 'fileInput.files[0]'
    if (!currentFile) {
        showNotification('Please select an image first.', true);
        return;
    }
    
    uploadBtn.disabled = true;
    loading.style.display = 'block';
    progressContainer.style.display = 'block';
    resultsSection.style.display = 'none'; 
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 90) progress = 90;
        progressBar.style.width = `${progress}%`;
    }, 200);
    
    const formData = new FormData();
    formData.append('image_file', currentFile); // Send the stored file
    formData.append('size', 'auto');

    fetch('http://localhost:3000/api/remove-bg', {
        method: 'POST',
        body: formData
    })
    .then(function(response) {
        if (!response.ok) throw new Error('API request failed');
        return response.blob();
    })
    .then(function(blob) {
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        
        setTimeout(() => {
            // Clean up memory
            if (imageURL) URL.revokeObjectURL(imageURL);
            imageURL = URL.createObjectURL(blob);
            
            // Update Result Image
            if(resultProcessed) resultProcessed.src = imageURL;
            
            // Show Results
            resultsSection.style.display = 'block';
            downloadBtn.disabled = false;
            
            // Reset Loading UI
            loading.style.display = 'none';
            progressContainer.style.display = 'none';
            progressBar.style.width = '0%';
            uploadBtn.disabled = false;
            
            showNotification('Background removed successfully!');
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    })
    .catch(function(error) {
        clearInterval(progressInterval);
        console.error('Error:', error);
        loading.style.display = 'none';
        progressContainer.style.display = 'none';
        progressBar.style.width = '0%';
        uploadBtn.disabled = false;
        showNotification('Failed to remove background. Please try again.', true);
    });
}

function downloadFile() {
    if (!imageURL) {
        showNotification('No processed image available to download.', true);
        return;
    }
    const anchorElement = document.createElement('a');
    anchorElement.href = imageURL;
    anchorElement.download = 'background-gon.png';
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
    showNotification('Image downloaded successfully!');
}

// --- SLIDER LOGIC (Gallery) ---
function initSlider(box) {
    const wrap = box.querySelector(".img-wrap");
    const originalImg = box.querySelector(".original-img");
    const divider = box.querySelector(".divider");
    
    if(!wrap || !originalImg || !divider) return;

    function updateWidth() {
        originalImg.style.width = box.offsetWidth + "px";
    }
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    originalImg.onload = updateWidth;

    function moveSlide(clientX) {
        let rect = box.getBoundingClientRect();
        let x = clientX - rect.left;
        
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        
        wrap.style.width = x + "px";
        divider.style.left = x + "px";
    }

    box.addEventListener('mousemove', (e) => moveSlide(e.clientX));
    box.addEventListener('touchmove', (e) => moveSlide(e.touches[0].clientX));
}