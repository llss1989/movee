// Create the script tag, set the appropriate attributes
const script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDRzWmi8adctYliIFEkAKYtyjEq0Doutvk&callback=initMap';
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function () {
  const options = {
    zoom: 10,
    center: { lat: 55.712776, lng: 37.709492 }, // Coordinates of New York
  };
  const map = new google.maps.Map(document.getElementById('map'), options);
  const marker = new google.maps.Marker({
    position: { lat: 55.712776, lng: 37.709492 }, // Brooklyn Coordinates
    map, // Map that we need to add
    // icon: 'https://img.icons8.com/fluent/48/000000/marker-storm.png',
    // adding custom icons (Here I used a Flash logo marker)
    draggarble: false, // If set to true you can drag the marker
  });

  const information = new google.maps.InfoWindow({
    content: `<div class="popup-googleCards">
    <div class="popup-googleCards__mainInner">
      <h3 class="titleOfSection titleOfSection_mainFont">Movee</h3>
      <div class="popup-googleCards__innerForcontacts">
        
        
          <div class="popup-googleCards__item">
            <span class="popup-googleCards__icon"><img src="https://i.ibb.co/F0T5VXw/golden-icon.png" alt="golden-icon" /></span>
            <p class="popup-googleCards__text">Москва, Волгоградский пр-т, 38</p>
          </div>
          <div class="popup-googleCards__item">
          <span class="popup-googleCards__icon"><img src="https://i.ibb.co/F0T5VXw/golden-icon.png" alt="golden-icon"/></span>
            <p class="popup-googleCards__text">8 (800)-080-12-13</p>
            </div>
            <div class="popup-googleCards__item">
            <span class="popup-googleCards__icon"><img src="https://i.ibb.co/F0T5VXw/golden-icon.png" alt="golden-icon" /></span>
            <a href="mailto:hello@movee.ru" class="popup-googleCards__text popup-googleCards__text_underline">hello@movee.ru</a>
          </div>
          </div>
         
       
       
      </div>
    
      <div class="socialNetworks socialNetworks_mt socialNetworks_end">
        <a href="#!" class="socialNetworks__item"><img src="https://i.ibb.co/k1q56Xn/youtube.png" alt="youtube"></a>
        <a href="#!" class="socialNetworks__item"><img src="https://i.ibb.co/JjHB80S/vk.png" alt="vk"></a>
        <a href="#!" class="socialNetworks__item"><img src="https://i.ibb.co/2gk7Pnk/facebook.png" alt="facebook"></a>
        <a href="#!" class="socialNetworks__item"><img src="https://i.ibb.co/mJ3Sz6w/insta.png" alt="insta"></a>
      </div>
    </div>
  </div>
    `,
  });

  marker.addListener('click', () => {
    information.open(map, marker);
  });
};

// Append the 'script' element to 'head'
document.head.appendChild(script);
