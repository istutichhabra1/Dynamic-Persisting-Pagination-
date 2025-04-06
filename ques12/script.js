const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
let start = 0;
const limit = 10;
let loading = false;
async function loadImages() {
  if (loading) return;
  loading = true;
  loader.style.display = 'block';
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`);
    const data = await response.json();
    data.forEach(photo => {
      const card = document.createElement('div');
      card.className = 'image-card';
      const img = document.createElement('img');
      img.src = photo.url;
      img.alt = photo.title;
      card.appendChild(img);
      gallery.appendChild(card);
    });
    start += limit;
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    loader.style.display = 'none';
    loading = false;
  }
}
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadImages();
  }
});
loadImages();
