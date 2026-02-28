
/* === Show/hide recipe fields === */
// function toggleExtraFields() {
//   const helpType = document.getElementById("helpType")?.value;
//   const recipeFields = document.getElementById("recipeFields");
//   if (recipeFields) {
//     recipeFields.style.display = helpType === "recipe" ? "block" : "none";
//   }
// }

/* === Toggle Extra Fields === */
function toggleExtraFields() {
  const helpType = document.getElementById("helpType").value;
  const recipeFields = document.getElementById("recipeFields");
  const donationFields = document.getElementById("donationFields");
  const donationOption = document.getElementById("donationOption");

  // hide all by default
  recipeFields.style.display = "none";
  donationFields.style.display = "none";

  if (helpType === "recipe") {
    recipeFields.style.display = "block";
    // check donation option inside recipe
    if (donationOption && donationOption.value === "yes") {
      donationFields.style.display = "block";
    }
  } else if (helpType === "donation") {
    donationFields.style.display = "block";
  }
}

/* === Watch donationOption for Recipe case === */
document.addEventListener("DOMContentLoaded", () => {
  const donationOption = document.getElementById("donationOption");
  if (donationOption) {
    donationOption.addEventListener("change", toggleExtraFields);
  }
});

/* === Assistance Form (Google Sheets) === */
document.addEventListener("DOMContentLoaded", () => {
  const helpForm = document.getElementById("helpForm");
  if (helpForm) {
    helpForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const formData = new FormData(helpForm);

      fetch("https://script.google.com/macros/s/AKfycbzAwOl3FjeVc4kISPqFJIVD-d2EA7D7RE7b_ZQRF7K4jY5vzNlfAHd3dvxto1suBVL6iA/exec", {
        method: "POST",
        body: formData
      })
      .then(res => res.text())
      .then(() => {
        document.getElementById("formMessage").textContent = "✅ Your response was recorded! You will get an email soon! ";
        helpForm.reset();
        toggleExtraFields(); // hide recipe fields again
      })
      .catch(() => {
        document.getElementById("formMessage").textContent = "⚠️ Something went wrong. Try again.";
      });
    });
  }
});

/* === Recipe of the Day === */
document.addEventListener("DOMContentLoaded", () => {
  const recipeCard = document.getElementById("recipe-card");
  if (recipeCard) {
    const recipes = [
      {
        title: "Fried Rice from Leftover Curry",
        desc: "Transform curry into a tasty fried rice dish in just 15 minutes! Add veggies & soy sauce.",
        link: "https://www.vegrecipesofindia.com/veg-fried-rice-recipe/"
      },
      {
        title: "Bread Upma",
        desc: "Use stale bread to make a delicious Indian-style upma with onions, tomatoes & spices.",
        link: "https://www.vegrecipesofindia.com/bread-upma-recipe-south-indian-style/"
      },
      {
        title: "Veggie Soup from Scraps",
        desc: "Boil leftover veggie peels & stems for a healthy, flavorful soup base.",
        link: "https://www.bbcgoodfood.com/recipes/vegetable-soup"
      },
      {
        title: "Stuffed Paratha",
        desc: "Mash leftover veggies & stuff into dough to make crispy parathas.",
        link: "https://www.vegrecipesofindia.com/aloo-paratha-indian-bread-stuffed-with-potato-filling/"
      }
    ];

    const todayIndex = new Date().getDate() % recipes.length;
    recipeCard.innerHTML = `
      <h3>${recipes[todayIndex].title}</h3>
      <p>${recipes[todayIndex].desc}</p>
      <a href="${recipes[todayIndex].link}" target="_blank">👉 View Full Recipe</a>
    `;
  }
});

/* === Impact Counter Animation === */
function animateCounter(id, target, duration = 2000) {
  const element = document.getElementById(id);
  if (!element) return;
  let start = 0;
  const stepTime = Math.abs(Math.floor(duration / target));
  const timer = setInterval(() => {
    start++;
    element.textContent = start;
    if (start >= target) clearInterval(timer);
  }, stepTime);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("foodSaved")) {
    animateCounter("foodSaved", 250);
    animateCounter("mealsDonated", 500);
    animateCounter("familiesComposting", 120);
  }
});

/* === Join Us Form === */
document.addEventListener("DOMContentLoaded", () => {
  const joinForm = document.getElementById("joinForm");
  if (joinForm) {
    joinForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("joinName").value.trim();
      const email = document.getElementById("joinEmail").value.trim();
      const message = document.getElementById("joinMessage");

      if (!name || !email) {
        message.textContent = "⚠️ Please fill in all fields!";
        message.style.color = "red";
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        message.textContent = "⚠️ Please enter a valid email!";
        message.style.color = "red";
        return;
      }

      message.textContent = `🎉 Thank you, ${name}! You’ve joined the ZeroBite movement.`;
      message.style.color = "green";
      joinForm.reset();
    });
  }
});

/* === Donation Page (Leaflet Map) === */
document.addEventListener("DOMContentLoaded", () => {
  const mapDiv = document.getElementById("map");
  if (mapDiv) {
    var map = L.map('map').setView([15.4909, 73.8278], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    var centres = [
      {
        name: "Food Bank Goa",
        location: [15.4989, 73.8289],
        details: "📍 Panjim, Goa<br>☎️ +91 9876543210"
      },
      {
        name: "NGO Helping Hands",
        location: [15.2832, 73.9862],
        details: "📍 Margao, Goa<br>☎️ +91 9123456780"
      },
      {
        name: "Community Kitchen",
        location: [15.3499, 74.0853],
        details: "📍 Ponda, Goa<br>☎️ +91 9988776655"
      }
    ];

    centres.forEach(function(centre) {
      L.marker(centre.location)
        .addTo(map)
        .bindPopup("<b>" + centre.name + "</b><br>" + centre.details);
    });
  }
});
