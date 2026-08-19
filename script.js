let activeElement = null;

// 1. የካርድ ጀርባ መጫኛ Logic
document.getElementById('bg-uploader').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const bgImg = document.getElementById('card-bg');
      bgImg.src = event.target.result;
      bgImg.style.display = 'block';
      document.getElementById('canvas-placeholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
});

// 2. ተጨማሪ ፎቶ (Profile/Logo) ማስገቢያ Logic
document.getElementById('overlay-uploader').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'draggable';
      imgWrapper.style.top = '50px';
      imgWrapper.style.left = '50px';

      const img = document.createElement('img');
      img.src = event.target.result;
      img.className = 'draggable-img';

      imgWrapper.appendChild(img);
      document.getElementById('card-canvas').appendChild(imgWrapper);
      
      makeDraggable(imgWrapper);
      selectElement(imgWrapper);
    };
    reader.readAsDataURL(file);
  }
});

// 3. ጽሁፍ መጨመሪያ Logic
document.getElementById('add-text-btn').addEventListener('click', function() {
  const textValue = document.getElementById('text-input').value;
  if (!textValue.trim()) return;

  const textElement = document.createElement('div');
  textElement.className = 'draggable';
  textElement.innerText = textValue;
  textElement.style.top = '50px';
  textElement.style.left = '50px';
  textElement.style.fontSize = '24px';
  textElement.style.color = '#000000';
  textElement.style.fontFamily = 'sans-serif';

  document.getElementById('card-canvas').appendChild(textElement);
  makeDraggable(textElement);
  selectElement(textElement);

  document.getElementById('text-input').value = '';
});

// 4. መጎተቻ (Drag & Drop) Functionality
function makeDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;

  element.addEventListener('mousedown', function(e) {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    selectElement(element);
    e.stopPropagation();
  });

  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      const canvas = document.getElementById('card-canvas');
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;

      // በካርዱ ወሰን ውስጥ እንዲቀር መገደብ
      x = Math.max(0, Math.min(x, canvas.clientWidth - element.clientWidth));
      y = Math.max(0, Math.min(y, canvas.clientHeight - element.clientHeight));

      element.style.left = x + 'px';
      element.style.top = y + 'px';
    }
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
  });
}

// Element መምረጫ
function selectElement(element) {
  document.querySelectorAll('.draggable').forEach(el => el.classList.remove('selected'));
  activeElement = element;
  activeElement.classList.add('selected');
}

// በካርዱ ውጭ ሲነካ Selection ማጥፊያ
document.getElementById('card-canvas').addEventListener('click', function(e) {
  if (e.target === this || e.target.id === 'card-bg') {
    document.querySelectorAll('.draggable').forEach(el => el.classList.remove('selected'));
    activeElement = null;
  }
});

// 5. የጽሁፍ ማስተካከያዎች (Font, Size, Color, Bold) Logic
document.getElementById('text-color').addEventListener('input', function(e) {
  if (activeElement && !activeElement.querySelector('img')) {
    activeElement.style.color = e.target.value;
  }
});

document.getElementById('font-size').addEventListener('input', function(e) {
  if (activeElement && !activeElement.querySelector('img')) {
    activeElement.style.fontSize = e.target.value + 'px';
  }
});

document.getElementById('bold-btn').addEventListener('click', function() {
  if (activeElement && !activeElement.querySelector('img')) {
    activeElement.style.fontWeight = activeElement.style.fontWeight === 'bold' ? 'normal' : 'bold';
  }
});

document.getElementById('font-family').addEventListener('change', function(e) {
  if (activeElement && !activeElement.querySelector('img')) {
    activeElement.style.fontFamily = e.target.value;
  }
});

// 6. የካርዱን ምስል ማውረጃ (Download Logic)
document.getElementById('download-btn').addEventListener('click', function() {
  // ከመውረዱ በፊት የተመረጡ Border መስመሮችን ማጥፋት
  document.querySelectorAll('.draggable').forEach(el => el.classList.remove('selected'));

  const canvasContainer = document.getElementById('card-canvas');

  html2canvas(canvasContainer, {
    scale: 2, // ከፍተኛ ጥራት እንዲኖረው
    useCORS: true
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'custom-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});
